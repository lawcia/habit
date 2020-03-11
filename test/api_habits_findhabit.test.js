process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const User = require('../backend/models/user_model');
const Habit = require('../backend/models/habit_model');
const bcrypt = require('bcryptjs');

describe('API habits/:id', () => {
    let userId;
    let habitId;

    before(done => {
        const hashedPassword = bcrypt.hashSync('56765578', 10);
        const user = new User({username: 'user456', password: hashedPassword});
        user.save()
        .then(user => { 
            userId = String(user._id);
            return userId})
        .then( async (userId) => {
            const habit = { 
                title: 'jog daily',
                frequency: 'Weekly',
                userId: userId
            }
            const newHabit = new Habit(habit);
            return newHabit.save()
        }).then(habit => {
            habitId = String(habit._id);
            done();
        })
        .catch(error => done(error))
    });

    after(done => {
        User.deleteMany({})
        .then(async() => Habit.deleteMany({}))
        .then(() => done())
        .catch(err => done(err))
    })

    it('GET /api/v1/habits/:id get all habits by user id', done => {
        chai.request(app)
        .get(`/api/v1/habits/${userId}`)
        .then(res => {
            res.status.should.equal(200);
            res.should.be.a('object');
            res.body.should.be.a('array');
            const habit = res.body[0];
            habit.should.have.property('dateChecked');
            habit.dateChecked.should.be.a('array');
            habit.dateChecked.length.should.equal(0);
            habit.should.have.property('streak');
            habit.streak.should.be.a('number');
            habit.streak.should.equal(0);
            habit.should.have.property('_id');
            habit._id.should.equal(habitId);
            habit.should.have.property('title');
            habit.title.should.equal('jog daily');
            habit.should.have.property('frequency');
            habit.frequency.should.equal('Weekly');
            habit.should.have.property('userId');
            habit.userId.should.equal(userId);
            habit.should.have.property('createdAt');
            Date.parse(habit.createdAt).should.be.a('number');
            habit.should.have.property('updatedAt');
            Date.parse(habit.updatedAt).should.be.a('number');
            done();
        })
        .catch(error => done(error))
    })

})