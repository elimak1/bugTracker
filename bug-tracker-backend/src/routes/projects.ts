import express from 'express';
let Project = require('../models/project')
let Bug = require('../models/bug');
let User = require('../models/user');
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
        const projects = await Project.find().populate('personnel', {username: 1, email: 1, role: 1})
        .populate({path: 'tickets', populate: {path:'assignedTo'}})
        .populate({path: 'tickets', populate: {path:'user'}});
        res.json(projects);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (e) {
        res.status(400).json('Error: ' + e);
    }
});

router.post('/', async (req,res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
      let user;
      try {
          user = await User.findById(decodedToken.id);
      } catch(e) {
          return res.status(401).json({ error: 'user not found' })
      }
    // User need to be confirmed to create a project
    if(!user.confirmed) {
        return res.status(401).json({error: 'Account needs to be confirmed to create a project'})
    }

    const title: string = req.body.title;
    const description: string = req.body.description;

    const newProject = new Project({title,description, user: user._id, personnel:[user._id]});
    
    try {
        let saved = await newProject.save();
        user.bugs = user.bugs.concat(saved._id);
        await user.save();
        await saved.populate('personnel', {username: 1, email: 1, role: 1}).execPopulate();
        console.log(saved);
        res.json(saved);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

// add user to project
router.post('/:id', async (req,res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findById(req.body.id);
        if(!user.confirmed) {
            return res.status(401).json({error: 'Account needs to be confirmed to add users to project'})
        }
        user.projects = user.projects.concat(project._id);
        await user.save();
        project.personnel = project.personnel.concat(user._id);
        const saved = project.save();
        res.json(saved);
    } catch (e) {
        res.status(400).json('Error: ' + e);
    }
});

module.exports = router;