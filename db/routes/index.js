const express =  require('express');
const seed = require('../seeds/createUsers')

const router = express.Router();

router.get('/seed', (req, res) => {
    seed()
    res.send('seeded')
})

module.exports = router;
