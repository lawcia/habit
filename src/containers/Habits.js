import React, { Component } from 'react'
// import { get } from 'mongoose'
import Axios from 'axios'
import Habit from '../components/Habit'

export default class Habits extends Component {
    state = {
        habits: [],
        // updated: false
    }
    getAllHabits = () => {
        Axios.get(`/api/v1/getall/${this.props.userId}`)
            .then(response => {
                this.setState({ habits: response.data })
            })
    }

    // uodatertron = () => this.setState({ updated: !this.state.updated })

    componentDidMount() {
        this.getAllHabits()
    }

    render() {
        return (
            <div>
                <h4>Habits container</h4>
                {this.state.habits.map((habit, index) => {
                    return <Habit state={this.state.updated} habit={habit} 
                   getAllHabits={this.getAllHabits} key={index} />
                })}

            </div>
        )
    }
}
