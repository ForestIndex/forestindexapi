import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    _state: { type: Number, ref: 'State' }
});

const County = mongoose.model('County', schema, 'County');
module.exports = County;
