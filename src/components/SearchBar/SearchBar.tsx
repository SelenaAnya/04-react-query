import React from "react";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
    onSubmit: (query: string) => void; // Define the type for onSubmit
}



const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const query = formData.get("query") as string;

        if (query.trim() === "") {
            toast.error("Please enter a search query.");
            return;
        }

        onSubmit(query.trim());
        form.reset();
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/3/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
};

export default SearchBar;