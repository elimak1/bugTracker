import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema= new Schema({
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
    personnel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug'
    }]
})

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;