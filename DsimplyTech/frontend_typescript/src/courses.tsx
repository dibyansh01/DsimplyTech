import { Button, Card, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import axios from "axios";
import { roleState } from "./store/atoms/role.js";
import {useNavigate} from "react-router-dom";
import { isUserLoading } from "./store/selectors/isUserLoading.ts";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "./store/atoms/user.ts";
import { userEmailState } from "./store/selectors/userEmail.ts"

function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const Role = useRecoilValue(roleState);

    if(userEmail && Role.role === 'admin') {
      useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/admin/courses', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            console.log(Role.role)
            setCourses(data.courses);
        }
        fetchData();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
    

 function Course(props: any) {
    const navigate = useNavigate()

    return <Card
    style={{
      margin: 10,
      width: 300,
      minHeight: 300, // Set a minimum height for the card
      padding: 20,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column', // Make the card's content stack in a column
      justifyContent: 'space-between', // Align content vertically, buttons will be at the bottom
    }}
  >
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        {props.course.title}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {props.course.description}
      </Typography>
      <div style={{ height: 150, overflow: 'hidden', borderRadius: 8, marginTop: 20 }}>
        <img
          src={props.course.imageLink}
          alt={props.course.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <Button variant="contained" size="large" onClick={() => { navigate("/course/" + props.course._id); }}>
          Edit
        </Button>
        <Button variant="contained" size="large" onClick={async () => {
                    try {
                      const response = await fetch("http://localhost:3000/admin/course/" + props.course._id, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                       
                    })
                    const data = await response.json();
                    const remainingCourses = data.remainingCourses
                    console.log(remainingCourses)
                    setCourses(remainingCourses)
                    alert("Course deleted successfully!")
                } catch(error){
                  console.log(error);
                }}}>
          Delete
        </Button>
      </div>
  </Card>
    }
  }

    if (userEmail && Role.role === 'user'){
      useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/user/courses', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            console.log(Role.role)
            setCourses(data.courses);
        }
        fetchData();
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
    

 function Course(props: any) {
    const navigate = useNavigate()

    return <Card
    style={{
      margin: 10,
      width: 300,
      height: 'auto', // Changed Height to 'auto' to adjust to the content
      padding: 20,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column', // Make the card's content stack in a column
      justifyContent: 'space-between', // Align content vertically, buttons will be at the bottom
    }}
  >
    <Typography variant="h5" align="center" gutterBottom>
      {props.course.title}
    </Typography>
    <Typography variant="subtitle1" align="center" gutterBottom>
      {props.course.description}
    </Typography>
    <div style={{ height: 150, overflow: 'hidden', borderRadius: 8, marginTop: 20 }}>
      <img
        src={props.course.imageLink}
        alt={props.course.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Use 'objectFit' to ensure the image fits inside the container
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <Button variant="contained" size="large" onClick={async () => {
                    try {
                      const response = await fetch("http://localhost:3000/user/courses/" + props.course._id, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                       
                    })
                    const data = await response.json();
                    alert(data.message)
                } catch(error){
                  console.log(error);
                }}}>
        Enrolll
      </Button>
    </div>
  </Card>
    }
  }
}



export default Courses;