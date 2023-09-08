import express from 'express';
import { User, Course, Admin} from '../db';
import {SECRET} from '../middleware/auth';
import { authenticateJwt } from '../middleware/auth';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res)=>{
    const user1: any = req.headers["user"]
    const user: any = await User.findOne({username: user1.username});
    res.json({
        username: user.username
    })
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
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
    const user1: any = req.headers["user"]
    const user: any = await User.findOne({ username: user1.username });
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
const user1: any = req.headers["user"]
const user = await User.findOne({ username: user1.username }).populate('purchasedCourses');
if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
} else {
    res.status(403).json({ message: 'User not found' });
}
});


export default router
// module.exports = router
