import { apiClient } from "./ApiClient";

export const retrieveMovieSearchApi = async (query, language, primaryReleaseYear, page, region, year) => {
    try {
        const params = {}

        if (query) params.query = query;
        if (language) params.language = language;
        if (primaryReleaseYear) params.primaryReleaseYear = primaryReleaseYear;
        if (page) params.page = page;
        if (region) params.region = region;
        if (year) params.year = year;

        const response = await apiClient.get('/movies/search', { params });

        return response.data;
    } catch (error) {
        console.error("Error retrieving movie search:", error);
        throw error;
    }
};
