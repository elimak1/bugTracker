import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        maxlength: 30
        
        
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        maxlength: 100
    },
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }],
    role: {
        type: String,
        trim: true,
        maxlength: 15
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
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