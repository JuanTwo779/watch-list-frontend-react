import { BrowserRouter, Navigate, Routes } from 'react-router-dom'
import './Main.css'
import AuthProvider, { useAuth } from './Security/AuthContext'
import HeaderComponent from './Pages/HeaderComponent'

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

                              <Route path='/welcome/:username' element={
                                   <AuthenticatedRoute>
                                        <WelcomeComponent />
                                   </AuthenticatedRoute>
                                   } />



                              
                              <Route path='/logout' element={
                                   <AuthenticatedRoute>
                                        <LogoutComponent />
                                   </AuthenticatedRoute>
                                   } />

                              <Route path='*' element={<ErrorComponent />} />
                         </Routes>
                    </BrowserRouter>
               </AuthProvider>
               
          </div>
     )
}