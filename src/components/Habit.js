import React, { Component } from 'react'
import Axios from 'axios';
import './Habit.css'

export default class Habit extends Component {
    state = { clicked: false }
    delete = () => {
        Axios.delete(`/api/v1/deletehabit/${this.props.habit._id}`)
            .then(response => this.props.getAllHabits())
    }
    date_diff_indays = (date1) => {
        const dt1 = new Date(this.props.upDatedAt);
        const dt2 = new Date();
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }
    strikethrough = () => {
        this.setState({ clicked: true })
        Axios.put(`/api/v1/habitcheck/${this.props.habit._id}`)
    }
    render() {
        return (
            <div>
                <p className={`${this.state.clicked}`}>The habit is: {this.props.habit.title}</p>
                <p>The frequency is: {this.props.habit.frequency}</p>
                <button onClick={()=>this.strikethrough()} id="props.habit._id" >Completed</button>
                <button name="delete" id="props.habit._id" onClick={this.delete}>Delete</button>
            </div>
        )
    }
}

