const express = require('express');
const seed = require('../seeds/createUsers')
const User = require('../models/user_model')

const router = express.Router();

router.get('/seed', (req, res) => {
    seed()
    res.send('seeded')
})

router.post('/createuser', (err, req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    let newUser = new User(user);
    newUser.save((err, user) => {
        if (err) {
            if(err.code === 11000){

                res.status(409).json({success: false, message: 'This username has already been registered'})
            } else{
                res.status(500).json({success: false, message: 'Internal server error'})
            }
        }
        else {
            res.send({success: true, message: 'You have registered, please login!'})
        }
    });
})
router.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({username: user.username},(err,u) => {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        }
        else if(user.password !== u.password) {
            res.status(404).send('the username or password is incorrect')       
        } else  {    
            res.send(u)
        }
    });
})

module.exports = router;
