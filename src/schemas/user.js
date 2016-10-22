import Mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const {Schema} = Mongoose;

const userSchema = new Schema({
  email: String,
  password: {type: String},
  role: { type: String, enum: ['admin', 'client'] }
}, {
  timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'That email is already in use. <a href="/login">Please log in.</a>',
    MissingPasswordError: 'Please provide a password.',
    IncorrectPasswordError: 'Password or email are incorrect.',
    IncorrectUsernameError: 'Password or email are incorrect.',
    MissingUsernameError: 'Please provide an email address.'
  }
});

const User = Mongoose.model('User', userSchema);

export default User;
