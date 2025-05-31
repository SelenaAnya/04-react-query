import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

// Log the token for debugging (remove in production)
console.log('Bearer token exists:', !!BEARER_TOKEN);

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
    if (!BEARER_TOKEN) {
        throw new Error('TMDB API key is not configured. Please check your .env file.');
    }

    if (!query.trim()) {
        throw new Error('Search query cannot be empty');
    }

    try {
        const response: AxiosResponse<MoviesResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    query: query.trim(),
                    include_adult: false,
                    language: 'en-US',
                    page
                },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401) {
                throw new Error('Invalid API key. Please check your TMDB Bearer Token in .env file.');
            }
            if (status === 404) {
                throw new Error('TMDB API endpoint not found.');
            }
            if (status && status >= 500) {
                throw new Error('TMDB server error. Please try again later.');
            }
            throw new Error(`Request failed: ${status || 'Unknown'} - ${error.response?.statusText || 'Unknown error'}`);
        }
        
        throw new Error('Network error. Please check your internet connection.');
    }
};