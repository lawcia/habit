const User = require('../models/user_model');

const createNewUser = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

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
            next(err);
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
    createNewUser,
    loginUser
}