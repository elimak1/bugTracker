import express from 'express';
let Bug = require('../models/bug');
let User = require('../models/user');
const router = express.Router();

const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

router.get('/', async (_req, res) => {
    try {
        const bugs = await Bug.find().populate('user', {username : 1});
        res.json(bugs);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
});

router.post('/', async (req,res) => {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed to post a bug
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    const user = await User.findById(decodedToken.id)
    const title: string = req.body.title;
    const description: string = req.body.description;

    const newBug = new Bug({title,description, user: user._id});
    
    try {
        const savedBug = await newBug.save();
        user.bugs = user.bugs.concat(savedBug._id);
        await user.save();
    
        res.json(savedBug);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

module.exports = router;