const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./backend/routes/index');
const bodyParser = require('body-parser');
const { ErrorHandler, 
    handleError } = require('./backend/helpers/errors');

// so that you can use .env 
const path = require('path');
require('dotenv').config();

// for routing
const app = express();

// get environment variables
const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET, 
    USER,
    PASSWORD
} = process.env

// configure express-session
const TWO_HOURS = 1000 * 60 * 60 * 2;
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
    maxAge: TWO_HOURS,
    sameSite: true,
    secure: false
    }
}))

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')));

// assign database name depending on environment
let db_name;
let uri;
switch(NODE_ENV){
    case 'production':
        db_name = 'habits_db';
        uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0-c71bf.mongodb.net/${db_name}`;
        break;
    case 'development':
        db_name = 'habits_db_dev';
        uri = `mongodb://localhost:27017/${db_name}`;
        break;
    case 'test':
        db_name = 'habits_db_test'
        uri = `mongodb://localhost:27017/${db_name}`;
        break;
    default:
        throw  new Error('cannot find process env')
}

// MongoDB connection 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected!!!'));

// routes for api
app.use('/api/v1', routes);

// routes for frontend
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//error handling
app.use((req, res, next) => {
    let err = new ErrorHandler(404, 'Not Found');
    next(err)
});

app.use((err, req, res, next) => {
    handleError(err, res)
});

// start express server
app.listen(PORT, () => {
    console.log(`Habit is running on port: ${PORT}`);
});

module.exports = {app : app, uri : uri};