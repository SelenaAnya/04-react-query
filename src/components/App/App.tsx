import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [submittedQuery, setSubmittedQuery] = useState<string>('');

  const {
    data: moviesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['movies', submittedQuery, page],
    queryFn: () => fetchMovies(submittedQuery, page),
    enabled: !!submittedQuery,
    staleTime: 5 * 60 * 1000,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
      setPage(1); // Reset to first page when new search
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const movies: Movie[] = moviesData?.results || [];
  const totalPages = moviesData?.total_pages || 0;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Movie Search</h1>
      
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter movie title..."
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>

      {isLoading && <div className={css.loading}>Loading movies...</div>}
      
      {isError && (
        <div className={css.error}>
          Error: {error instanceof Error ? error.message : 'Something went wrong'}
        </div>
      )}

      {movies.length > 0 && (
        <div className={css.moviesContainer}>
          <div className={css.moviesList}>
            {movies.map((movie) => (
              <div key={movie.id} className={css.movieCard}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className={css.moviePoster}
                  />
                )}
                <div className={css.movieInfo}>
                  <h3 className={css.movieTitle}>{movie.title}</h3>
                  <p className={css.movieOverview}>
                    {movie.overview.length > 150
                      ? `${movie.overview.substring(0, 150)}...`
                      : movie.overview}
                  </p>
                  <div className={css.movieMeta}>
                    <span className={css.releaseDate}>
                      Release: {movie.release_date || 'Unknown'}
                    </span>
                    <span className={css.rating}>
                      Rating: {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </div>
      )}

      {submittedQuery && movies.length === 0 && !isLoading && !isError && (
        <div className={css.noResults}>
          No movies found for "{submittedQuery}"
        </div>
      )}
    </div>
  );
};

export default App;