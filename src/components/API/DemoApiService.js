import { apiWatchlistClient } from "./ApiClient";

export const retrieveDemoString 
     = () => apiWatchlistClient.get('/demo')

export const retriveDemoBean 
     = () => apiWatchlistClient.get('/demo-bean')

export const retrieveDemoBeanPathVariable
     = () => apiWatchlistClient.get(`/demo-bean/path-variable/${username}`)