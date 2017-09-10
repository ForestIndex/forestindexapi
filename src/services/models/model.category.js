import mongoose from 'mongoose';
const schema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String },
    _service: { type: Number, ref: 'Service' },
    order: { type: Number }
});

const Category = mongoose.model('Category', schema, 'Category');
module.exports = Category;