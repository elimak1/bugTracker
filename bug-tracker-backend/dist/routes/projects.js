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
let Project = require('../models/project');
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
        const projects = yield Project.find().populate('personnel', { username: 1, email: 1, role: 1 })
            .populate({ path: 'tickets', populate: { path: 'assignedTo' } })
            .populate({ path: 'tickets', populate: { path: 'user' } });
        res.json(projects);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project.findById(req.params.id);
        res.json(project);
    }
    catch (e) {
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    // User need to be confirmed to create a project
    if (!user.confirmed) {
        return res.status(401).json({ error: 'Account needs to be confirmed to create a project' });
    }
    const title = req.body.title;
    const description = req.body.description;
    const newProject = new Project({ title, description, user: user._id, personnel: [user._id] });
    try {
        let saved = yield newProject.save();
        user.bugs = user.bugs.concat(saved._id);
        yield user.save();
        yield saved.populate('personnel', { username: 1, email: 1, role: 1 }).execPopulate();
        console.log(saved);
        res.json(saved);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
// add user to project
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.status(401).json({ error: 'Account needs to be confirmed to assign users' });
    }
    try {
        const project = yield Project.findById(req.params.id);
        const addedUser = yield User.findById(req.body.id);
        if (project.personnel.includes(addedUser._id)) {
            return res.status(400).json('Error: ' + "User already assigned to this project");
        }
        addedUser.projects = addedUser.projects.concat(project._id);
        yield addedUser.save();
        project.personnel = project.personnel.concat(addedUser._id);
        const saved = yield project.save();
        yield saved.populate('personnel', { username: 1, email: 1, role: 1 }).execPopulate();
        yield saved.populate({ path: 'tickets', populate: { path: 'assignedTo' } }).execPopulate();
        yield saved.populate({ path: 'tickets', populate: { path: 'user' } }).execPopulate();
        res.json(saved);
    }
    catch (e) {
        res.status(400).json('Error: ' + e);
    }
}));
module.exports = router;
//# sourceMappingURL=projects.js.map