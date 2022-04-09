const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const ingredient = {
    name: String,
    amount: Number,
}

const CocktailSchema = new Schema({
    creatorUserId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;