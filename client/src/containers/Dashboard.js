import React from 'react'
import Habits from './Habits'

export default function Dashboard(props) {
    return (
        <div className="dashBoard">
            <h1 className="dashHeading">{props.username}`s Habits</h1>
            <Habits userId={props.userId}/>
        </div>
    )
}
