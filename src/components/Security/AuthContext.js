import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../API/AuthenticationApiService";
import { apiWatchlistClient } from "../API/ApiClient";

//1. Create a context
export const AuthContext = createContext()

//call const to use authContext
export const useAuth = () => useContext(AuthContext)

//2. Function to allow parent to pass context to children
export default function AuthProvider({ children }) {

     //3. Set states
     const [isAuthenticated, setAuthenticated] = useState(false)

     const [username, setUsername] = useState(null)

     const [token, setToken] = useState(null)

     async function login(username, password) {
          try{
               //call authentication api and get JWT token
               const response = 
                    await executeJwtAuthenticationService(username, password)

               //set the states     
               if(response.status == 200){

                    const jwtToken = 'Bearer ' + response.data.token

                    setAuthenticated(true)
                    setUsername(username)
                    setToken(jwtToken)

                    //intercept the each API call with authorisation header using token
                    apiWatchlistClient.interceptors.request.use(
                         (config) => {
                              console.log('token interception')
                              config.headers.Authorization = jwtToken
                              return config
                         }
                    )

                    return true
               } else {
                    logout()
                    return false
                }   
          } catch(error) {
               logout()
               return false
          }
     }

     function logout() {
          setAuthenticated(false)
          setToken(null)
          setUsername(null)
     }

     //whenever AuthProvider is called, provide children with context via AuthContext
     return (
          <AuthContext.Provider 
               value={{isAuthenticated, login, logout, username, token}}>
               {children}
          </AuthContext.Provider>
     )

}