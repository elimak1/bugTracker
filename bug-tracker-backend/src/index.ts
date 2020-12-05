import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const port = process.env.PORT|| 3001;
app.use(cors());
app.use(express.json());

const URI = process.env.MONGO_URI
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB server");
})

const usersRouter = require('./routes/users');
const bugsRouter = require('./routes/bugs');
const loginRouter = require('./routes/login');
app.use('/users', usersRouter);
app.use('/bugs', bugsRouter);
app.use('/login', loginRouter);


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () =>  {

  return console.log(`server is listening on ${port}`);
});