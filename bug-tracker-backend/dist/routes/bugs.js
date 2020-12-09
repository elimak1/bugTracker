"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let Bug = require('../models/bug');
let User = require('../models/user');
const router = express_1.default.Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = req => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bugs = yield Bug.find().populate('user', { username: 1 });
        res.json(bugs);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed to post a bug
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = yield User.findById(decodedToken.id);
    const title = req.body.title;
    const description = req.body.description;
    const newBug = new Bug({ title, description, user: user._id });
    try {
        const savedBug = yield newBug.save();
        user.bugs = user.bugs.concat(savedBug._id);
        yield user.save();
        res.json(savedBug);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
module.exports = router;
//# sourceMappingURL=bugs.js.map