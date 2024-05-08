const express = require('express');
const router = express.Router();
const {signup , signin , getUserByToken} = require('../controllers/User')

router.post('/signup' , signup)
router.post('/signin' , signin)
router.get('/profile', getUserByToken);




module.exports = router;
