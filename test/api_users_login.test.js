process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const should = require('chai').should();
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const { app } = require('../server');
const User = require('../backend/models/user_model');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('API users/login routes', () => {
    const username = 'user456';
    const password = '56765578';
    
    before(done => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({username: username, password: hashedPassword});
        user.save()
        .then(user => done())
        .catch(error => done(error))
    });

    after(done => {
        User.deleteMany({})
        .then(() => done())
        .catch(err => done(err));
    })

    it('POST /api/v1/users/login should login user', done => {
        let agent = chai.request.agent(app);
        agent.post('/api/v1/users/login')
        .send({username: username, password: password})
        .then(res => {
            res.status.should.equal(200);
            res.should.be.a('object');
            res.should.have.cookie('sid');
            res.body.should.have.property('message');
            res.body.message.should.equal('user has been logged in');
            Object.keys(res.body).length.should.equal(1);
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

    it('POST /api/v1/users/login should send user does not exist', done => {
        let agent = chai.request.agent(app);
        agent.post('/api/v1/users/login')
        .send({username:'randomuser', password: password})
        .then(res => {
            res.status.should.equal(404);
            res.should.be.a('object');
            res.should.not.have.cookie('sid');
            res.body.should.have.property('status');
            res.body.status.should.equal('error');
            res.body.should.have.property('statusCode');
            res.body.statusCode.should.equal(404);
            res.body.should.have.property('message');
            res.body.message.should.equal('this user does not exist');
            agent.get('/api/v1/users')
            .then(res => {
                res.status.should.equal(200);
                res.should.be.a('object');
                agent.should.not.have.cookie('sid');
                res.body.should.have.property('userLoggedIn');
                res.body.userLoggedIn.should.equal(false);
                res.body.should.not.have.property('_id');
                res.body.should.not.have.property('username');
                Object.keys(res.body).length.should.equal(1);
                done();
            }).catch(err => done(err))
        })
        .catch(err => done(err))
    })

    it('POST /api/v1/users/login should send incorrect password', done => {
        let agent = chai.request.agent(app);
        agent.post('/api/v1/users/login')
        .send({username: username, password: 'wrongpassword'})
        .then(res => {
            res.status.should.equal(409);
            res.should.be.a('object');
            res.should.not.have.cookie('sid');
            res.body.should.have.property('status');
            res.body.status.should.equal('error');
            res.body.should.have.property('statusCode');
            res.body.statusCode.should.equal(409);
            res.body.should.have.property('message');
            res.body.message.should.equal('the password is incorrect');
            agent.get('/api/v1/users')
            .then(res => {
                res.status.should.equal(200);
                res.should.be.a('object');
                agent.should.not.have.cookie('sid');
                res.body.should.have.property('userLoggedIn');
                res.body.userLoggedIn.should.equal(false);
                res.body.should.not.have.property('_id');
                res.body.should.not.have.property('username');
                Object.keys(res.body).length.should.equal(1);
                done();
            }).catch(err => done(err))
        })
        .catch(err => done(err))
    })

    it('POST /api/v1/users/login should send server error', done => {
        let error = new Error();
        let stub = sinon.stub(User, 'findOne').rejects(error);
        chai.request(app)
        .post('/api/v1/users/login')
        .send({username: username, password: password})
        .then(res => {
            res.status.should.equal(500)
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('Internal server error');
            res.body.should.have.property('status');
            res.body.status.should.equal('error');
            res.body.should.have.property('statusCode');
            res.body.statusCode.should.equal(500);
            stub.restore();
            done()
        })
        .catch(err => { 
            stub.restore();
            done(err)})
    })

 
});