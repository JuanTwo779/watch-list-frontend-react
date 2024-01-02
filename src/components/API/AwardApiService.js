import { apiClient } from "./ApiClient";

// retrieve awards for movie
export const retrieveAllAwardsForMovieApi 
     = (username, id) => apiClient.get(`/users/${username}/movie-list/${id}/awards`)

// create award for movie
export const createAwardForMovieApi 
     = (username, id, award) => apiClient.post(`/users/${username}/movie-list/${id}/awards`, award)

// retrieve individual award
export const retrieveAwardForMovieApi 
     = (username, id, awardId) => apiClient.get(`/users/${username}/movie-list/${id}/awards/${awardId}`)

// delete award for movie
export const deleteAwardForMovieApi
     = (username, id, awardId) => apiClient.delete(`/users/${username}/movie-list/${id}/awards/${awardId}`)

// edit award for movie
export const updateAwardForMovieApi
     = (username, id, awardId, award) => apiClient.put(`/users/${username}/movie-list/${id}/awards/${awardId}`, award)