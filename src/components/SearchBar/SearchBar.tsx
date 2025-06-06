import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (formData: FormData) => {
        const value = formData.get("query") as string;
        
        if (value && value.trim() !== "") {
            onSubmit(value.trim());
        } else {
            toast.error("Please enter a search query.");
        }
    }

    return (
        <header className={css.header}>
            <div className={css.container}>
                <a className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by TMDB
                </a>
                <form action={handleSubmit} className={css.searchForm}>
                    <input
                        type="text"
                        name="query"
                        autoComplete="off"
                        className={css.searchInput}
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button type="submit" className={css.searchButton}>
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}