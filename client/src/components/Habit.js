import React, {
    Component
} from 'react'
import Axios from 'axios';
import './Habit.css'
import { ResponsiveCalendar } from '@nivo/calendar'

export default class Habit extends Component {
    state = {
        clicked: false,
        clickable: false,
        startDate: new Date(),
        min_diff: 0
    }

    delete = () => {
        Axios.delete(`/api/v1/habits/${this.props.habit._id}`)
            .then(() => this.props.getAllHabits())
    }

    calcMinDiff = () => {
        const dt1 = new Date(this.props.habit.dateChecked[this.props.habit.dateChecked.length -1]);
        const dt2 = new Date();
        const min_diff = Math.floor(Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(),dt1.getHours(), dt1.getMinutes(), dt1.getSeconds()) )/ (1000*60 );
        this.setState({min_diff: min_diff})
    }
 
    date_diff_indays = () => {
    // 1440 minutes in a day
    if(this.props.habit.frequency === 'Daily') {
        if(this.state.min_diff > 1440 ){
            this.setState({
            clicked: false,
            clickable: true
        }) }
    }
    // 10080 minutes in a week
    if(this.props.habit.frequency === 'Weekly') {
        this.state.min_diff > 10080 && this.setState({
            clicked: false,
            clickable: true
        })
    }
    // 43800 in a month
    if(this.props.habit.frequency === 'Monthly') {
        this.state.min_diff > 43800 && this.setState({
            clicked: false,
            clickable: true
        })
    }}
    strikethrough = () => {
        this.setState({
            clicked: true, clickable: false 
        }, () =>{
        Axios.put(`/api/v1/habits/${this.props.habit._id}`, {streak: this.props.habit.streak})
        .then(() => {this.props.getAllHabits()
        })
        .catch(() => this.setState({
            clicked: false, clickable: true 
        }) )})
    }
    checkStreak = () => {
        // 1440 minutes in a day
    if(this.props.habit.frequency === 'Daily') {
        if(this.state.min_diff > 1440*2 ){
            Axios.put(`/api/v1/habits/streak/${this.props.habit._id}`)
        }
    }
    // 10080 minutes in a week
    if(this.props.habit.frequency === 'Weekly') {
        this.state.min_diff > 10080*2 && Axios.put(`/api/v1/streak/${this.props.habit._id}`)
    }
    // 43800 in a month
    if(this.props.habit.frequency === 'Monthly') {
        this.state.min_diff > 43800*2 && Axios.put(`/api/v1/streak/${this.props.habit._id}`)
    }
}

    componentDidMount() {
        setInterval(() => this.calcMinDiff(), 1000);
        setInterval(() => this.checkStreak(), 1000);
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
        return ( <div className="Habit">
                    <h3 className = {`${!this.state.clickable} habitName`}> {this.props.habit.title} </h3>
                    <hr />
                     {!this.state.clickable && <p style={{textAlign: "center"}}>habit was done. come back {this.props.habit.frequency} to mark complete again!</p>}
                    <button className = {`checked${this.state.clickable}`} onClick = {() => this.strikethrough()} id = "props.habit._id" ><i class="fas fa-check-circle"></i> mark complete?
                    </ button> 
                    <div className = "habitDetails">
                    <h4>{this.props.habit.frequency} habit </h4>
                    <p> <i class="fas fa-star"></i> Current Streak {this.props.habit.streak}</p>
                    </div>
                    <p className="legend">Days habit was done</p>
      <div style={{height:"200px"}}>
                    <ResponsiveCalendar
        data={this.props.habit.dateChecked.map(date => {
            let utcDate = new Date(date)
            let dateStr =  utcDate.toLocaleDateString("sv-SE")
           return{
               day:dateStr, value: 100
           }
       })}
        from={this.props.habit.createdAt}
        to={this.state.startDate}
        emptyColor="#eeeeee"
        colors={['#C84630','#5DA271']}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 1,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
    </div>
    <button className = "deleteBtn" name = "delete" id = "props.habit._id" onClick = {this.delete } > Delete habit </button>
             </div>
        )
    }
}