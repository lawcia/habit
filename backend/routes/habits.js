const express = require('express');
const Habit = require('../models/habit_model');
const { findHabits, 
        addHabit } = require('../controllers/habits');
const router = express.Router();

// get habits by user id
router.get('/:id', findHabits)

// post habit, data in body
router.post('/', addHabit)

// delete habit by habit id
router.delete('/:id', (req, res) => {
    Habit.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send("winner")
        }
    })
})

// update habit
router.put('/:id', (req, res) => {
    Habit.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { dateChecked: Date() }},
        (err, habit) => {
            if(err){
                 res.status(500).send(err)
            }else {
                habit.streak += 1
                habit.save((err, resp)=> {
                    if(err){
                        res.status(500).send(err)
                    } else {
                        res.send(habit)
                    }
                })
               
            }
        }
    )
})

// update habit
router.put('/streak/:id', (req, res) => {
    Habit.findByIdAndUpdate(
        { _id: req.params.id },
        { streak: 0},
        (err, habit) => {

            if(err){
                 res.send(err)
            }else {
                console.log(habit.dateChecked)
                res.send(habit)
            }
        }
    )
})

module.exports = router;