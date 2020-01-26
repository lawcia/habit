const express = require('express');
const Habit = require('../models/habit_model');
const router = express.Router();

router.get('/:id', (req, res) => {
    Habit.find({
        userId: req.params.id
    }, (err, Habits) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(Habits)
        }
    })
})

router.post('/', (req, res) => {
    let habit = {
        title: req.body.title,
        frequency: req.body.frequency,
        userId: req.body.userId
    }
    let newHabit = new Habit(habit);
    newHabit.save((err) => {
        if (err) {
            if (err.code === 11000) {
                res.status(409).json({
                    success: false,
                    message: 'Not added'
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                })
            }
        } else {
            res.send({
                success: true,
                message: 'You have added habit!'
            })
        }
    })
});

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