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
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
        event.preventDefault();
        // alert('A name was submitted: ' + this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
            <input type="text" name='username' value={this.state.value} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Password:
            <input type="text" name='password' value={this.state.value} onChange={this.handleChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
