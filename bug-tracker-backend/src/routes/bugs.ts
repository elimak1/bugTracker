import express from 'express';
let Bug = require('../models/bug');
const router = express.Router();

router.get('/', (_req, res) => {
    
    Bug.find()
    .then(bugs => res.json(bugs))
    .catch(e => res.status(400).json('Error: ' + e));
});

router.post('/', (req,res) => {
    
    const title: string = req.body.title;
    const description: string = req.body.description;
    const newBug = new Bug({title,description});
    
    newBug.save()
        .then(() => res.json('Bug added'))
        .catch(e => res.status(400).json('Error: ' + e));
        
});

module.exports = router;