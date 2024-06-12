const express = require('express');
const { loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;