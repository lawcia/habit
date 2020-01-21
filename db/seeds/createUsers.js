const User = require('../models/user_model')
const Habit = require('../models/habit_model')

const users = [{
    username: 'user1',
    password: '123456'
}, {
    username: 'user2',
    password: 'password'
}]

const saveUser = () => {
    User.collection.drop()
    Habit.collection.drop()
    users.forEach(user => {
        const userObj = new User(user)

        userObj.save((err, data) => {
            if (data) {
                console.log('saved')
                console.log(data)
                const habit = {
                    userId: data._id,
                    title: "Jog", frequency: "Weekly"
                };
                const habitJog = new Habit(habit);
                habitJog.save((err, data) => {
                    if (err) {
                        console.error(err)
                    } else {
                        userObj.habits.push(data._id)
                        userObj.save()
                        console.log(data)
                    }
                })
            }
        })
    })
}



module.exports = saveUser


