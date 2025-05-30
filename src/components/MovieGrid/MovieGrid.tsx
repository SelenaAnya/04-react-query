import React from 'react';
import type { Movie } from '../../types/movie';
import style from './MovieGrid.module.css';

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}
const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
    const handelCardClick = (movie: Movie) => {
        onSelect(movie);
    };

    return (
        <ul className={style.grid}>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <div
                        className={style.card}
                        onClick={() => handelCardClick(movie)}
                    >
                        <img
                            className={style.image}
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : '/placeholder-image.jpg'
                            }
                            alt={movie.title}
                            loading="lazy"
                        />
                        <h2 className={style.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
        </ul>

    );
};

export default MovieGrid;