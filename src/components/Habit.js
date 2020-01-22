import React, { Component } from 'react'
import Axios from 'axios'

export default class Habit extends Component {

    delete = () => {
        Axios.delete(`/api/v1/deletehabit/${this.props.habit._id}`)
        .then(response => this.props.getAllHabits())
    }

    render() {
        return (
            <div>
            <p>The habit is: {this.props.habit.title}</p>
            <p>The frequency is: {this.props.habit.frequency}</p>
            <label htmlFor="completed">Done?</label>
            <input type="checkbox" name="completed" id="props.habit._id" className=""></input>
            <button name="delete" id="props.habit._id" onClick={this.delete}>Delete</button>
            </div>
        )
    }
}

