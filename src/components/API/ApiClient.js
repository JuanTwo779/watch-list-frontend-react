import axios from "axios";

export const apiWatchlistClient = axios.create(
     {
          baseURL: 'http://localhost:4000'
     }
)