import React, {
    Component
} from 'react'
import Axios from 'axios';
import './Habit.css'

export default class Habit extends Component {
    state = {
        clicked: false,
        clickable: false
    }
    delete = () => {
        Axios.delete(`/api/v1/deletehabit/${this.props.habit._id}`)
            .then(response => this.props.getAllHabits())
    }
    date_diff_indays = () => {
        
        const dt1 = new Date(this.props.habit.updatedAt);
        const dt2 = new Date();
        const min_diff = Math.floor(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(),dt1.getHours(), dt1.getMinutes(), dt1.getSeconds()) )/ (1000*60 );
    // 1440 minutes in a day
    if(this.props.habit.frequency === 'Daily') {
        if(min_diff > 1440 ){this.setState({
            clicked: false,
            clickable: true
        }) }
    }
    // 10080 minutes in a week
    if(this.props.habit.frequency === 'Weekly') {
        min_diff > 10080 && this.setState({
            clicked: false,
            clickable: true
        })
    }
    // 43800 in a month
    if(this.props.habit.frequency === 'Monthly') {
        min_diff > 43800 && this.setState({
            clicked: false,
            clickable: true
        })
    }}
    strikethrough = () => {
        Axios.put(`/api/v1/habitcheck/${this.props.habit._id}`)
        .then(() =>{ 
            this.setState({
                clicked: true, clickable: false 
            }, () =>
            this.props.getAllHabits())})
    }
    componentDidMount() {
        if(this.props.habit.dateChecked.length !== 0){
        this.interval = setInterval(() => this.date_diff_indays(), 1000);
        } else {
            this.setState({
                clicked: false,
                clickable: true
            })
        }
    }
    render() {
        return ( <div>
                    <p className = {`${!this.state.clickable}`}> The habit is: {this.props.habit.title} </p> 
                    <p > The frequency is: {this.props.habit.frequency} </p>
                    <button className = {`checked${this.state.clickable}`} onClick = {() => this.strikethrough()} id = "props.habit._id" > Completed 
                    </ button> 
                    <button name = "delete" id = "props.habit._id" onClick = {this.delete } > Delete </button>
                    <button onClick={() => this.date_diff_indays()}>click </button>
             </div>
        )
    }
}