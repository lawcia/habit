process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
let should = require('chai').should();
const {uri} = require('../server');
let mongoose = require('mongoose');

describe('Connect to database', () => {

    after(() => {
        mongoose.connection.close();
    })

    it('should establish connection', (done) => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error) => {
        done(error);
    });
    db.once('open', () => {
        const isConnected = true;
        isConnected.should.equal(true);
        done();
    });
    
})

});