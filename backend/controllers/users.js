const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const {ErrorHandler} = require('./../helpers/errors');
const { SESS_NAME } = process.env;

const registerUser = (req, res, next) => {
    if(!req.body.hasOwnProperty('username')){
        throw new ErrorHandler(400, 'must submit a username')
    } else if (!req.body.hasOwnProperty('password')){
        throw new ErrorHandler(400, 'must submit a password')
    }
    const {username, password} = req.body;
    if(username.length < 3 || username.length > 20){
        throw new ErrorHandler(400, 'username must be at least 3 characters and at most 20 characters')
    } else if(password.length < 6 || password.length > 15){
        throw new ErrorHandler(400, 'password must at least 6 characters and at most 15 characters')
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = {
        username: username,
        password: hashedPassword
    };
    const newUser = new User(user);
    newUser.save()
    .then(resp => res.status(201).json(resp))
    .catch(error => { 
        error = error.code === 11000 ? new ErrorHandler(409, 'this username has been taken') : new ErrorHandler()
        next(error)
    })
}

const getUser = (req, res, next) => {
    const {userId} = req.session;
    const userLoggedIn = (userId ? true : false);
    if(userLoggedIn){
        User.findOne({ _id: userId})
        .then(user => {
            const {
                _id,
                username
            } = user;
            res.json({
                userLoggedIn,
                _id,
                username
            });
        })
        .catch(() => {
            let error = new ErrorHandler()
            next(error)})
    } else {
        res.json({
            userLoggedIn
        })
    } 
}

const loginUser = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, 'password')
    .then(user => {
        if(!user) throw new ErrorHandler(404, 'this user does not exist');
        bcrypt.compare(req.body.password, user.password)
        .then(success => {
            if(!success) throw new ErrorHandler(409, 'the password is incorrect')
            req.session.userId = user._id;
            res.status(200).json({message: 'user has been logged in'});
        }).catch(error => next(error))
    })
    .catch(error => {
        error = !error.hasOwnProperty('statusCode') ? new ErrorHandler() : error
        next(error)})
}

const logoutUser = (req, res, next) => {
    try {
        req.session.destroy()
        res.clearCookie(SESS_NAME)
        res.status(200).json({message: 'logged out user'})
    } catch {
        let error = new ErrorHandler();
        next(error)
    }
}

module.exports = {
    getUser,
    registerUser,
    loginUser,
    logoutUser
}