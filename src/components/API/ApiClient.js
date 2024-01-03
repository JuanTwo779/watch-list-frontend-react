import axios from "axios";

export const apiClient = axios.create(
     {
          // baseURL: 'http://localhost:5000'
          baseURL: 'http://test2-env.eba-uujjhqbg.ap-southeast-2.elasticbeanstalk.com'
     }
)