import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import {useNavigate} from "react-router-dom";


function Usercourses() {
    const [purchasedCourses, setpurchasedCourses] = useState([]);
    const red = '#d80000';
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/user/purchasedCourses', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = await response.json();
            console.log(data);
            setpurchasedCourses(data.purchasedCourses);
        }
        fetchData();
    }, []);

  if (purchasedCourses.length === 0){
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
      <h3>You are not enrolled in any courses. What are you waiting for? Go and enroll yourself.</h3>
      </div>
  } else {
    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {purchasedCourses.map(course => {
            return <Course course={course} />}
        )}
    </div>
    function Course(props) {
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
        <Typography variant="subtitle1" align="center" color={red} gutterBottom>
          Price: {props.course.price} ₹
        </Typography>
        <div style={{ height: 150, overflow: 'hidden', borderRadius: 8, marginTop: 20 }}>
          <img
            src={props.course.imageLink}
            alt={props.course.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <Button variant="contained" size="large" onClick={() => { alert("Course material will be available soon.") }}>
        Go to Course
      </Button>
    </div>
    </Card>
      }
  } 
}

export default Usercourses;