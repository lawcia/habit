const User = require('../models/user_model')
//console.log(User)
const users = [{
    username: 'user123',
    password: '123456'
},{
    username: 'user123',
    password: '123456'
}]



const first_user = new User({
    username: 'user123',
    password: '123456'
})

first_user.save((error) => {
    if (error) {
        console.log(error)
    } else {
    //console.log(user_data)
    }
})


