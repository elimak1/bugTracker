const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const CLIENT_ORIGIN = "http://localhost:3000/"

import {emailSender} from '../utility/emailSender';

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username})
})

loginRouter.post('/passwordChange', async (req, res) => {
  const email = req.body.email
  let user;
    try {
        user = await User.findOne({"email": email})
    } catch(e) {
        return res.status(401).json({ error: 'user not found' })
    }
  if (!user) {
    return res.status(400).json({error: "email not valid"});
  }

  const emailToken = {
    email: email,
  };
const secret = jwt.sign(emailToken, process.env.SECRET);

const emailObject = {
  subject: 'BugTracker change password',
  html: `
    <a href='${CLIENT_ORIGIN}password/${secret}'>
      click to change password
    </a>
  `,      
  text: `Copy and paste this link: ${CLIENT_ORIGIN}password/${secret}`
}
emailSender(email, emailObject);
res.status(200).json('Email sent');
})

loginRouter.post('/setPassword', async (req,res) => {
  // real email is coded with jwt
  const token = req.body.token;
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const email = decodedToken.email;
  try {
    if(req.body.password.length < 6) {
      res.status(400).json('Password too short');
      return;
  }
    const saltRounds: number = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    await User.findOneAndUpdate({"email": email},{ passwordHash: passwordHash })
    res.status(200).json('Password changed');
  }catch(e) {
      res.status(404).json('User not found');
  }

      
});

module.exports = loginRouter

