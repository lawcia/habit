const express = require('express');
const seed = require('../seeds/createUsers')
const User = require('../models/user_model')
const Habit = require('../models/habit_model')

const router = express.Router();

router.get('/seed', (req, res) => {
    seed()
    res.send('seeded')
})

router.get('/getall/:id', (req, res) => {
    console.log(req.params.id)
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

router.post('/createuser', (err, req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    let newUser = new User(user);
    newUser.save((err, user) => {
        if (err) {
            if (err.code === 11000) {
                res.status(409).json({
                    success: false,
                    message: 'This username has already been registered'
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
                message: 'You have registered, please login!'
            })
        }
    });
})

router.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
        username: user.username
    }, (err, u) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else if (user.password !== u.password) {
            res.status(404).send('the username or password is incorrect')
        } else {
            res.send(u)
        }
    });
})

router.post('/createhabit', (req, res) => {
    console.log(req.body)
    let habit = {
        title: req.body.title,
        frequency: req.body.frequency,
        userId: req.body.userId
    }
    let newHabit = new Habit(habit);

    User.findOne({
        _id: habit.userId
    }, (err, u) => {
        if (u) {
            u.habits.push(newHabit._id)
            u.save((err, user) => {
                newHabit.save((err, user) => {
                    if (err) {
                        console.log(err)
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
            })
        }
    });
});

router.delete('/deletehabit/:id', (req, res) => {
    console.log(req.params)
    Habit.deleteOne({
        _id: req.params.id
    }, (err, Habit) => {
        User.findOne({
            _id: Habit.userId
        }, (err, u) => {
            if (u) {
                u.habits.pull(req.params.id)
                u.save((err, user) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(err)
                    } else {
                        res.status(200).send("winner")
                    }
                })
            }
        })
    })


})

module.exports = router;