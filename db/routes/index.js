const express = require('express');
const seed = require('../seeds/createUsers')
const User = require('../models/user_model')

const router = express.Router();

router.get('/seed', (req, res) => {
    seed()
    res.send('seeded')
})

router.post('/createuser', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    let newUser = new User(user);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send(user)
        }
    });
})
router.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne(user,(err,user) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.send(user)
        }
    });
})

module.exports = router;
