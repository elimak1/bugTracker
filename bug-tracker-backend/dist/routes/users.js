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
const CLIENT_ORIGIN = "http://localhost:3000/";
const emailSender_1 = require("../utility/emailSender");
const getTokenFrom = req => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().populate('bugs', { title: 1, description: 1 })
            .populate('projects', { title: 1, description: 1 });
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
    const username = req.body.username;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const company = req.body.firstName;
    const about = req.body.about;
    let role = "N/A";
    if (req.body.role) {
        role = req.body.role;
    }
    const newUser = new User({ username, email, role, passwordHash, bugs: [], project: [], firstName, lastName, company, about });
    let addedUser;
    try {
        addedUser = yield newUser.save();
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
    // Send account confirmation email
    // Make secret from id
    const confirmationConten = {
        id: addedUser.id,
    };
    console.log(confirmationConten);
    const secret = jwt.sign(confirmationConten, process.env.SECRET);
    const emailObject = {
        subject: 'BugTracker Confirm Email',
        html: `
          <a href='${CLIENT_ORIGIN}confirmation/${secret}'>
            click to confirm email
          </a>
        `,
        text: `Copy and paste this link: ${CLIENT_ORIGIN}confirmation/${secret}`
    };
    emailSender_1.emailSender(email, emailObject);
    res.json(addedUser);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        res.json(user);
    }
    catch (e) {
        res.status(400).json('Error: ' + e);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    let user;
    try {
        user = yield User.findById(decodedToken.id);
    }
    catch (e) {
        return res.status(401).json({ error: 'user not found' });
    }
    // User need to be confirmed
    if (!user.confirmed) {
        return res.status(401).json({ error: 'Account needs to be confirmed to delete user' });
    }
    try {
        const deleted = yield User.findByIdAndDelete(req.params.id);
        res.json(deleted);
    }
    catch (e) {
        res.status(400).json('Error: ' + e);
    }
}));
// Updates users role
router.post('/update/role/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    let user;
    try {
        user = yield User.findById(decodedToken.id);
    }
    catch (e) {
        return res.status(401).json({ error: 'user not found' });
    }
    console.log(user);
    // User need to be admin
    if (!user.confirmed && !(user.role === "Admin")) {
        return res.status(401).json({ error: 'Account doesnt have rights to perform this operation' });
    }
    try {
        let updated = yield User.findByIdAndUpdate(req.params.id, { role: req.body.role });
        // response doesn't have updated role xd
        updated.role = req.body.role;
        res.json(updated);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    let user;
    try {
        user = yield User.findById(decodedToken.id);
    }
    catch (e) {
        return res.status(401).json({ error: 'user not found' });
    }
    // Demouser cant be changed
    if (user.role === "Demo") {
        return res.status(401).json({ error: 'Account doesnt have rights to perform this operation' });
    }
    let updateObject = {};
    if (req.body.passwordHash) {
        const saltRounds = 10;
        const passwordHash = yield bcrypt_1.default.hash(req.body.password, saltRounds);
        updateObject.password = passwordHash;
    }
    if (req.body.username) {
        updateObject.username = req.body.username;
    }
    if (req.body.email) {
        updateObject.email = req.body.email;
    }
    if (req.body.firstName) {
        updateObject.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        updateObject.lastName = req.body.lastName;
    }
    if (req.body.company) {
        updateObject.company = req.body.company;
    }
    if (req.body.about) {
        updateObject.about = req.body.about;
    }
    try {
        yield User.findByIdAndUpdate(decodedToken.id, updateObject);
        // response doesn't have updated role xd
        let updated = yield User.findById(decodedToken.id);
        res.json(updated);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/confirm/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // real id is coded with jwt
    const token = req.params.id;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    const id = decodedToken.id;
    try {
        const user = yield User.findById(id);
        if (user && !user.confirmed) {
            yield User.findByIdAndUpdate(id, { confirmed: true });
            res.json('Email confirmed');
        }
        else {
            res.json('Email already confirmed');
        }
    }
    catch (e) {
        res.status(404).json('Please submit valid id');
    }
}));
module.exports = router;
//# sourceMappingURL=users.js.map