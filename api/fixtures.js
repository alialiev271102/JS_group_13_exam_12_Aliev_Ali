const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Picture = require("./models/Picture");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        displayName: 'Not limon',
        email: 'user@gmail.com',
        password: '12321',
        token: nanoid(),
    }, {
        displayName: 'limon',
        email: 'limon@gmail.com',
        password: '12321',
        token: nanoid(),
    });

    await Picture.create({
        creatorUserId: await User.findOne({email: 'limon@gmail.com'}),
        userName: 'limon',
        title: 'car',
        image: 'car.jpg'
    },{
        creatorUserId: await User.findOne({email: 'limon@gmail.com'}),
        userName: 'limon',
        title: 'computer',
        image: 'computer.jpeg'
    },{
        creatorUserId: await User.findOne({email: 'user@gmail.com'}),
        userName: 'Not limon',
        title: 'telephone',
        image: 'telephone.jpg'
    },)

    await mongoose.connection.close();
};

run().catch(e => console.error(e));