// src/services/movieService.ts
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface ApiResponse {
    results: Movie[];
    total_results: number;
    total_pages: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    query,
                    include_adult: false,
                    language: 'en-US',
                    page: 1
                },
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                },
            }
        );

        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};