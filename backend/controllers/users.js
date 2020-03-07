const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const {ErrorHandler} = require('./../helpers/errors');

const UserFindOne = (res, next, userId, userLoggedIn) => {
    User.findOne({
            _id: userId
        })
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
        .catch(err => {
            err = new ErrorHandler()
            next(err);
        })
}

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
    .catch(err => { 
        err = err.code === 11000 ? new ErrorHandler(409, 'this username has been taken') : new ErrorHandler()
        next(err)
    })
}

const loginUser = (req, res, next) => {
    const {
        userId
    } = req.session;
    const userLoggedIn = (userId ? true : false);
    userLoggedIn ? UserFindOne(res, next, userId, userLoggedIn) : res.json({
        userLoggedIn
    })
}

module.exports = {
    loginUser,
    registerUser
}