"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Bug'
        }],
    role: {
        type: String,
        trim: true
    }
});
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    }
});
userSchema.plugin(mongoose_unique_validator_1.default);
const User = mongoose_1.default.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map