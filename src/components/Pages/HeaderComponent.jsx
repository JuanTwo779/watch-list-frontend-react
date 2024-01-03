import { useAuth } from "../Security/AuthContext"
import { Link } from "react-router-dom"
import { OverlayTrigger, Tooltip } from "react-bootstrap"


export default function HeaderComponent() {
     
     const authContext = useAuth()

     const isAuthenticated = authContext.isAuthenticated
     const username = authContext.username
     const welcomePath = "/welcome/" + username
     function logout() { authContext.logout()}

     return (
          <header className="border-bottom border-light border-5 mb-5 p-2">
               <div className="container">
                    <div className="row">

                         <nav className="navbar navbar-expand-lg">

                              <div className="container-fluid">
                                   <Link className="navbar-brand ms-2 fs-2 fw-bold text-black" to={welcomePath}>WatchMe</Link>

                                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                   </button>

                                   <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav">
                                             { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to={welcomePath}>Home</Link></li>}
                                             { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/movies">Movies</Link></li>}
                                             { isAuthenticated && 
                                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Award List Criteria</Tooltip>}>
                                                       <li className="nav-item fs-5"><Link className="nav-link" to='/award-info'>Awards</Link></li>
                                                  </OverlayTrigger>
                                             }
                                             { isAuthenticated && 
                                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Rating System</Tooltip>}>
                                                       <li className="nav-item fs-5"><Link className="nav-link" to="/rating-info">Ratings</Link></li>
                                                  </OverlayTrigger>
                                             }
                                        </ul>
                                   </div>

                                   <div className=" collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                        <ul className="navbar-nav">
                                             {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                                             { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                                        </ul>
                                   </div>

                              </div>

                         </nav>

                    </div>
               </div>
          </header>
     )
}