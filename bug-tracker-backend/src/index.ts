import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const port = process.env.PORT|| 3001;
app.use(cors());
app.use(express.json());
app.use(express.static('build'))

const URI = process.env.MONGO_URI
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB server");
})

const usersRouter = require('./routes/users');
const bugsRouter = require('./routes/bugs');
const loginRouter = require('./routes/login');
const projectRouter = require('./routes/projects');
app.use('/api/users', usersRouter);
app.use('/api/bugs', bugsRouter);
app.use('/api/login', loginRouter);
app.use('/api/projects', projectRouter);


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () =>  {

  return console.log(`server is listening on ${port}`);
});