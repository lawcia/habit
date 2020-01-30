import React from 'react';
import Axios from 'axios';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        Axios.post('/api/v1/users/register', this.state)
            .then(() => {
                alert('You can now login')
            })
            .catch((err) => {
                alert(err.response.data.message)
                }
            )
        event.preventDefault();
       
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="landingForm">
                <label>
                    Username:
            <input type="text" name='username' value={this.state.value} onChange={this.handleChange} minLength={3} maxLength={20} required />
                </label>
                {}
                <br />
                <label>
                    Password:
            <input type="password" name='password' value={this.state.value} onChange={this.handleChange} minLength={6} maxLength={15} required />
                </label>
                <br />
                <input className="submitBtn" type="submit" value="Register" />
            </form>
        );
    }
}
