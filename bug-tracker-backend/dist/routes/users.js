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
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        const users = yield User.find().populate('bugs', { title: 1, description: 1 });
        res.json(users);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password.length < 6) {
        res.status(400).json('Password too short');
        return;
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
    const name = req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const newUser = new User({ username: name, email, role, passwordHash, bugs: [] });
    try {
        const addedUser = yield newUser.save();
        res.json(addedUser);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: ' + e));
});
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted"))
        .catch(e => res.status(400).json('Error: ' + e));
});
router.post('/update/role/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed to post a bug
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        yield User.findByIdAndUpdate(req.params.id, { role: req.body.role });
        res.json("user updated");
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
module.exports = router;
//# sourceMappingURL=users.js.map