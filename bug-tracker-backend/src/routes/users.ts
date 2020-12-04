import express from 'express';
import { userInfo } from 'os';
let User = require('../models/user');
const router = express.Router();

router.get('/', (_req, res) => {
    
  User.find()
    .then(users => res.json(users))
    .catch(e => res.status(400).json('Error: ' + e));
});

router.post('/', (req,res) => {
    
    const name: string = req.body.name;
    const newUser = new User({username: name});
    
    newUser.save()
        .then(() => res.json('User added'))
        .catch(e => res.status(400).json('Error: ' + e));
        
    
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