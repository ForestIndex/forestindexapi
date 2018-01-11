import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: { type: Number },
    username: { type: String },
    password: { type: String },
    admin: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number },
    info: {
        images: { type: Array, default: [] },
        description: { type: String },
        businessName: { type: String, default: '' },
        phone: { type: String },
        email: { type: String },
        operationalCounties: [{ type: Number, ref: 'County' }],
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: Number, ref: 'State' },
            zip: { type: Number }
        },
        websiteUrl: { type: String }
    },
    hosting: {
        subdomain: { type: String },
        // _template: { type: Number, ref: '' },
    },
    _service: { type: Number, ref: 'Service' },
    _category: { type: Number, ref: 'Category' }
});

const User = mongoose.model('User', schema, 'User');
module.exports = User;
