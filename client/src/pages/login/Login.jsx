import React from 'react'
import { useRef } from 'react'
import './login.scss'
import { loginCall } from '../../apiCalls'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@mui/material'
const Login = () => {

    const email = useRef();
    const password = useRef();

    const { user, isFetching, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }
    console.log(user)

    return (
        <div className='login'>
            <div className="wraper">
                <div className="left">
                    <h3 className="logo">YadavSocial</h3>
                    <span className="desc">
                        "Connect with friends and the world around you on YadavSocial"
                    </span>
                </div>
                <div className="right">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="Email" placeholder='Email' required ref={email} className='loginInput' />
                        <input type="password" placeholder='Password' minLength={3} required ref={password} className='loginInput' />
                        <button className="loginBtn" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" style={{ color: "white" }} size={20} /> : "Log In"}</button>

                        <span className="fogot">Forgot Password ?</span>
                        <button className="register">{isFetching ? <CircularProgress color="inherit" style={{ color: "white" }} size={20} /> : "Create a New Account"}</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login