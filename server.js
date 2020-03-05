const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./backend/routes/index');
const bodyParser = require('body-parser');
const { handleError } = require('./backend/helpers/errors');

// so that you can use .env 
require('dotenv').config();

// for routing
const app = express();

// get environment variables
const {
    PORT = 8000,
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

// assign database name depending on environment
let db_name;
switch(NODE_ENV){
    case 'production':
        db_name = 'habits_db'
        break;
    case 'development':
        db_name = 'habits_db_dev'
        break;
    case 'test':
        db_name = 'habits_db_test'
        break;
    default:
        throw  new Error('cannot find process env')
}

// MongoDB connection
let uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0-c71bf.mongodb.net/${db_name}`;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected!!!'));

// routes for api
app.use('/api/v1', routes);

// for error handling
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    handleError(err, res)
});

// start express server
app.listen(PORT, () => {
    console.log(`Habit is running on port: ${PORT}`);
});

module.exports = app;