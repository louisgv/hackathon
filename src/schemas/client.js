import Mongoose from 'mongoose';

const {Schema} = Mongoose;

const clientSchema = new Schema({
  name: String,
  email: String,
  phone: String,

  status: {type: String, enum: ['pending', 'approved']},

  user: {type: Schema.Types.ObjectId, ref: 'User'},
  invite: {type: Schema.Types.ObjectId, ref: 'Invite'},
  paymentHistory: [{type: Schema.Types.ObjectId, ref: 'Payment'}],
  race: {type: String, enum: ['Native American', 'Asian', 'Black', 'Caucasian', 'Hispanic', 'Other'] },
  military: { type: String, enum: ['World War II', 'Korean War', 'Vietnam War', 'Desert Storm', 'Afghan', 'Iraq', 'Other'] },
  income: [
      { totalMonthlyIncome: Number },
      { earned: Number },
      { benefits: Number }
  ],
  disabilities: [
      { disabilityType: Number },
      { receivingServices: Number }
  ],
  education: [
      { lastGradeCompleted: Number },
      { schoolStatus: String }
  ],
  notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]
}, {
  timestamps: true
});

const Client = Mongoose.model('Client', clientSchema);

export default Client;
