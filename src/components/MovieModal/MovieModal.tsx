import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  function handleBackDropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className={css.modalBackdrop} role='dialog' aria-modal='true' onClick={handleBackDropClick}>
      <div className={css.modalContent}>
        <button className={css.closeButton} aria-label='Close' onClick={onClose}>
          &times;
        </button>

        <div className={css.modalBody}>
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className={css.modalPoster}
            />
          )}
          
          <div className={css.modalInfo}>
            <h2 className={css.modalTitle}>{movie.title}</h2>
            
            {movie.original_title !== movie.title && (
              <p className={css.originalTitle}>{movie.original_title}</p>
            )}

            <div className={css.modalMeta}>
              <span className={css.releaseDate}>
                {movie.release_date || 'Unknown'}
              </span>
              <span className={css.rating}>
                ⭐ {movie.vote_average.toFixed(1)}/10
              </span>
              <span className={css.votes}>
                ({movie.vote_count} votes)
              </span>
            </div>

            <p className={css.overview}>{movie.overview}</p>

            <div className={css.additionalInfo}>
              <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
              <p><strong>Popularity:</strong> {movie.popularity.toFixed(1)}</p>
              <p><strong>Adult:</strong> {movie.adult ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}