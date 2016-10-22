import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const paymentSchema = new Schema({
    amount: Number
}, {
    timestamps: true
});

const Payment = Mongoose.model('Payment', paymentSchema);

export default Payment;
