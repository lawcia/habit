const express = require('express');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const {ErrorHandler} = require('./../helpers/errors');
const {createNewUser} = require('./../controllers/users');

const router = express.Router();
const { SESS_NAME } = process.env;


router.get('/', (req, res, next) => {
    const { userId } = req.session;
    let userLoggedIn = (userId? true: false); 
    if(userLoggedIn){
    User.findOne({
        _id: userId
    }, (err, user) => {
        if (err || !user) {
            next(err)
        } else {
            res.json({
                userLoggedIn,
                _id : user._id,
                username: user.username})
        }
       })
    } else {
     res.json({userLoggedIn})
    }
})

router.post('/register', (req, res, next) => {
        let {username, password} = req.body;
        if(!username){
            throw new ErrorHandler(500, 'must submit a username')
        } 
        if(!password){
            throw new ErrorHandler(500, 'must submit a password')
        }
        if(password.length < 6 || password.length > 15){
            throw new ErrorHandler(500, 'password must at least 6 characters and at most 15 characters')
        }
        let hash = bcrypt.hashSync(password, 10)
        let user = {
            username: username,
            password: hash
        }
        createNewUser(user).then((resp) => {
        res.status(200).json(resp)
        }).catch((err) => {
            if(err.code === 11000){
                err = new ErrorHandler(409, 'this username has been taken')
            } 
            next(err)
        })
})

router.post('/login', async (req, res, next) => {
    try{
    User.findOne({
        username: req.body.username
    }, 'password', (databaseError, user) => {
        if (databaseError) {
            let err = new ErrorHandler(500, 'internal server error');
            next(err)
        } else if (!user){
            let err = new ErrorHandler(404, 'this user does not exist');
            next(err)
        } else {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if(success) {
                    req.session.userId = user._id;
                    res.send('user has been logged in');
                } else {
            let err = new ErrorHandler(404, 'the password is incorrect');
            next(err)
                }
                })
            }
        }
    )}
    catch(err){
        next(err)
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie(SESS_NAME)
    res.send('logged out user')
})

module.exports = router;
