import React, { Component } from 'react'
import Axios from 'axios'
import Habit from '../components/Habit'
export default class Habits extends Component {
    state = {
        habits: [],
    }
    getAllHabits = () => {
        Axios.get(`/api/v1/habits/${this.props.userId}`)
            .then(response => {
                this.setState({ habits: response.data })
            })
    }

    componentDidMount() {
        this.getAllHabits()
    }
    render() {
        return (
            <div>
                {this.state.habits.map((habit, index) => {
                    return <Habit state={this.state.updated} habit={habit} 
                   getAllHabits={this.getAllHabits} key={index} />
                })}

            </div>
        )
    }
}
