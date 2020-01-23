process.env.NODE_ENV = 'test';
const mocha = require('mocha');
const chai = require('chai');
let expect = require('chai').expect;
let should = require('chai').should();
const chaiHttp = require('chai-http');
const server = require('../db/server');
let mongoose = require('mongoose');
const User = require('../db/models/user_model');

chai.use(chaiHttp);

describe('Connect to API', function () {
    User.collection.drop();
})

it('should connect to the db', (done) => {
    let isConnected;
    const db_name = (process.env.NODE_ENV === 'test' ? 'test_db' : "habits_db");
    let url = `mongodb://localhost:27017/${db_name}`;

    mongoose.connect(url, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', (error) => {
        isConnected = false;
    })
    db.once('open', () => {
        isConnected = true;
    })

    done()
    isConnected.should.be(true)

    it('should Create User', (done) => {
        chai.request(server)
            .post('/api/v1/createuser')
            .send({
                "username": "Jess",
                "password": "Movement",
            })
            .end((err, res) => {
                res.should.be.a('object');
                res.body.should.have.property('username');
                res.body.password.should.equal('Movement');
                done();
            })
    })
});