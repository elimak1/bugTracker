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
})

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;