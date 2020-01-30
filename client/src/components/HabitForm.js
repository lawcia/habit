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
        Axios.post('/api/v1/habits', this.state)
            .then((res) => {
                if (res.data.success) {
                    alert(res.data.message)
                    this.props.redirect()
                }
            })
            .catch((err) => {
                console.log(err)
            }
            )
        event.preventDefault();
    }
    render() {
        return (
            
            <form className="habitForm" onSubmit={this.handleSubmit}>
                <label htmlFor="title">
                    My new habit will be called:  
            <input type="text" name='title' value={this.state.value} onChange={this.handleChange} minLength={3} maxLength={25} required />
                </label>
                <br />
                <label htmlFor="frequency">
                    I want to complete this habit:  
                <select name="frequency" id="frequency" onChange={this.handleChange}  defaultValue="Daily">
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                </label>
                <br />
                <input className="submitBtn" type="submit" value="Add Habit" />
            </form>
        );
    }
}
