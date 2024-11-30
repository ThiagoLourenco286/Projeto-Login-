const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')

router.get('/login', (req, res) => res.render('index', { error: false, body: {} }))
router.get('/register', (req, res) => res.render('register', { error: false, body: {} }))

router.post('/login', express.urlencoded({ extended: true }), userControllers.login)
router.post('/register', express.urlencoded({ extended: true }), userControllers.register)

module.exports = router 