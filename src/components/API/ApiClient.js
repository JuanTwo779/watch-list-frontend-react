import axios from "axios";

export const apiClient = axios.create(
     {
          baseURL: 'http://localhost:8080'
          // baseURL: Watch-list-rest-api-env.eba-xdkb2amp.ap-southeast-2.elasticbeanstalk.com'
     }
)