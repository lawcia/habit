const Habit = require('../models/habit_model');
const bcrypt = require('bcryptjs');
const { ErrorHandler } = require('./../helpers/errors');

const findHabits = (req, res, next) => {
    Habit.find({
        userId: req.params.id
    })
    .then(habits => res.status(200).send(habits))
    .catch(() => {
        let err = new ErrorHandler();
        next(err);
    })
}

const addHabit = (req, res, next) => {
    const habit = {
        title: req.body.title,
        frequency: req.body.frequency,
        userId: req.body.userId
    };
    const newHabit = new Habit(habit);
    newHabit.save()
    .then(() => {
        res.send({
            success: true, 
            message: 'You have added habit!'
        })
    }).catch(() => {
            let err = new ErrorHandler(409, 'Not added');
            next(err);
        })
}

module.exports = { findHabits, 
addHabit}