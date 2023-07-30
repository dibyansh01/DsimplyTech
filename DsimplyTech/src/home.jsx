import React from 'react';
import {Typography, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";
import { useRecoilValue} from "recoil";
import { userEmailState } from "./store/selectors/userEmail"
import { roleState } from './store/atoms/role';

const HomePage = () => {
    const backgroundImageUrl = 'https://cdn.pixabay.com/photo/2021/02/01/06/48/geometric-5969508_1280.png';
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const white = '#fefdff'
    const Role = useRecoilValue(roleState);
   
  if (userEmail && Role.role === 'admin'){
    console.log(Role.role)
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height:'720px',
          marginTop: '0',
          width: '100%'
          
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: '2rem' }} color={white}>
          Welcome to DsimplyTech
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '4rem' }} color={white}>
          Unlock Your Potential with Our Premium Online Courses
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => {
                                  navigate("/courses")
                              }}>
          Browse Courses
        </Button>
      </div>
    );
  } 
  
  if (userEmail && Role.role === 'user'){
    console.log(Role.role)
    return (
      
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height:'720px',
          marginTop: '0',
          width: '100%'
          
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: '2rem' }} color={white}>
          Welcome to DsimplyTech
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '4rem' }} color={white}>
          Unlock Your Potential with Our Premium Online Courses
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => {
                                  navigate("/courses")
                              }}>
          Browse Courses
        </Button>
      </div>
    );
  } 

  if (!userEmail){
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height:'720px',
          marginTop: '0',
          width: '100%'
          
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: '2rem' }} color={white}>
          Welcome to DsimplyTech
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '4rem' }} color={white}>
          Unlock Your Potential with Our Premium Online Courses
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={() => {
                                  navigate("/signup")
                              }}>
          Browse Courses
        </Button>
      </div>
    );
  }
};

export default HomePage;