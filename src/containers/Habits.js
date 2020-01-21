import React, { Component } from 'react'
// import { get } from 'mongoose'
import Axios from 'axios'
import Habit from '../components/Habit'

export default class Habits extends Component {
    state = {
        habits: [],
        updated: false
    }

    uodatertron = () => this.setState({updated: !this.state.updated})  

    componentDidMount() {
        Axios.get(`/api/v1/getall/${this.props.userId}`)
        .then(response => {
            this.setState({habits: response.data})
        }) 
    }

    render() {
        return (
            <div>
                <h4>Habits container</h4>
                {this.state.habits.map(habit => {
                    return <Habit uodatertron={this.uodatertron} state={this.state.updated} habit={habit}/>
                })}
                
            </div>
        )
    }
}
