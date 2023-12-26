import { Link } from "react-router-dom"
import { useAuth } from "./Security/AuthContext"

export default function HeaderComponent() {

     const authContext = useAuth()
     const isAuthenticated = authContext.isAuthenticated
     const username = authContext.username

     const welcome = "/welcome/" + username
     

     function logout(){
          authContext.logout()
     }

     return (
          <header className="border-bottom border-light border-5 mb-5 p-2">
               <div className="container">
                    <div className="row">
                         <nav className="navbar navbar-expand-lg">
                              <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.kingz-kutz.com">WhatToDo</a>
                              <div className="collapse navbar-collapse">
                                   <ul className="navbar-nav">
                                        { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to={welcome}>Home</Link></li>}
                                        {/* { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/******">Movies</Link></li>} */}
                                        {/* Rating */}
                                        {/* Award Criteria */}
                                   </ul>
                              </div>
                              <ul className="navbar-nav">
                                   {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                                   { isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/logout" onClick={logout}>Logout</Link></li>}
                                   
                              </ul>
                         </nav>
                    </div>
               </div>
          </header>

     )
}