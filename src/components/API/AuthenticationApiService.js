import { apiWatchlistClient } from "./ApiClient";

export const executeJwtAuthenticationService 
     = (username, password) =>
          apiWatchlistClient.post(`/authenticate`,
          {username,password}
     )