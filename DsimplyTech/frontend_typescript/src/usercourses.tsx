import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { roleState } from "./store/atoms/role.js";
import {useNavigate} from "react-router-dom";
import { isUserLoading } from "./store/selectors/isUserLoading.ts";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "./store/atoms/user.ts";
import { userEmailState } from "./store/selectors/userEmail.js"

function Usercourses() {
    const [purchasedCourses, setpurchasedCourses] = useState([]);
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const Role = useRecoilValue(roleState);

    
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
      <h3>You are not enrollled in any course. What are you waiting for... Go and enroll yourself...</h3>
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
      <Button variant="contained" size="large" onClick={() => {  }}>
        Go to Course
      </Button>
    </div>
  </Card>
    }

  }
    
   
    }
export default Usercourses;