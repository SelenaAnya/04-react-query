import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={css.errorContainer}>
      <div className={css.errorIcon}>⚠️</div>
      <div className={css.errorContent}>
        <h3 className={css.errorTitle}>Something went wrong</h3>
        <p className={css.errorMessage}>
          There was an error loading the movies. Please try again later.
        </p>
      </div>
    </div>
  );
}