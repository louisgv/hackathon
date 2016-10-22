import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const noteSchema = new Schema({
    type: { type: String, enum: ['Approve', 'Call - Response', 'Call - No Response', 'Comment'] },
    body: String
}, {
    timestamps: true
});

const Note = Mongoose.model('Note', noteSchema);

export default Note;
