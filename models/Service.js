const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    alias: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    cover: { type: String },
    images: [{
        original: String,
        fullscreen: String
    }],
    content: { type: String, required: true },
    category: { type: String },
    isIndividual: { type: Boolean, default: false },
    location: { type: String },
    schedule: { type: String },
    duration: { type: Number, default: 1 },
    quota: { type: Number },
    price: { type: Number },
    rating: { type: Array, default: [0, 0, 0, 0, 0] }
});

module.exports = model('Service', schema);