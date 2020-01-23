const User = require('../models/user_model')
const Habit = require('../models/habit_model')

const users = [{
    username: 'user1',
    password: '123456'
}, {
    username: 'user2',
    password: 'password'
}]

const habits= [{
    title: 'get 8 hours sleep',
    frequency: 'Daily',
    dateChecked: [new Date(2020, 0, 1, 0, 0, 0), new Date(2020, 0, 2, 0, 0, 0), new Date(2020, 0, 5, 0, 0, 0), new Date(2020, 0, 6, 0, 0, 0),  new Date(2020, 0, 22, 0, 0, 0),new Date()],
    streak: 0
},
{
    title: 'walk to work',
    frequency: 'Weekly',
    dateChecked: [new Date(2020, 0, 6, 0, 0, 0), new Date(2020, 0, 9, 0, 0, 0), new Date(2020, 0, 13, 0, 0, 0), new Date(2020, 0, 15, 0, 0, 0)],
    streak: 0
}
]

const saveUser = async (user) => {
        const userObj = new User(user)
        const newUser = await userObj.save()
        return newUser._id
}
const seed = (req, res) => {
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


