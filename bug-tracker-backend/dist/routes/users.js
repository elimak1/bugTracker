"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let User = require('../models/user');
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: ' + e));
});
router.post('/', (req, res) => {
    const name = req.body.name;
    const newUser = new User({ name });
    newUser.save()
        .then(() => res.json('User added'))
        .catch(e => res.status(400).json('Error: ' + e));
});
/*
router.get('/:id', (req,res) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        if (!patient) {
            throw new Error('Cant find patient');
        }
        patient.entries.forEach( ent => {
            if(!ent.type || typeof ent.type !== 'string') {
                throw new Error('Entries are corrupted');
        }});
        
        res.json(patient);
    } catch (e) {
        if(e instanceof Error) {
            res.status(404).send(e.message);
        }
        res.status(404);
        
    }
});

router.post('/:id/entries', (req,res) => {
    try {
        console.log(req.body);
        const entry = toNewEntry(req.body);
        res.json(patientService.addEntry(req.params.id, entry));
    } catch (e) {
        if(e instanceof Error) {
            res.status(400).send(e.message);
        }
        res.status(400);
        
    }
});
*/
module.exports = router;
//# sourceMappingURL=users.js.map