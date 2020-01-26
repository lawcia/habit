const express = require('express');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const router = express.Router();
const { SESS_NAME } = process.env;


router.get('/', (req, res) => {
    const { userId } = req.session;
    let userLoggedIn = (userId? true: false); 
    if(userLoggedIn){
    User.findOne({
        _id: userId
    }, (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json({
                userLoggedIn: userLoggedIn,
                _id : user._id,
                username: user.username})
        }
       })
    } else {
     res.json({userLoggedIn: userLoggedIn})
    }
})

router.post('/register', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, (err, hash) => {
        const user = {
        username: req.body.username,
        password: hash
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
});
})

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, 'password', (err, user) => {
        if (err) {
            res.status(500).send(err)
        } else if (!user){
            res.status(404).send('this user does not exist')
        } else {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if(success) {
                    req.session.userId = user._id;
                    res.send('user has been logged in')
                } else {
                    res.status(404).send('the username or password is incorrect')
                }
                })
            }
        }
    )
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie(SESS_NAME)
    res.send('logged out user')
})

module.exports = router;
