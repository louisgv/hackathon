import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const paymentSchema = new Schema({
    amount: Number
}, {
    timestamps: true
});

export default paymentSchema;
