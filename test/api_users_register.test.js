process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const should = require('chai').should();
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const { app } = require('../server');
const User = require('../backend/models/user_model');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('API users/register routes', () => {
    const username = 'user456';
    const password = '56765578';
    

    after(done => {
        User.deleteMany({})
        .then(() => done())
        .catch(err => done(err));
    });

    it('POST /api/v1/users/register should register a new User',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({
                username: username,
                password: password
            })
            .then(res => {
                res.status.should.equal(201);
                res.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.username.should.equal(username);
                res.body.should.have.property('password');
                res.body.password.should.not.equal(password);
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register this user has already registered',  done => {
     
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: username, password: password})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(409);
                res.body.should.have.property('message');
                res.body.message.should.equal('this username has been taken');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(409);
                done();
            })
            .catch(err => done(err))
        
        
       
    })

    it('POST /api/v1/users/register should send missing data error', done => {   
        chai.request(app)
        .post('/api/v1/users/register')
        .send({})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('must submit a username');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send missing password error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: ''})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('must submit a password');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send missing username error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({password: ''})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('must submit a username');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send username short length error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: '', password:''})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('username must be at least 3 characters and at most 20 characters');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send username long length error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: 'thisisaverylongusername', password:''})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('username must be at least 3 characters and at most 20 characters');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send password short length error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: 'username', password:''})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('password must at least 6 characters and at most 15 characters');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })

    it('POST /api/v1/users/register should send password long length error',  done => {
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: 'username', password:'verylongpassword'})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(400);
                res.body.should.have.property('message');
                res.body.message.should.equal('password must at least 6 characters and at most 15 characters');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(400);
                done();
            })
            .catch(err => done(err))
    })



    it('POST /api/v1/users/register send server error',  done => {
        const error = new Error();
        let stub = sinon.stub(User.prototype, 'save').rejects(error);
        chai.request(app)
        .post('/api/v1/users/register')
        .send({username: username, password: password})
            .then(res => {
                res.should.be.a('object');
                res.status.should.equal(500);
                res.body.should.have.property('message');
                res.body.message.should.equal('Internal server error');
                res.body.should.have.property('status');
                res.body.status.should.equal('error');
                res.body.should.have.property('statusCode');
                res.body.statusCode.should.equal(500);
                stub.restore();
                done();
            })
            .catch(err => {
                stub.restore();
                done(err)
            })
    })

});