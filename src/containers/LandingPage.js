import React from 'react';
import RegisterForm from '../components/RegisterForm'
import Login from '../components/Login'

export default function LandingPage(props) {
    return (
        <div>
            <h1>Landing Page</h1>
            <h1>Register</h1>
            <RegisterForm />
            <h1>Login</h1>
            <Login loggedInUser={props.loggedIn}/>
        </div>
    )
}
