const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const { handleError } = require('./helpers/errors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const {
    PORT = 5000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET
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

const db_name = (process.env.NODE_ENV === 'test' ? 'test_db' : 'habits_db');
let url = `mongodb://localhost:27017/${db_name}`;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected!!!'));

app.use('/api/v1', routes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    handleError(err, res)
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;