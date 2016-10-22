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

  /* House Info */
  home: { type: String, enum: ['House', 'Apartment'] },
  rent: Number,
  lease: String,

  /* Meta */
  status: { type: String, enum: ['pending', 'approved'] },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  invite: { type: Schema.Types.ObjectId, ref: 'Invite' },
  paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],

  /* Veteran Status */
  veteran: Boolean,
  wars: [{
    type: String,
    enum: ['World War II', 'Korean War', 'Vietnam War', 'Desert Storm', 'Afghan', 'Iraq', 'Other']
  }],
  earned_income: Number,
  benefits_income: Number,

  disabilities: [
    {
      disabilityType: Number,
      receivingServices: Number
    }
  ],
  education: [
    {
      lastGradeCompleted: Number,
      schoolStatus: String
    }
  ],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
}, {
  timestamps: true
});

const Client = Mongoose.model('Client', clientSchema);

export default Client;
