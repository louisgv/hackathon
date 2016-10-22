import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const clientSchema = new Schema({
  /* Personal Info */
  name: String,
  email: String,
  phone: String,
  race: {
    type: String,
    enum: ['Native American', 'Asian', 'Black', 'Caucasian', 'Hispanic', 'Other']
  },
  disabilities: [
    {
      disabilityType: Number,
      receivingServices: Number
    }
  ],

  /* House Info */
  home: { type: String, enum: ['House', 'Apartment'] },
  rent: Number,
  lease: String,

  /* Veteran Status */
  veteran: Boolean,
  wars: [{
    type: String,
    enum: ['World War II', 'Korean War', 'Vietnam War', 'Desert Storm', 'Afghan', 'Iraq', 'Other']
  }],

  /* Fiscal Info */
  employed: Boolean,
  earned_income: Number,
  benefits_income: Number,

  /* Education */
  lastGradeCompleted: Number,
  schoolStatus: String,


  /* Meta */
  status: { type: String, enum: ['pending', 'approved'] },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  invite: { type: Schema.Types.ObjectId, ref: 'Invite' },
  paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
}, {
  timestamps: true
});

const Client = Mongoose.model('Client', clientSchema);

export default Client;
