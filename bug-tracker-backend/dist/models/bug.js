"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bugSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
        trim: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    assignedTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    }
});
bugSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Bug = mongoose_1.default.model('Bug', bugSchema);
module.exports = Bug;
//# sourceMappingURL=bug.js.map