import express from 'express';
import bcrypt from 'bcrypt';
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
        const users = await User.find().populate('bugs', { title: 1, description: 1 });
        res.json(users);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
});

router.post('/', async (req,res) => {
    
    if(req.body.password.length < 6) {
        res.status(400).json('Password too short');
        return;
    }
    const saltRounds: number = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const name: string = req.body.name;
    const email: string = req.body.email;
    const role: string | undefined = req.body.role;

    const newUser = new User({username: name, email,role, passwordHash, bugs: []});
    
    try{
        const addedUser = await newUser.save();
        res.json(addedUser);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
    
        
    
});
router.get('/:id', (req,res) => {
        User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: ' + e));
        
});

router.delete('/:id', (req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then( () => res.json("User deleted"))
    .catch(e => res.status(400).json('Error: ' + e));
    
});

router.post('/update/role/:id', async (req,res) => {

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed to post a bug
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

    try {
        await User.findByIdAndUpdate(req.params.id, {role: req.body.role})
        res.json("user updated");
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});
     


module.exports = router;