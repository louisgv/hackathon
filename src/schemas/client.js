import Mongoose from 'mongoose';

const {Schema} = Mongoose;

const clientSchema = new Schema({
  name: String,
  email: String,
  phone: String,

  status: {type: String, enum: ['pending', 'approved']},

  user: {type: Schema.Types.ObjectId, ref: 'User'},
  invite: {type: Schema.Types.ObjectId, ref: 'Invite'}
}, {
  timestamps: true
});

const Client = Mongoose.model('Client', clientSchema);

export default Client;
