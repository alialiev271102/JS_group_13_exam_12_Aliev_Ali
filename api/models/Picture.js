const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    creatorUserId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;