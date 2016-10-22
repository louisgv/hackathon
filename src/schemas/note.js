import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const noteSchema = new Schema({
  note: { type: String },
}, {
  timestamps: true
});

const Note = Mongoose.model('Note', noteSchema);

export default Note;
