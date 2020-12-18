import express from 'express';
let Bug = require('../models/bug');
let User = require('../models/user');
let Project = require('../models/project');
const router = express.Router();

const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

router.get('/', async (_req, res) => {
    try {
        const bugs = await Bug.find().populate('user', {username : 1})
        .populate('project', {title : 1})
        .populate('assignedTo', {username : 1});
        res.json(bugs);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
});

router.post('/', async (req,res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    
    // Users token needed to post a bug
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }
    let user;
    try {
        user = await User.findById(decodedToken.id);
    } catch(e) {
        res.status(401).json({ error: 'user not found' });
    }

    let project;
    try {
        project = await Project.findById(req.body.project);
    } catch(e) {
        res.status(401).json({ error: 'project not found' });
    } 
    
    let assignedTo;
    try {
        assignedTo = await User.findById(req.body.assignedTo);
    } catch(e) {
        res.status(401).json({ error: 'assigned user not found' });
    } 
    
    const title: string = req.body.title;
    const description: string = req.body.description;

    const date: Date = new Date();
    const formattedDate: String = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + 
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const newBug = new Bug({title,description, user: user._id, project: project._id, assignedTo: assignedTo._id,
    priority: "High", open: true, type: req.body.type, history: [], created: formattedDate});
    
    try {
        const savedBug = await newBug.save();
        user.bugs = user.bugs.concat(savedBug._id);
        await user.save();
        project.tickets = project.tickets.concat(savedBug._id)
        await project.save();
        res.json(savedBug);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

module.exports = router;