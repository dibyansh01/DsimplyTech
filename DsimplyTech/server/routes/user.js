const express = require('express');
const { User, Course, Admin} = require('../db');
const {SECRET} = require('../middleware/auth')
const { authenticateJwt } = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const { z } = require('zod');
const usernameSchema = z.string().min(3).max(50);
const passwordSchema = z.string().min(6).max(50);

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res)=>{
    const user = await User.findOne({username: req.user.username});
    res.json({
        username: user.username
    })
})

router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate input data using Zod
      usernameSchema.parse(username);
      passwordSchema.parse(password);
  
      const user = await User.findOne({ username });
      if (user) {
        res.status(403).json({ message: 'User already exists' });
      } else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
      }
    } catch (error) {
      // Zod validation error
      res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
  });

router.post('/login', async (req, res) => {
const { username, password } = req.headers;

const user = await User.findOne({ username, password });
if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
} else {
    res.status(403).json({ message: 'Invalid username or password' });
}
});

router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({ courses });
  });

router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
const course = await Course.findById(req.params.courseId);
//console.log(course);
if (course) {
    const user = await User.findOne({ username: req.user.username });
    let iscourse = false;
    if(!user){
        res.status(403).json({message: "user does not exist"})
    }
    if (user.purchasedCourses.includes(req.params.courseId)) {
        return res.status(403).json({ message: 'Course is already purchased' });
      }
    user.purchasedCourses.push(course);
    await user.save();
    res.json({ message: 'Course purchased successfully' });
     
} else {
    res.status(404).json({ message: 'Course not found' });
}
});

router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
} else {
    res.status(403).json({ message: 'User not found' });
}
});


module.exports = router
