const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./backend/routes/index');
const bodyParser = require('body-parser');
const { handleError } = require('./backend/helpers/errors');
const path = require('path');
require('dotenv').config();

const app = express();
const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET, 
    USER,
    PASSWORD
} = process.env

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

let url = `mongodb+srv://${USER}:${PASSWORD}@cluster0-c71bf.mongodb.net/${db_name}`;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected!!!'));

app.use('/api/v1', routes);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    handleError(err, res)
});

app.listen(PORT, () => {
    console.log(`Habit is running on port: ${PORT}`);
});

module.exports = app;