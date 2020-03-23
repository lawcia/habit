process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');

const { app } = require('../server');
const User = require('../backend/models/user_model');
const Habit = require('../backend/models/habit_model');

chai.use(chaiHttp);

describe('API /habits', () => {
    let userId;

    before(done => {
        const hashedPassword = bcrypt.hashSync('56765578', 10);
        const user = new User({username: 'user456', password: hashedPassword});
        user.save()
        .then(user => { 
            userId = String(user._id);
            done()})
        .catch(error => done(error))
    });

    after(done => {
        User.deleteMany({})
        .then(() => done())
        .catch(err => done(err))
    })

    it('POST /api/v1/habits add a new habit', done => {
        chai.request(app)
        .post('/api/v1/habits')
        .send({
            title: 'sleep more',
            frequency: 'Daily',
            userId: userId
        })
        .then(res => {
            res.status.should.equal(200);
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('You have added habit!');
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            done();
        })
        .catch(err => done(err))
    })

    it('POST /api/v1/habits should not add habit', done => {
        chai.request(app)
        .post('/api/v1/habits')
        .send({
            title: 'sleep more',
            frequency: 'Daily',
            userId: 'jhbbk'
        })
        .then(res => {
            res.status.should.equal(409);
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Not added');
            done();
        })
        .catch(err => done(err))
    })


})

