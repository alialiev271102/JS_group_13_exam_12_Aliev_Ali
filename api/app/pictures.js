const path = require('path');
const fs = require("fs").promises;
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Picture = require("../models/Picture");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};
        const sort = {};

        if (req.query.filter === 'image') {
            query.image = {$ne: null};
        }

        if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
            sort._id = -1;
        }

        const picture = await Picture.find(query).sort(sort).populate("title");

        return res.send(picture);
    } catch (e) {
        next(e);
    }
});

router.get('/myGallery/:id', async (req, res, next) => {
    try {
        const query = req.params.id;
        const picture = await Picture.find({creatorUserId: query});
        return res.send(picture);
    } catch (e) {
        next(e);
    }

});

router.get('/:id', async (req, res, next) => {
    try {
        const picture = await Picture.findById(req.params.id);

        if (!picture) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(picture);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({message: 'Title and image file are required'});
        }

        const pictureData = {
            creatorUserId: req.body.creatorUserId,
            userName: req.body.userName,
            title: req.body.title,
            image: null,
        };

        if (req.file) {
            pictureData.image = req.file.filename;
        } else {
            return res.status(400).send({message: 'image file are required'});
        }
        const picture = new Picture(pictureData);
        await picture.save();

        return res.send({message: 'Created new Picture', id: picture._id});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            if (req.file) {
                await fs.unlink(req.file.path);
            }

            return res.status(400).send(e);
        }

        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);

        const user = await Picture.findOne({token});

        if (!user) return res.send(message);

        const picture = await Picture.deleteOne({_id: req.params.id});
        if (!picture) {
            return res.status(404).send({message: 'Not found'});
        }


        return res.send(message);
    } catch (e) {
        next(e);
    }
});

module.exports = router;