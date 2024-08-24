import { useEffect, useState } from "react"
import { useAuth } from "../Security/AuthContext"
import { deleteMovieApi, retrieveAllMoviesForUsernameApi } from "../API/MovieApiService"
import { useNavigate } from "react-router-dom"

import { OverlayTrigger, Tooltip } from "react-bootstrap"


export default function ListMoviesComponent(){

     const authContext = useAuth()
     const username = authContext.username

     const [message, setMessage] = useState(null)

     const [movies, setMovies] = useState([])

     useEffect (() => refreshMovieList, [])

     const navigate = useNavigate()

     const [selectedId, setSelectedId] = useState(null)

     function refreshMovieList() {
          retrieveAllMoviesForUsernameApi(username)
               .then(response => {
                    // console.log(response.data)
                    setMovies(response.data)
               })
               .catch(error => console.log(error))
     }

     function deleteMovie() {
          if(selectedId != null){
               // console.log('deleting movie: ' + selectedId)
               deleteMovieApi(username, selectedId)
                    .then(
                         () => {
                              setMessage(`Movie with id: ${selectedId} deleted successfully` )
                              refreshMovieList()
                         }
                    )
                    .catch(error => console.log(error))
          } else {
               setMessage("Select a movie")
          }
     }

     function updateMovie() {
          if(selectedId != null){
               // console.log('update movie: ' + selectedId)
               navigate(`/movie/${selectedId}`) 
          } else {
               setMessage("Select a movie")
          }
     }

     function addNewMovie() {
          navigate(`/movie/-1`)
     }

     function viewAwards() {
          // console.log('selected movie: ' + selectedId)
          if(selectedId != null){
               // console.log('update movie: ' + selectedId)
               navigate(`/movie/${selectedId}/awards`) 
          } else {
               setMessage("Select a movie")
          }
     }

     function handleRowClick (id) {
          setMessage(null)
          if (selectedId === id){
               setSelectedId(null)
          } else {
               setSelectedId(id)
          }
     }

     return (
          <div className="container">
               <h1 className="mb-2">Movies</h1>
               <div className="mb-4">
                    <div className="btn btn-outline-primary btn-lg m-2 btn-sm"
                         onClick={addNewMovie}>
                         Add
                    </div>
                    <div className="btn btn-outline-warning btn-lg m-2 btn-sm"
                         onClick={updateMovie}>
                         Edit
                    </div>
                    <div className="btn btn-outline-danger btn-lg m-2 btn-sm"
                         onClick={deleteMovie}>
                         Delete
                    </div>
                    <div className="btn btn-outline-success btn-lg m-2 btn-sm"
                         onClick={viewAwards}>
                         Awards
                    </div>
               </div>
               {message && <div className="alert alert-warning">{message}</div>}
               
               <div>
                    <table className="table table-hover">
                         <thead className="table-primary">
                              <tr>
                                   <th>Title</th>
                                   <th>Year</th>
                                   <th>Director</th>
                                   <th>Country</th>
                                   <th>Rating</th>
                                   
                                   <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Watch Status</Tooltip>}>
                                        <th>WS.</th>
                                   </OverlayTrigger>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              movies.map(
                                   movie => (
                                        <tr key={movie.id} 
                                        className={selectedId === movie.id ? "table-active" : ""} 
                                        onClick={() => handleRowClick(movie.id)}>
                                             <td>{movie.title}</td>
                                             <td>{movie.year}</td>
                                             <td>{movie.director}</td>
                                             <td>{movie.country}</td>
                                             <td>{movie.rating.toString()}</td>
                                             <td>{movie.watched ? '✔️' : ''}</td>
                                        </tr>
                                   )
                              )
                         }
                         </tbody>
                    </table>
               </div>
               
          </div>
     )
}