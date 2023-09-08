import express from 'express';
import mongoose from 'mongoose';
import { User, Course, Admin} from '../db';
import jwt from 'jsonwebtoken';
import {SECRET} from '../middleware/auth';
import { authenticateJwt } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticateJwt, async (req, res)=>{
    const user: any = req.headers["user"]
    const admin:any = await Admin.findOne({username: user.username});
    if (!admin){
      res.json({message: "Admin does not exist"})
    }
    res.json({
        username: admin.username
    })
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    function callback(admin: any) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
 
router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
    } else {
    res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });
  
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
if (course) {
    res.json({ message: 'Course updated successfully' });
} else {
    res.status(404).json({ message: 'Course not found' });
}
});

router.get('/courses', authenticateJwt, async (req, res) => {
const courses = await Course.find({});
res.json({ courses });
});

router.get('/course/:courseId', authenticateJwt, async (req, res)=>{
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course })
})
router.delete('/course/:courseId', authenticateJwt, async (req, res)=>{
  const courseId = req.params.courseId;
  try {
    // Find and delete the course with the given _id
    const deletedCourse = await Course.findByIdAndRemove(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If the course was successfully deleted, retrieve the remaining courses
    const remainingCourses = await Course.find({});

    // You can customize the response format according to your needs
    return res.status(200).json({ message: 'Course deleted', remainingCourses });
  } catch (error) {
    // Handle any errors that occur during the process
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router
// module.exports = router   this way is used in javascript

