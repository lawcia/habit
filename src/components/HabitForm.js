import React from 'react';
import Axios from 'axios';

export default class HabitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            frequency: 'Daily',
            userId: this.props.bigState.userId
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
        Axios.post('/api/v1/createhabit', this.state)
            .then((res) => {
                if (res.data.success) {
                    alert(res.data.message)
                    this.props.redirect()
                }
            })
            .catch((err) => {
                console.log(err)
                // alert(`Error: ${err}`)
            }
            )
        event.preventDefault();
    }
    render() {
        return (
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    title:
            <input type="text" name='title' value={this.state.value} onChange={this.handleChange} minLength={3} required />
                </label>
                {}
                <br />
                <select name="frequency" id="frequency">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
