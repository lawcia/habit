import React from 'react';
import HabitForm from '../../components/HabitForm/HabitForm';
import './AddHabit.css';


export default function AddHabit(props) {

    const redirectToDash = () => {
        const { history } = props;
        if (history) history.push('/dash');
    }
    return (
        <div className="addHabit">
            <div className="habitDiv">
            <h1 className="title">Add Habit</h1>
            <HabitForm bigState={props.bigState} redirect={redirectToDash} />
            </div>
        </div>
    )
}
