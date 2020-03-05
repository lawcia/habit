process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
let should = require('chai').should();
const chaiHttp = require('chai-http');
const {app} = require('../server');
chai.use(chaiHttp);

describe('Server frontend routes', () => {

    it('GET /', done => {
        chai
        .request(app)
        .get('/')
        .then(res => {
            res.status.should.equal(200);
            res.type.should.equal('text/html');
            done();
        })
        .catch(err => done(err))
    })

});