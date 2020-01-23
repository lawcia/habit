import React from 'react';
import RegisterForm from '../components/RegisterForm'
import Login from '../components/Login'

export default function LandingPage(props) {
    return (
        <div className="LandingPage">
            <h1 className="siteHeading">Habit.</h1>
            <div className="rightCol">
            <h3>Register</h3>
            <RegisterForm />
            <h3>Login</h3>
            <Login loggedInUser={props.loggedIn} setUserId={props.setUserId}/>
            </div>
        </div>
    )
}
