const User = require('../models/user_model')
const Habit = require('../models/habit_model')

const users = [{
    username: 'user1',
    password: '123456'
}, {
    username: 'user2',
    password: 'password'
}]

const saveUser = (user) => {
    try {
        const userObj = new User(user)
        userObj.save((err, data) => {
            if (data) {
                const habit = {
                    userId: data._id,
                    title: "Jog", frequency: "Weekly"
                };
                const habitJog = new Habit(habit);
                habitJog.save((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Saved")
                    }
                })
            }
        })

    }
    catch (err) {
    }
}
const seed = (req, res) => {
    User.collection.drop()
    Habit.collection.drop()
    users.forEach(user => saveUser(user))
    res.send('Seeded')
}
module.exports = seed


