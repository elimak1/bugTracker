"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let Bug = require('../models/bug');
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    Bug.find()
        .then(bugs => res.json(bugs))
        .catch(e => res.status(400).json('Error: ' + e));
});
router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const newBug = new Bug({ title, description });
    newBug.save()
        .then(() => res.json('User added'))
        .catch(e => res.status(400).json('Error: ' + e));
});
module.exports = router;
//# sourceMappingURL=bugs.js.map