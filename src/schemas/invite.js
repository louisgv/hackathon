import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const inviteSchema = new Schema({
  landlord_name: String,
  landlord_email: String,
  landlord_phone: String,
  client_name: String,
  client_email: String,
  client_phone: String,
  viewed_on: Date,
  accepted_on: Date
}, {
  timestamps: true
});

const Invite = Mongoose.model('Invite', inviteSchema);

export default Invite;
