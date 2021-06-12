//KONEKSI KE DATABASE!
require('../connections/connections.js')
const express = require('express');
const router = express.Router();
const {getLogin, getRegister,
    postRegister,postLogin} = require('../controllers/register')

//GET LOGIN
router.get('/login', getLogin);
//POST LOGIN
router.post('/login', postLogin);


//GET REGISTER
router.get('/register', getRegister);
//POST REGISTER 
router.post('/register', postRegister)


 
module.exports = router;