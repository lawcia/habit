const express = require('express');
const users = require('./users');
const habits = require('./habits');
const seed = require('./seed');

const router = express.Router();

router.use('/seed', seed);
router.use('/habits', habits);
router.use('/users', users);

module.exports = router;