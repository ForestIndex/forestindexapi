import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    order: { type: Number }
});

const Service = mongoose.model('Service', schema, 'Service');
module.exports = Service;