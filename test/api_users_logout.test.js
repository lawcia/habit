process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const should = require('chai').should();
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const { app } = require('../server');
const User = require('../backend/models/user_model');

chai.use(chaiHttp);
chai.use(sinonChai);

describe('API users/logout routes', () => {

    after(done => {
        User.deleteMany({})
        .then(() => done())
        .catch(err => done(err));
    });

    it('POST /api/v1/users/logout should logout user', done => {
        let agent = chai.request.agent(app);
        agent.post('/api/v1/users/logout')
        .then(res => {
            res.status.should.equal(200)
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.equal('logged out user');
            res.should.not.have.cookie('sid');
            done()
        })
        .catch(err => done(err))
    })
});