import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const paymentSchema = new Schema({
  amount: Number,
  payed_on: { type: Date, default: Date.now() }
});

export default paymentSchema;
