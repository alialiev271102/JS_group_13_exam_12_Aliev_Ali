const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("../middleware/auth");
const axios = require('axios');
const {nanoid} = require('nanoid');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

router.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(400).send({error: 'Email not found'});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong'});
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (e) {
        next(e);
    }
});

router.get('/secret', auth, async (req, res, next) => {
    try {
        return res.send({message: 'Hello, ' + req.user.displayName});
    } catch (e) {
        next(e);
    }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

router.post('/googleLogin', async (req, res, next) => {
    try {
        const accessToken = req.body.access_token;
        const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + accessToken);
        console.log(response.data);
        if (response.data.error) return res.status(401).send({message: 'Google token incorrect'});
        if (req.body.id !== response.data.id) return res.status(401).send({message: 'Wrong User ID'});
        let user = await User.findOne({googleId: req.body.id});

        if (!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                googleId: req.body.id,
                displayName: req.body.name,
            });
        }

        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (e) {
        next(e);
    }
})

module.exports = router;