import Mongoose from 'mongoose';

import races from '../constants/races';
import disabilities from '../constants/disabilities';
import wars from '../constants/wars';
import Note from './note';
import Payment from './payment';

const { Schema } = Mongoose;

const clientSchema = new Schema({
  /* Personal Info */
  name: String,
  email: String,
  phone: String,
  race: {
    type: String,
    enum: races,
    default: 'Other'
  },
  disabilities: [
    {
      category: { type: String, enum: disabilities },
      is_receiving_services: Boolean
    }
  ],

  /* House Info */
  home_type: { type: String, enum: ['House', 'Apartment'], default: 'House' },
  monthly_home_payment: Number,
  lease_start_date: String,
  lease_end_date: String,

  /* Veteran Status */
  veteran: Boolean,
  wars_served: [{ type: String, enum: wars }],

  /* Fiscal Info */
  employed: Boolean,
  earned_income: Number,
  benefits_income: Number,


  /* Meta */
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  invite: { type: Schema.Types.ObjectId, ref: 'Invite' },
  payment_history: [Payment],
  payment_stars: { type: Number, default: 0 },
  payment_streak: { type: Number, default: 0 },
  notes: [Note]
}, {
  timestamps: true
});

const Client = Mongoose.model('Client', clientSchema);

export default Client;
