import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../API/AuthenticationApiService";
import { apiClient } from "../API/ApiClient";

// 1. Context creation
export const AuthContext = createContext()
// 2. useContext hook = call in children to utilise content
export const useAuth = () => useContext(AuthContext)

// 3. create states and functions in context that will be passed down to children 
export default function AuthProvider({ children }) {

     //authentication check useState
     const [isAuthenticated, setAuthenticated] = useState(false)

     //username useState
     const [username, setUsername] = useState(null)

     //JWT token useState
     const [token, setToken] = useState(null)

     //function for loggin in
     async function login(username, password) {
          try{
               //call authentication api and get JWT token
               const response = 
                    await executeJwtAuthenticationService(username, password)

               //set the states     
               if(response.status === 200){

                    const jwtToken = 'Bearer ' + response.data.token

                    setAuthenticated(true)
                    setUsername(username)
                    setToken(jwtToken)

                    //intercept the each API call with authorisation header using token
                    apiClient.interceptors.request.use(
                         (config) => {
                              // console.log('token interception')
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

     //logouot functin
     function logout() {
          setAuthenticated(false)
          setToken(null)
          setUsername(null)
     }

     //Calling AuthProvider in jsx enables context to be passed down to children
     return (
          <AuthContext.Provider 
               value={{isAuthenticated, login, logout, username, token}}>
               {children}
          </AuthContext.Provider>
     )

}