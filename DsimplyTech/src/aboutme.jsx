import Button from '@mui/material/Button';
import {Box, Card, Grid, Typography, Container, CardMedia} from '@mui/material';
import {useNavigate} from "react-router-dom";
import { useRecoilValue} from "recoil";
import { userEmailState } from "./store/selectors/userEmail"

function About() {
    const userEmail = useRecoilValue(userEmailState);
    const navigate = useNavigate();
    if (userEmail){
        return (
            <Container maxWidth="md" sx={{ mt: 5 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" component="h1">
                  Welcome to DsimplyTech
                </Typography>
                <Typography variant="body1" paragraph>
                  Hi, I'm Dibyanshu, and I'm excited to have you here on DsimplyTech. This is your go-to place for high-quality technical and programming courses.
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you're a beginner or an experienced developer, I have a wide range of courses that cater to different skill levels and interests. Take your skills to the next level with my well-crafted courses.
                </Typography>
                <Typography variant="body1" paragraph>
                  Start your learning journey today! Check out my available courses and enroll now.
                </Typography>
                <Button variant="contained" color="primary" size="large"onClick={()=>{
                    navigate('/courses')
                }}>
                  Explore Courses
                </Button>
              </Box>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4}>
                   <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 1
                   </Typography>
                   <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://www.analyticsinsight.net/wp-content/uploads/2022/03/Python-Remains-at-the-Top-Despite-the-Intro-of-New-Coding-Langs.jpg"
                      alt="Course 1"
                    />
                   </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 2
                  </Typography>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://cdn.canadianmetalworking.com/a/robotic-automation-trends-1653060774.jpg?size=1000x"
                      alt="Course 2"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 3
                  </Typography>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://developerguru.in/images/courses/mern_stack.gif"
                      alt="Course 3"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Container>
          );
    } else{
        return (
            <Container maxWidth="md" sx={{ mt: 5 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" component="h1">
                  Welcome to DsimplyTech
                </Typography>
                <Typography variant="body1" paragraph>
                  Hi, I'm Dibyanshu, and I'm excited to have you here on DsimplyTech. This is your go-to place for high-quality technical and programming courses.
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you're a beginner or an experienced developer, I have a wide range of courses that cater to different skill levels and interests. Take your skills to the next level with my well-crafted courses.
                </Typography>
                <Typography variant="body1" paragraph>
                  Start your learning journey today! Check out my available courses and enroll now.
                </Typography>
                <Button variant="contained" color="primary" size="large" onClick={()=>{
                   navigate('/signup')
                }}>
                  Explore Courses
                </Button>
              </Box>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 1
                  </Typography>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://www.analyticsinsight.net/wp-content/uploads/2022/03/Python-Remains-at-the-Top-Despite-the-Intro-of-New-Coding-Langs.jpg"
                      alt="Course 1"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 2
                  </Typography>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://cdn.canadianmetalworking.com/a/robotic-automation-trends-1653060774.jpg?size=1000x"
                      alt="Course 2"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Course Sample 3
                  </Typography>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://developerguru.in/images/courses/mern_stack.gif"
                      alt="Course 3"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Container>
          );
    } 
};





export default About
