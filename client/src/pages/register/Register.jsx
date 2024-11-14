import axios from 'axios';
import React from 'react'
import { useRef } from 'react'
import './register.scss'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const history = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match");
        } else {

            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                const xres = await axios.post("/auth/register", user);
                console.log(xres);

                history("/login");
            } catch (error) {
                console.log(error)
            }

        }
    }


    return (
        <div className='register'>
            <div className="wraper">
                <div className="left">
                    <h3 className="logo">YadavSocial</h3>
                    <span className="desc">
                        Connect with friends and the world around you on YadavSocial.
                    </span>
                </div>
                <div className="right">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="text" placeholder='Username' className='loginInput' required ref={username} />
                        <input type="email" placeholder='Email' className='loginInput' required ref={email} />
                        <input type="password" placeholder='Password' className='loginInput' required minLength={3} ref={password} />
                        <input type="password" placeholder='Password Again' className='loginInput' ref={passwordAgain} />
                        <button className="loginBtn" type='submit'>Sign Up</button>
                        <button className="register">Log into Account</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register