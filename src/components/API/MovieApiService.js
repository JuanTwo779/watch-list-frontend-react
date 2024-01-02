import { apiClient } from "./ApiClient";

export const retrieveAllMoviesForUsernameApi 
     = (username) => apiClient.get(`users/${username}/movie-list`)

export const retrieveMovieApi
     = (username, id) => apiClient.get(`users/${username}/movie-list/${id}`)

export const deleteMovieApi 
     = (username, id) => apiClient.delete(`users/${username}/movie-list/${id}`)

export const updateMovieApi 
     = (username, id, movie) => apiClient.put(`users/${username}/movie-list/${id}`, movie)

export const createMovieApi 
     = (username, movie) => apiClient.post(`users/${username}/movie-list`, movie)

export const retrieveRandomMovieApi
     = (username) => apiClient.get(`users/${username}/random-movie`)