const express = require('express');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const {ErrorHandler} = require('./../helpers/errors');
const {loginUser,
       registerUser} = require('./../controllers/users');

const router = express.Router();
const { SESS_NAME } = process.env;

// get logged in user id from session return user
router.get('/', loginUser)

router.post('/register', registerUser)

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
