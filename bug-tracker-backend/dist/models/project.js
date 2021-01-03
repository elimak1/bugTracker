"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const projectSchema = new Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }],
    tickets: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Bug'
        }]
});
projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Project = mongoose_1.default.model('Project', projectSchema);
module.exports = Project;
//# sourceMappingURL=project.js.map