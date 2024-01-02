import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { retrieveDemoBeanPathVariable } from "../API/DemoApiService";

export default function WelcomeComponent(){

     //takes the URL parameter passed in
     const {username} = useParams()

     const [message, setMessage] = useState(null)

     function successfulResponse(response){
          console.log(response)
          setMessage(response.data.message)
     }

     function errorResponse(error){
          console.log(error)
     }

     function callDemoRestApi() {
          retrieveDemoBeanPathVariable(username)
               .then((response) => successfulResponse(response))
               .catch((error) => errorResponse(error))
               .finally (() => console.log('cleanup'))
     }


     return (
          <div className="welcomeComponent">
               <h1>Welcome {username}</h1>
               <div>
                    Manage your movies. <Link to="/movies">View here</Link>
               </div>
               <div>
                    <button className="btn btn-primary m-5" onClick={callDemoRestApi}>
                         Pick a random movie
                    </button>
               </div>
               <div className="text-info">
                    {message}
               </div>
          </div>
     )
}