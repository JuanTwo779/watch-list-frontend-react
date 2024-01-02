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
          <div className="loginComponent">
               <h1>Login here</h1>
               {showErrorMessage && <div className='successMessage'>Authenticated Failed. Please check your credentials.</div>}

               <div className="loginForm">
                    <div>
                         <label>Username: </label>
                         <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div>
                         <label>Password: </label>
                         <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div>
                         <button type="button" name="login" onClick={handleSubmit}>login</button>
                    </div>
               </div>
          </div>
     )
}