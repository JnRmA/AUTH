const express = require('express');
const {ResgisterUser, LoginUser,  simpleG1, signin, board}= require('../controllers/auth-controls');
const Authentication = require('../middleware/Authentication');
const router = express.Router();
const authToken = require('../middleware/authToken');

router.post('/register', ResgisterUser);

router.post('/login', LoginUser);
router.post('/T',signin);
router.get('/dashboard', Authentication, board);


module.exports = router;