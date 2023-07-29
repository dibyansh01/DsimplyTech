const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter)
app.use('/user', userRouter)

//connect to mongoDB
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "CourseApp" });


app.listen(3000, () => console.log('Server running on port 3000'));
