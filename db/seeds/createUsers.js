const User = require('../models/user_model')

const users = [{
    username: 'user1',
    password: '123456'
},{
    username: 'user2',
    password: 'password'
}]


const saveUser = () => {
    User.collection.drop()
    users.forEach(user => {
        const userObj = new User(user)
        
          userObj.save((err, data) => {
              if(data){
                  console.log('saved')
                  console.log(data)
              }
          })
    })
}

module.exports = saveUser


