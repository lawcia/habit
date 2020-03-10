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

describe('API users routes', () => {

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
    });
});