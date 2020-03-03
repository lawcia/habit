const User = require('../models/user_model')
const Habit = require('../models/habit_model')
const bcrypt = require('bcryptjs');

// mock users data
let users = [{
    username: 'user1',
    password: '123456'
}, {
    username: 'user2',
    password: 'password'
}]

// mock habit data
const habits= [{
    title: 'get 8 hours sleep',
    frequency: 'Daily',
    dateChecked: [new Date(2020, 0, 1, 0, 0, 0), new Date(2020, 0, 2, 0, 0, 0), new Date(2020, 0, 5, 0, 0, 0), new Date(2020, 0, 6, 0, 0, 0),  new Date(2020, 0, 22, 0, 0, 0), new Date()],
    streak: 0
},
{
    title: 'walk to work',
    frequency: 'Weekly',
    dateChecked: [new Date(2020, 0, 6, 0, 0, 0), new Date(2020, 0, 9, 0, 0, 0), new Date(2020, 0, 13, 0, 0, 0), new Date(2020, 0, 15, 0, 0, 0), new Date()],
    streak: 0
}
]

// saves user to database, returns id
const saveUser = async (user) => {
                user.password = bcrypt.hashSync(user.password, 10)
                const userObj = new User(user)
                let newUser = await userObj.save()
                return newUser._id
}

// drops databases then saves users and habits to db
const seed = async (req, res) => {
    User.collection.drop()
    Habit.collection.drop()
    Promise.all(users.map(user => {
        return saveUser(user)
    })).then((userIds) => {
    habits.forEach(habit => {
        const newhabit = {
            userId: userIds[0],
            title: habit.title, 
            dateChecked: habit.dateChecked,
            frequency: habit.frequency,
            streak: habit.streak
        };
        const habitJog = new Habit(newhabit);
        habitJog.save((err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Saved")
            }
        })
    })
})
    res.send('Seeded')
}
module.exports = seed


