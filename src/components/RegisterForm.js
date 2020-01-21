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
        Axios.post('/api/v1/createuser', this.state)
            .then((res) => {
                if(res.data.success){
                alert(res.data.message)
                }
            })
            .catch((err) => {
                if(err.code === 409){
                alert('This username has already been registered')
            }else {
                alert('Something went wrong')
            }}
            )
        event.preventDefault();
       
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
            <input type="text" name='username' value={this.state.value} onChange={this.handleChange} minlength={3} required />
                </label>
                {}
                <br />
                <label>
                    Password:
            <input type="password" name='password' value={this.state.value} onChange={this.handleChange} minlength={6} required />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
