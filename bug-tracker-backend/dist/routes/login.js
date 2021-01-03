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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const CLIENT_ORIGIN = "http://localhost:3000/";
const emailSender_1 = require("../utility/emailSender");
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield User.findOne({ username: body.username });
    const passwordCorrect = user === null
        ? false
        : yield bcrypt.compare(body.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res
        .status(200)
        .send({ token, username: user.username });
}));
loginRouter.post('/passwordChange', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    let user;
    try {
        user = yield User.findOne({ "email": email });
    }
    catch (e) {
        return res.status(401).json({ error: 'user not found' });
    }
    if (!user) {
        return res.status(400).json({ error: "email not valid" });
    }
    const emailToken = {
        email: email,
    };
    const secret = jwt.sign(emailToken, process.env.SECRET);
    const emailObject = {
        subject: 'BugTracker change password',
        html: `
    <a href='${CLIENT_ORIGIN}password/${secret}'>
      click to change password
    </a>
  `,
        text: `Copy and paste this link: ${CLIENT_ORIGIN}password/${secret}`
    };
    emailSender_1.emailSender(email, emailObject);
    res.status(200).json('Email sent');
}));
loginRouter.post('/setPassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // real email is coded with jwt
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const email = decodedToken.email;
    try {
        if (req.body.password.length < 6) {
            res.status(400).json('Password too short');
            return;
        }
        const saltRounds = 10;
        const passwordHash = yield bcrypt.hash(req.body.password, saltRounds);
        yield User.findOneAndUpdate({ "email": email }, { passwordHash: passwordHash });
        res.status(200).json('Password changed');
    }
    catch (e) {
        res.status(404).json('User not found');
    }
}));
module.exports = loginRouter;
//# sourceMappingURL=login.js.map