const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const db_name = (process.env.NODE_ENV === )
let url = 'mongodb://localhost:27017/habits_db';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected!!!'));

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;