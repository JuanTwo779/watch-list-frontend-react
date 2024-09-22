import axios from "axios";

export const apiClient = axios.create(
     {
          // baseURL: 'http://localhost:5000'
          baseURL: 'https://watchme-backend-heauc8csgsbedhd0.australiasoutheast-01.azurewebsites.net'
     }
)