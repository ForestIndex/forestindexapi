import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    abbreviation: { type: String }
});

const State = mongoose.model('State', schema, 'State');
module.exports = State;
