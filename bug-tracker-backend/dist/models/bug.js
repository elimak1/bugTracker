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
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
});
const Bug = mongoose_1.default.model('User', bugSchema);
module.exports = Bug;
//# sourceMappingURL=bug.js.map