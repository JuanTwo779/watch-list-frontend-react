import { apiClient } from "./ApiClient";

export const retrieveDemoString 
     = () => apiClient.get('/demo')

export const retriveDemoBean 
     = () => apiClient.get('/demo-bean')

export const retrieveDemoBeanPathVariable
     = (username) => apiClient.get(`/demo-bean/path-variable/${username}`)