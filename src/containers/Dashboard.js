import React from 'react'
import Habits from './Habits'

export default function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard</h1>
            <Habits userId={props.userId}/>
        </div>
    )
}
