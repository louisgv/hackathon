import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const noteSchema = new Schema({
  note: { type: String }
}, {
  timestamps: true
});

export default noteSchema;
