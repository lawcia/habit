import React from 'react';
import HabitForm from '../components/HabitForm';



export default function AddHabit(props) {

    let redirectToDash = () => {
        const { history } = props;
        if (history) history.push('/dash');
    }
    return (
        <div>
            <h1>Add Habits</h1>
            <HabitForm bigState={props.bigState} redirect={redirectToDash} />
        </div>
    )
}
