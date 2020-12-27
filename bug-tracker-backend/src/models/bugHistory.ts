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
        ref: 'User',
        required: true,
      },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    priority: {
      type: String,
    },
    open: {
      type: Boolean
    }, 
    type: {
      type: String,
      required: true
    },
    created: {
      type: String
    },
    updated: {
      type: String
    },
    revision: {
      type: Number
    },
    oldID: {
        type: String
    }
})

bugSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const BugHistory = mongoose.model('BugHistory', bugSchema);

module.exports = BugHistory;