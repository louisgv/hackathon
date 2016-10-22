import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const noteSchema = new Schema({
    type: { type: String, enum: ['Onboard', 'General', 'Other'] },
    body: String
}, {
    timestamps: true
});

const Note = Mongoose.model('Note', noteSchema);

export default Note;
