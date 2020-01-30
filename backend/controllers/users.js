const User = require('../models/user_model');

const createNewUser = async (user) => {
    let newUser = new User(user);
    return await newUser.save();
}

module.exports = {
    createNewUser
}