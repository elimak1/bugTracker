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
let Project = require('../models/project');
let BugHistory = require('../models/bugHistory');
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
        const bugs = yield Bug.find().populate('user', { username: 1 })
            .populate('project', { title: 1 })
            .populate('assignedTo', { username: 1 });
        res.json(bugs);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bug = yield Bug.findById(req.params.id);
        res.json(bug);
    }
    catch (e) {
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
    let user;
    try {
        user = yield User.findById(decodedToken.id);
    }
    catch (e) {
        res.status(401).json({ error: 'user not found' });
    }
    // User need to be confirmed to create a ticket
    if (!user.confirmed) {
        return res.status(401).json({ error: 'Account needs to be confirmed to create a project' });
    }
    let project;
    try {
        project = yield Project.findById(req.body.project);
    }
    catch (e) {
        res.status(401).json({ error: 'project not found' });
    }
    let assignedTo;
    try {
        assignedTo = yield User.findById(req.body.assignedTo);
    }
    catch (e) {
        res.status(401).json({ error: 'assigned user not found' });
    }
    const title = req.body.title;
    const description = req.body.description;
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const newBug = new Bug({ title, description, user: user._id, project: project._id, assignedTo: assignedTo._id,
        priority: "High", open: true, type: req.body.type, revision: 1, created: formattedDate });
    try {
        let savedBug = yield newBug.save();
        user.bugs = user.bugs.concat(savedBug._id);
        yield user.save();
        project.tickets = project.tickets.concat(savedBug._id);
        yield project.save();
        yield savedBug.populate('user', { username: 1 }).execPopulate();
        yield savedBug.populate('project', { title: 1 }).execPopulate();
        yield savedBug.populate('assignedTo', { username: 1 }).execPopulate();
        console.log(savedBug);
        res.json(savedBug);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
router.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(req);
    if (!token) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    // Users token needed 
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    let user;
    try {
        user = yield User.findById(decodedToken.id);
    }
    catch (e) {
        return res.status(401).json({ error: 'user not found' });
    }
    // User need to be confirmed to edit a ticket
    if (!user.confirmed && !(user.role === "Admin" || user.role === "Project Manager")) {
        return res.status(401).json({ error: 'You dont have permission to edit this ticket' });
    }
    // Add current ticket to history
    let revision;
    try {
        let old = yield Bug.findById(req.params.id);
        if (old.revision) {
            revision = old.revision + 1;
        }
        else {
            revision = 1;
        }
        const bugToHistory = new BugHistory({
            title: old.title,
            description: old.description,
            user: old.user,
            project: old.project,
            assignedTo: old.assignedTo,
            priority: old.priority,
            open: old.open,
            type: old.type,
            created: old.created,
            oldID: old._id
        });
        yield bugToHistory.save();
    }
    catch (e) {
        console.log(e);
        return res.status(400).json('Error: ' + e);
    }
    const title = req.body.title;
    const description = req.body.description;
    const assignedTo = req.body.assignedTo;
    const priority = req.body.priority;
    const open = req.body.open;
    const type = req.body.type;
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const updatedParams = { title, description, updated: formattedDate,
        assignedTo, priority, open, type, revision };
    try {
        yield Bug.findByIdAndUpdate(req.params.id, updatedParams);
        const getUpdated = yield Bug.findById(req.params.id)
            .populate('user', { username: 1 })
            .populate('project', { title: 1 })
            .populate('assignedTo', { username: 1 });
        res.json(getUpdated);
    }
    catch (e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
}));
module.exports = router;
//# sourceMappingURL=bugs.js.map