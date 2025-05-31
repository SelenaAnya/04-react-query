import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { MoviesResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesResponse> => {
    try {
        const response: AxiosResponse<MoviesResponse> = await axios.get(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    query,
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
        throw new Error('Failed to fetch movies');
    }
};