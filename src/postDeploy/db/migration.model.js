import mongoose from 'mongoose';

const migrationSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String }
});

const Migration = mongoose.model('Migration', migrationSchema, 'Migration');

module.exports = Migration;
