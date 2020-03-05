process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
let should = require('chai').should();
const chaiHttp = require('chai-http');
const {app} = require('../server');
const User = require('../backend/models/user_model');
const Habit = require('../backend/models/habit_model');
chai.use(chaiHttp);

describe('Connect to API', function() {
    const username = 'user456';
    const password = '56765578';

    after(function(done){
        User.collection.drop();
        done();
    });

    it('GET /', function(done) {
        chai
        .request(app)
        .get('/')
        .then((res) => {
            res.status.should.equal(200);
            done();
        })
        .catch((err) => {
            done(err);
        })
    })

    it('GET /api/v1/users check user is logged in', function(done){
        chai
        .request(app)
        .get('/api/v1/users')
        .then((res) => {
            done()
            res.status.should.equal(200);
            res.should.be.a('object');
            res.body.should.have.property('userLoggedIn');
            res.body.userLoggedIn.should.equal(false);
            Object.keys(res.body).length.should.equal(1);
        })
        .catch((err) => {
            done(err)
        })
    })

    it('POST /api/v1/users/register should register a new User', function (done) {
        chai
        .request(app)
        .post('/api/v1/users/register')
        .send({
                username: username,
                password: password
            })
            .then((res) => {
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
            .catch((err) => {
               done(err);
            })
    })

});