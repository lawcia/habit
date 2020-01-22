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
        // 
    }
    date_diff_indays = () => {
        const dt1 = new Date(this.props.habit.updatedAt);
        const dt2 = new Date();
        //const days_diff = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()))/(1000*60*60*24));
        // ddconst min_diff = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 ));
        //const min_diff = Math.floor((Date.UTC(dt2.getMinutes()))-(Date.UTC(dt1.getMinutes()))/(1000*60))
        const min_diff = dt2.getMinutes()-dt1.getMinutes()

        //console.log('time 1', dt1)
        //console.log('time 2', dt2)
        // console.log(min_diff)
        // let val; & 
        // switch (this.props.habit.frequency) {
        //     case 'Daily':
        //         //console.log(min_diff)
        //         val = min_diff;
        //         minTime 
        //         break;
        //     case 'Weekly':
        //         min_diff > 2 && this.setState({
        //             clickable: true
        //         })
        //         break;
        //     case 'Monthly':
        //         min_diff > 3 && this.setState({
        //             clickable: true
        //         })
        //         break;

        //     default:
        //         return null
        // }

        
    if(this.props.habit.frequency === 'Daily') {
        console.log(this.props.habit.frequency, min_diff)
        if(min_diff > 1 ){this.setState({
            clickable: true
        }) }
    }
    if(this.props.habit.frequency === 'Weekly') {
        min_diff > 2 && this.setState({
            clickable: true
        })
    }
    if(this.props.habit.frequency === 'Monthly') {
        min_diff > 3 && this.setState({
            clickable: true
        })
    }

    }

    strikethrough = () => {
        this.setState({
            clicked: true, clickable: false 
        })

        Axios.put(`/api/v1/habitcheck/${this.props.habit._id}`)
        .then(() => this.props.getAllHabits())
        
    }
    componentDidMount() {
        this.interval = setInterval(() => this.date_diff_indays(), 1000);
        
    }

    componentDidUpdate = (prevProps, prevState) => {

    }

    render() {
        return ( <div >
            < p className = {`${this.state.clicked}`} > The habit is: {
                this.props.habit.title
            } < /p> <
            p > The frequency is: {
                this.props.habit.frequency
            } < /p> <
            button className = {
                `checked${this.state.clickable}`
            }
            onClick = {
                () => this.strikethrough()
            }
            id = "props.habit._id" > Completed < /button> <
            button name = "delete"
            id = "props.habit._id"
            onClick = {
                this.delete
            } > Delete < /button>
            <button onClick={() => this.date_diff_indays()}>click </button>
             <
            /div>
        )
    }
}