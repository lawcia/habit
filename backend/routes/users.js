const express = require('express');
const {
getUser,
registerUser,
loginUser,
logoutUser} = require('./../controllers/users');

const router = express.Router();

router.get('/', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

module.exports = router;