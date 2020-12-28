import express from 'express';
let Bug = require('../models/bug');
let User = require('../models/user');
let Project = require('../models/project');
let BugHistory = require('../models/bugHistory');
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

router.get('/:id', async (req,res) => {
    try{
        const bug = await Bug.findById(req.params.id);
        res.json(bug);
    } catch(e) {
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
    priority: "High", open: true, type: req.body.type, revision: 1, created: formattedDate});
    
    try {
        let savedBug = await newBug.save();
        user.bugs = user.bugs.concat(savedBug._id);
        await user.save();
        project.tickets = project.tickets.concat(savedBug._id)
        await project.save();
        await savedBug.populate('user', {username : 1}).execPopulate();
        await savedBug.populate('project', {title : 1}).execPopulate();
        await savedBug.populate('assignedTo', {username : 1}).execPopulate();
        console.log(savedBug);
        res.json(savedBug);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

router.post('/update/:id', async (req,res) => {

    const token = getTokenFrom(req);
    if (!token) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // Users token needed 
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

    console.log("user verified");
    // Add current ticket to history
    let revision: Number;
    try {
        let old = await Bug.findById(req.params.id);
        if (old.revision) {
            revision = old.revision +1;
        } else {
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
        await bugToHistory.save();
    } catch(e) {
        console.log(e);
        return res.status(400).json('Error: ' + e);
    }



      const title: string = req.body.title;
      const description: string = req.body.description;
      const assignedTo: string = req.body.assignedTo;
      const priority: string = req.body.priority;
      const open: Boolean = req.body.open;
      const type: string = req.body.type;
  
      const date: Date = new Date();
      const formattedDate: String = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    const updatedParams = {title, description, updated: formattedDate,
    assignedTo, priority, open, type, revision};
    try {
        
        await Bug.findByIdAndUpdate(req.params.id, updatedParams);
        const getUpdated = await Bug.findById(req.params.id)
        .populate('user', {username : 1})
        .populate('project', {title : 1})
        .populate('assignedTo', {username : 1});
        res.json(getUpdated);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

module.exports = router;