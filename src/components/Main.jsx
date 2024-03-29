import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import AuthProvider, { useAuth } from './Security/AuthContext'

import LoginComponent from './Pages/LoginComponent'

import './Main.css'
import WelcomeComponent from './Pages/WelcomeComponent'
import LogoutComponent from './Pages/LogoutComponent'
import HeaderComponent from './Pages/HeaderComponent'
// import ListMoviesComponent from './Pages/ListMoviesComponent'
import ListMoviesComponent from './Movies/ListMoviesComponent'
import MovieComponent from './Movies/MovieComponent'
import AwardInfoComponent from './Pages/AwardInfoComponent'
import RatingInfoComponent from './Pages/RatingInfoComponent'
import ListAwardsComponent from './Movies/ListAwardsComponent'
import AwardComponent from './Movies/AwardComponent'
import SearchComponent from './Search/SearchComponent'

function AuthenticatedRoute({children}){
     const authContext = useAuth()

     if(authContext.isAuthenticated){
          return children
     }

     return <Navigate to="/"/>
}

export default function Main(){
     return (
          <div className='Main'>
               <AuthProvider>
                    <BrowserRouter>

                         <HeaderComponent />

                         <Routes>
                              
                              <Route path='/' element={ <LoginComponent /> } />
                              <Route path='/login' element={ <LoginComponent /> } />
                              <Route path='/logout' element={ <LogoutComponent />} />

                              <Route path='/welcome/:username' element={
                                   <AuthenticatedRoute>
                                        <WelcomeComponent />
                                   </AuthenticatedRoute>
                              }/>

                              <Route path='/movies' element={
                                   <AuthenticatedRoute>
                                        <ListMoviesComponent />
                                   </AuthenticatedRoute>
                              }/>

                              {/* Individual movie */}
                              <Route path='/movie/:id' element={
                                   <AuthenticatedRoute>
                                        <MovieComponent />
                                   </AuthenticatedRoute>
                              }/>
                                   
                              {/* Awards Info */}
                              <Route path='/award-info' element={ <AwardInfoComponent />} />

                              {/* Rating info */}
                              <Route path='/rating-info' element={ <RatingInfoComponent /> } />

                              {/* Award list */}
                              <Route path='/movie/:id/awards' element={
                                   <AuthenticatedRoute>
                                        <ListAwardsComponent />
                                   </AuthenticatedRoute>
                              }/>

                              {/* Individual award */}
                              <Route path='/movie/:id/awards/:awardId' element={
                                   <AuthenticatedRoute>
                                        <AwardComponent />
                                   </AuthenticatedRoute>
                              } />

                              {/* Search function */}
                              <Route path='/search' element={
                                   <AuthenticatedRoute>
                                        <SearchComponent />
                                   </AuthenticatedRoute>
                              } />

                         </Routes>

                    </BrowserRouter>
               </AuthProvider>
               
          </div>
     )
}