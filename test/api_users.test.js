process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
let should = require('chai').should();
const chaiHttp = require('chai-http');
const {app} = require('../server');
const User = require('../backend/models/user_model');
const Habit = require('../backend/models/habit_model');
chai.use(chaiHttp);

describe('API users routes', () => {
    const username = 'user456';
    const password = '56765578';

    after(done => {
        User.collection.drop();
        done();
    });

    it('GET /api/v1/users check user is logged in', done => {
        let agent = chai.request.agent(app);
        agent.get('/api/v1/users')
        .then(res => {
            done()
            res.status.should.equal(200);
            res.should.be.a('object');
            res.body.should.have.property('userLoggedIn');
            res.body.userLoggedIn.should.equal(false);
            agent.should.not.have.cookie('sid');
            Object.keys(res.body).length.should.equal(1);
        })
        .catch(err => done(err))
    })

    it('POST /api/v1/users/register should register a new User',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({
                username: username,
                password: password
            })
            .then(res => {
                done();
                res.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.username.should.equal(username);
                res.body.should.have.property('password');
                res.body.password.should.not.equal(password);
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/login should login user', done => {
        let agent = chai.request.agent(app);
        agent.post('/api/v1/users/login')
        .send({username: username, password: password})
        .then(res => {
            res.status.should.equal(200);
            res.should.be.a('object');
            res.should.have.cookie('sid');
            agent.get('/api/v1/users')
            .then(res => {
                res.status.should.equal(200);
                res.should.be.a('object');
                agent.should.have.cookie('sid');
                res.body.should.have.property('userLoggedIn');
                res.body.userLoggedIn.should.equal(true);
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.username.should.equal(username);
                Object.keys(res.body).length.should.equal(3);
                done();
            }).catch(err => done(err))
        })
        .catch(err => done(err))
    })
});