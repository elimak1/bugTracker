"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
const URI = process.env.MONGO_URI;
mongoose_1.default.connect(URI, { useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB server");
});
const usersRouter = require('./routes/users');
const bugsRouter = require('./routes/bugs');
app.use('/users', usersRouter);
app.use('/bugs', bugsRouter);
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map