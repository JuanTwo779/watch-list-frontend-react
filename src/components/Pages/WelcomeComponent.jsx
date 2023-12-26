import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Security/AuthContext";

export default function WelcomeComponent() {
     
     const {username} = useParams();

     const [message, setMessage] = useState(null)

     const authContext = useAuth()

     // function callHelloWorldRestApi() {
     //      retrieveHelloWorldPathVariable(username, authContext.token)
     //           .then((response) => successfulResponse(response))
     //           .catch((error) => errorResponse(error))
     //           .finally (() => console.log('cleanup'))
     // }

     function successfulResponse(response){
          console.log(response)
          setMessage(response.data.message)
     }
     function errorResponse(error){
          console.log(error)
     }

     return (
          <div className="welcomeComponent">
               <h1>Welcome {username}</h1>
               <div>
                    {/* Manage your Movies. <Link to="/******">View here</Link> */}
               </div>
               <div>
                    {/* RANDOM MOVIE BUTTON */}
                    {/* <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                         Call Hello World</button> */}
               </div>
               <div className="text-info">{message}</div>
          </div>
     )
}