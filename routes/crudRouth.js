//KONEKSI KE DATABASE!
require('../connections/connections.js')
const express = require('express');
const router = express.Router();
const {getBiodatas,getScores
,getLogout,getEdit,
postEdit,postAdd,
getAdd,getDelete} = require('../controllers/crud');

// DASHBOARD HOME BIODATA
router.get('/user/biodata', getBiodatas);

//SCORES
router.get('/scores/:userId', getScores)

//EDIT 
//todo: ENDPOINT POST BISA DINAMAKAN APA AJA
router.get('/scores/edit/:userId', getEdit);
router.post('/:idUser', postEdit);

//ADD 
// router.get('scores/add/:userId')
router.get('/scores/:userId/add',getAdd)
router.post('/scores/:userId/add',postAdd)

//DELETE
router.get('/scores/delete/:userId', getDelete)

//LOGOUT
router.get('/logout', getLogout);

module.exports = router;