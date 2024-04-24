import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { retrieveRandomMovieApi } from "../API/MovieApiService";

export default function WelcomeComponent(){

     //takes the URL parameter passed in
     const {username} = useParams()

     const [message, setMessage] = useState()
     const [date, setDate] = useState();

     function getRandomMovie(){
          retrieveRandomMovieApi(username)
               .then(response =>{
                    console.log(response.data)
                    setMessage(response.data.title)
                    setDate(response.data.year)
               })
               .catch((error) => console.log(error))
               .finally (() => console.log('cleanup'))
     }


     return (
          <div className="welcomeComponent">
               <h1>Welcome {username}</h1>
               <div>
                    Manage your movies. <Link to="/movies">View here</Link>
               </div>
               <div>
                    <button className="btn btn-primary m-5" onClick={getRandomMovie}>
                         Pick a random movie
                    </button>
               </div>
               <div className="display-5 text-center text-primary">
                    {message}
               </div>
               <div className="lead text-center">
                    {date}
               </div>
          </div>
     )
}