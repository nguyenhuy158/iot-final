var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var { Sequelize, DataTypes } = require('sequelize');
const { User } = require('../models');

var router = express.Router();
var Controller = require('../controller/user/home.controller');




// GET routes to render UI using Pug
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('logout', options = {
        title: 'Nguyen Tuan Trong',
    });
});

// Routes
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('username, password');
    console.log(username, password);

    try {
        const user = await User.findOne({ where: { username } });
        console.log('user');
        console.log(user);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.isAuthenticated = true;

            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
            // res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log('error');
        console.log(error);

        res.status(500).json({ message: 'Error logging in', error });
    }
});

// router.post('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).json({ message: 'Error logging out', error: err });
//         }
//         res.status(200).json({ message: 'Logout successful' });
//     });
// });
module.exports = router;
