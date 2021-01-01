import express from 'express';
import bcrypt from 'bcrypt';
let User = require('../models/user');
const router = express.Router();

const jwt = require('jsonwebtoken')
const CLIENT_ORIGIN = "http://localhost:3000/"

import {emailSender} from '../utility/emailSender';

const getTokenFrom = req => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7);
    }
    return null;
  }

router.get('/', async (_req, res) => {
    
    try {
        const users = await User.find().populate('bugs', { title: 1, description: 1 })
        .populate('projects', { title: 1, description: 1});
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
    const username: string = req.body.username;
    const email: string = req.body.email;
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const company: string = req.body.firstName;
    const about: string = req.body.about;
    let role: string= "N/A"
    if(req.body.role) {
        role = req.body.role;
    }

    const newUser = new User({username, email,role, passwordHash, bugs: [], project: [], firstName, lastName, company, about});

    let addedUser;
    try{
        addedUser = await newUser.save();
        
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }

    // Send account confirmation email

    // Make secret from id
    const confirmationConten = {
        id: addedUser.id,
      };
    console.log(confirmationConten);
    const secret = jwt.sign(confirmationConten, process.env.SECRET)

    const emailObject = {
        subject: 'BugTracker Confirm Email',
        html: `
          <a href='${CLIENT_ORIGIN}confirmation/${secret}'>
            click to confirm email
          </a>
        `,      
        text: `Copy and paste this link: ${CLIENT_ORIGIN}confirmation/${secret}`
      }
    emailSender(email, emailObject);

    res.json(addedUser);
    
        
    
});
router.get('/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }      
});

router.delete('/:id', async (req,res) => {

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    try{
        const deleted = await User.findByIdAndDelete(req.params.id);
        res.json(deleted);
    } catch(e) {
        res.status(400).json('Error: ' + e);
    }      
});

router.post('/update/role/:id', async (req,res) => {

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

    try {
        let updated = await User.findByIdAndUpdate(req.params.id, {role: req.body.role})
        // response doesn't have updated role xd
        updated.role = req.body.role;
        res.json(updated);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

router.post('/update', async (req,res) => {

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    // Users token needed 
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
      let updateObject: any = {};
      if(req.body.passwordHash) {
        const saltRounds: number = 10;
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        updateObject.password = passwordHash;
      }
      if(req.body.username) {
          updateObject.username = req.body.username;
      }
      if(req.body.email) {
          updateObject.email = req.body.email;
      }
      if(req.body.firstName) {
        updateObject.firstName = req.body.firstName;
      }
      if(req.body.lastName) {
        updateObject.lastName = req.body.lastName;
      }
      if(req.body.company) {
        updateObject.company= req.body.company;
      }
      if(req.body.about) {
        updateObject.about = req.body.about;
      }
    try {
        await User.findByIdAndUpdate(decodedToken.id, updateObject)
        // response doesn't have updated role xd
        let updated = await User.findById(decodedToken.id);
        res.json(updated);
    } catch(e) {
        console.log(e);
        res.status(400).json('Error: ' + e);
    }
        
});

router.post('/confirm/:id', async (req,res) => {
    // real id is coded with jwt
    const token = req.params.id;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET)

    console.log(decodedToken);
    const id = decodedToken.id;
    try {
        const user = await User.findById(id)

        if (user && !user.confirmed) {
            await User.findByIdAndUpdate(id, { confirmed: true })
              res.json('Email confirmed');
          } else {
              res.json('Email already confirmed');
          }
    }catch(e) {
        res.status(404).json('Please submit valid id');
    }

        
});
     


module.exports = router;