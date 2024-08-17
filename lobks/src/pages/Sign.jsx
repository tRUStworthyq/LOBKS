import React from 'react'
import "../styles/Sign.css" 
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const Sign = () => {

    const navigate = useNavigate()

    
    
    let signInBtn = () => {
        const container = document.getElementById('container')
        container.classList.remove('active')
    }

    let signUpBtn = () => {
        const container = document.getElementById('container')
        container.classList.add('active')
    } 

    const sendSignUp = () => {
        const username = document.getElementById("username-signup").value
        const email = document.getElementById("email-signup").value
        const password = document.getElementById("password-signup").value
        const obj = {
            "username": username,
            "email": email,
            "password": password,
            "role": "user"
        }
        AuthService.signUp(obj)
    }
    const sendSignIn = () => {
        const username = document.getElementById("username-signin").value
        const password = document.getElementById("password-signin").value
        const obj = {
            "username": username,
            "password": password
        }
        AuthService.signIn(obj).then((res) => {
            localStorage.setItem('jwt', JSON.stringify(res.data.jwt))
            localStorage.setItem('type', JSON.stringify(res.data.type))
            localStorage.setItem('id', JSON.stringify(res.data.id))
            localStorage.setItem('email', JSON.stringify(res.data.email))
            localStorage.setItem('username', JSON.stringify(res.data.username))
            localStorage.setItem('roles', JSON.stringify(res.data.roles))
            navigate("/user-panel")
        }).catch((e) => {
            if (e.response.status === 401) {
                alert("Неверный логин или пароль")
            } else if (e.response.status === 403) {
                navigate("/ban-page")
            } else {
                console.log(e.message)
            }
        })
    }

  return (
    <div className="container" id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <input id="username-signup" type="text" placeholder="Username"/>
                <input id="email-signup" type="email" placeholder="Email"/>
                <input id="password-signup" type="password" placeholder="Password"/>
                <button onClick={sendSignUp}>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input id="username-signin" type="text" placeholder="Username"/>
                <input id = "password-signin" type="password" placeholder="Password"/>
                <a href="#">Forget Your Password?</a>
                <button onClick={sendSignIn}>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login" onClick={signInBtn}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register" onClick={signUpBtn}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sign