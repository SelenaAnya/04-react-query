import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import type { Movie } from '../../types/movie';
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import styles from "./App.module.css";

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['movies', searchQuery, page],
        queryFn: () => fetchMovies(searchQuery, page),
        enabled: !!searchQuery, // Запит виконується тільки коли є пошуковий запит
        keepPreviousData: true, // Зберігає попередні дані під час завантаження нових
        staleTime: 5 * 60 * 1000, // 5 хвилин
    });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Скидаємо на першу сторінку при новому пошуку
        
        // Показуємо повідомлення, якщо результатів немає (після завантаження)
        if (data && data.results.length === 0) {
            toast.error("No movies found for your request.");
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleModalClose = () => {
        setSelectedMovie(null);
    };

    // Показуємо повідомлення про відсутність результатів після завантаження
    React.useEffect(() => {
        if (data && data.results.length === 0 && searchQuery) {
            toast.error("No movies found for your request.");
        }
    }, [data, searchQuery]);

    return (
        <div className={styles.app}>
            <SearchBar onSubmit={handleSearch} />

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            
            {data && data.results.length > 0 && (
                <>
                    <MovieGrid movies={data.results} onSelect={handleMovieSelect} />
                    
                    {data.total_pages > 1 && (
                        <ReactPaginate
                            pageCount={data.total_pages}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageChange}
                            forcePage={page - 1}
                            containerClassName={styles.pagination}
                            activeClassName={styles.active}
                            nextLabel="→"
                            previousLabel="←"
                        />
                    )}
                </>
            )}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleModalClose} />
            )}

            <Toaster position="top-right" />
        </div>
    );
};

export default App;