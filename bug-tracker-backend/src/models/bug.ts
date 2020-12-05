import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bugSchema= new Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

bugSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;