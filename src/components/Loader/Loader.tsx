import css from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p className={css.loadingText}>Loading movies...</p>
    </div>
  );
};