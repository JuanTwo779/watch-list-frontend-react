import { useState } from "react"
import { useAuth } from "../Security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginComponent(){

     const [username, setUsername] = useState("Juan")
     const [password, setPassword] = useState("")

     const [showErrorMessage, setShowErrorMessage] = useState(false)

     const navigate = useNavigate()
     const authContext = useAuth()

     function handleUsernameChange(event) {
          console.log(event.target.value);
          setUsername(event.target.value);
     }

     function handlePasswordChange(event) {
          setPassword(event.target.value);
     }

     async function handleSubmit() {
          if(await authContext.login(username, password)){
               navigate(`/welcome/${username}`)
               console.log("SUCCESS")
          } else {
               setShowErrorMessage(true)
          }
     }

     return (
<div className="container mt-5">
    <div className="row justify-content-center">
            <div className="card w-50">
                <div className="card-body">
                    <h1 className="text-center mb-4">Login Here</h1>
                    
                    {showErrorMessage && (
                        <div className="alert alert-danger" role="alert">
                            Authentication Failed. Please check your credentials.
                        </div>
                    )}

                    <form className="loginForm">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label text-secondary">Username</label>
                            <div className="col-md-4"></div>  
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control m-auto"
                                value={username}
                                onChange={handleUsernameChange}
                                style={{ textAlign: 'center', maxWidth: '400px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-secondary">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control m-auto"
                                value={password}
                                onChange={handlePasswordChange}
                                style={{ textAlign: 'center', maxWidth: '400px' }}
                            />
                        </div>
                        <div className="d-grid">
                            <button
                                type="button"
                                className="btn btn-primary m-auto rounded w-50"
                                name="login"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
        </div>
    </div>
</div>

     )
}