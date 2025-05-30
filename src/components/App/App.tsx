import React, { useState } from "react";
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

console.log(import.meta.env.VITE_TMDB_API_KEY);
const App: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            setError(false);
            setMovies([]);

            const result = await fetchMovies(query);

            if (result.length === 0) {
                toast.error("No movies found for your request.")
            }

            setMovies(result);
        } catch (error) {
            setError(true);
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleModalClose = () => {
        setSelectedMovie(null);
    };
    return (

        <div className={styles.app}>
            <SearchBar onSubmit={handleSearch} />

            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleMovieSelect} />
            )}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleModalClose} />
            )}

            <Toaster position="top-right" />
        </div>
    );
};

console.log(import.meta.env.VITE_TMDB_API_KEY);


export default App;