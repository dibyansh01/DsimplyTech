const express = require('express');
const mongoose = require('mongoose');
const { User, Course, Admin} = require('../db');
const jwt = require('jsonwebtoken')
const {SECRET} = require('../middleware/auth')
const { authenticateJwt } = require('../middleware/auth')
const { z } = require('zod');
const usernameSchema = z.string().min(3).max(50);
const passwordSchema = z.string().min(6).max(50);


const router = express.Router();

router.get('/me', authenticateJwt, async (req, res)=>{
    const admin = await Admin.findOne({username: req.user.username});
    if (!admin){
      res.json({message: "Admin does not exist"})
    }
    res.json({
        username: admin.username
    })
})

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data using Zod
    usernameSchema.parse(username);
    passwordSchema.parse(password);

    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  } catch (error) {
    // Zod validation error
    res.status(400).json({ message: 'Invalid input data', errors: error.errors });
  }
});

// router.post('/signup', (req, res) => {
//     const { username, password } = req.body;
//     function callback(admin) {
//       if (admin) {
//         res.status(403).json({ message: 'Admin already exists' });
//       } else {
//         const obj = { username: username, password: password };
//         const newAdmin = new Admin(obj);
//         newAdmin.save();
//         const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//         res.json({ message: 'Admin created successfully', token });
//       }
  
//     }
//     Admin.findOne({ username }).then(callback);
//   });
 
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


module.exports = router 

