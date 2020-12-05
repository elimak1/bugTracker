import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }]
    
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;