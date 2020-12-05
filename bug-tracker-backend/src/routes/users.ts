import express from 'express';
import bcrypt from 'bcrypt';
let User = require('../models/user');
const router = express.Router();

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
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const name: string = req.body.name;
    const newUser = new User({username: name, passwordHash, bugs: []});
    
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

router.post('/update/:id', (req,res) => {
    
    const name: string = req.body.name;
    const newUser = new User({username: name});
    
    User.findByIdANdUpdate(req.body.id, newUser)
        .then(() => res.json('User added'))
        .catch(e => res.status(400).json('Error: ' + e));
});
     


module.exports = router;