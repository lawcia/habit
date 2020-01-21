import React from 'react';
import HabitForm from '../components/HabitForm';


export default function AddHabit(props) {
    return (
        <div>
            <h1>Add Habits</h1>
            <HabitForm bigState={props.bigState}/>
        </div>
    )
}
