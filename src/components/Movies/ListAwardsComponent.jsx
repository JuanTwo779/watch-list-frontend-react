import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Security/AuthContext"
import { useEffect, useState } from "react"
import { deleteAwardForMovieApi, retrieveAllAwardsForMovieApi } from "../API/AwardApiService"

export default function ListAwardsComponent(){

     const authContext = useAuth()
     const username = authContext.username
     const {id} = useParams() //movie id

     useEffect(() => refreshAwardList, [])
     const [awards, setAwards] = useState([])
     const [message, setMessage] = useState(null)

     const [selectedAwardId, setSelectedAwardId] = useState(null)

     const navigate = useNavigate()

     function refreshAwardList(){
          retrieveAllAwardsForMovieApi(username, id)
               .then(response => {
                    // console.log(response.data)
                    setAwards(response.data)
               })
               .catch(error => console.log(error))
     }

     function handleRowClick (id) {
          setMessage(null)
          if(selectedAwardId === id){
               setSelectedAwardId(null)
          } else {
               setSelectedAwardId(id)
          }
     }

     // delete award
     function deleteAward(){
          if(selectedAwardId != null){
               deleteAwardForMovieApi(username, id, selectedAwardId)
               .then(
                    () => {
                         setMessage(`Award with id: ${selectedAwardId} deleted successfully` )
                         refreshAwardList()
                    }
               )
               .catch(error => console.log(error))
          } else {
               setMessage("Select an award")
          }
     }

     // update award
     function updateAward() {
          if(selectedAwardId != null){
               console.log(selectedAwardId)
               navigate(`/movie/${id}/awards/${selectedAwardId}`)
          } else {
               setMessage("Select an award")
          }
     }

     // create award
     function addNewAward() {
          navigate(`/movie/${id}/awards/-1`)
     }

     return(
          <div className="container">
               <div className="mb-4">
                    <h1>Awards</h1>
                    <div className="btn btn-outline-primary btn-lg m-2 btn-sm"
                         onClick={addNewAward}>
                         Add
                    </div>
                    <div className="btn btn-outline-warning btn-lg m-2 btn-sm"
                         onClick={updateAward}>
                         Edit
                    </div>
                    <div className="btn btn-outline-danger btn-lg m-2 btn-sm"
                         onClick={deleteAward}>
                         Delete
                    </div>
               </div>
               {message && <div className="alert alert-warning">{message}</div>}

               <div>
                    <table className="table table-hover">
                         <thead className="table-success">
                              <tr>
                                   <th>Org.</th>
                                   <th>Year</th>
                                   <th className="text-start ps-4">Desc.</th>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              awards.map(
                                   award => (
                                        <tr key={award.awardId}
                                        className={selectedAwardId === award.awardId ? "table-active" : ""}
                                        onClick={() => handleRowClick(award.awardId)}>
                                             <td>{award.organisation}</td>
                                             <td>{award.year}</td>
                                             <td className="text-start ps-4">{award.description}</td>
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