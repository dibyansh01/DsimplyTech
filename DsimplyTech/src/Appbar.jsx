import {Typography, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { isUserLoading } from "./store/selectors/isUserLoading";
import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "./store/atoms/user.js";
import { userEmailState } from "./store/selectors/userEmail"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { roleState } from "./store/atoms/role";

function MyAppBar() {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const Role = useRecoilValue(roleState);
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    if (userLoading) {
        return <></>
    }
    if(userEmail && Role.role === 'admin'){
        return (
          <Grid container>
            <Grid item lg={12} md={12} sm={12}>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleDrawerOpen} // Open the drawer when the hamburger icon is clicked
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  DsimplyTech
                  </Typography>
                  <Button  variant={"contained"} style={{marginRight: 5}}
                      onClick={() => {
                        navigate("/addcourse")
                        }}>Add Course</Button>
                      <Button variant={"contained"} style={{marginRight: 5}} 
                      onClick={() => {
                        navigate("/courses")
                       }}>courses</Button>

                      <Button variant={"contained"} style={{marginRight: 5}} 
                      onClick={() => {
                        localStorage.setItem("token", null);
                        setUser({
                            isLoading: false,
                            userEmail: null
                        })
                        navigate('/')
                       }}>logout</Button>
                </Toolbar>
              </AppBar>
              <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                        <List>
                           <ListItem button onClick={() => {
                              navigate("/")
                            }}>
                              <ListItemText primary="Home" />
                           </ListItem>
                           <ListItem button onClick={() => {
                              navigate("/aboutme")}}>
                               <ListItemText primary="About" />
                           </ListItem>
                           {/* <ListItem button>
                               <ListItemText primary="Contact" />
                           </ListItem> */}
                       </List>
                  </Drawer>
            </Box>
            </Grid>
          </Grid>
          );
        } 

    if(userEmail && Role.role === 'user'){
      return (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleDrawerOpen} // Open the drawer when the hamburger icon is clicked
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                DsimplyTech
                </Typography>
                <span  variant={"contained"} style={{marginRight: 5}}
                    >{userEmail}</span>
                    <Button variant={"contained"} style={{marginRight: 5}} 
                    onClick={() => {
                      navigate("/usercourses")
                    }}>Enrolled Courses</Button>

                    <Button variant={"contained"} style={{marginRight: 5}} 
                    onClick={() => {
                      localStorage.setItem("token", null);
                      setUser({
                          isLoading: false,
                          userEmail: null
                      })
                      navigate('/')
                    }}>logout</Button>
              </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                      <List>
                        <ListItem button onClick={() => {
                            navigate("/")
                          }}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => {
                              navigate("/aboutme")}}>
                            <ListItemText primary="About" />
                        </ListItem>
                        {/* <ListItem button>
                            <ListItemText primary="Contact" />
                        </ListItem> */}
                    </List>
                </Drawer>
          </Box>
        );
      } 
        
      if (!userEmail){
            return (
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerOpen} // Open the drawer when the hamburger icon is clicked
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      DsimplyTech
                      </Typography>
                      <Button  variant={"contained"} style={{marginRight: 5}}
                      onClick={() => {
                            navigate("/signup")
                        }}>signup</Button>
                      <Button variant={"contained"} style={{marginRight: 5}} 
                      onClick={() => {
                        navigate("/signin")
                       }}>signin</Button>
                     
                    </Toolbar>
                  </AppBar>
                  <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                        <List>
                           <ListItem button onClick={() => {
                              navigate("/")
                            }}>
                              <ListItemText primary="Home" />
                           </ListItem>
                           <ListItem button onClick={() => {
                              navigate("/aboutme")}}>
                               <ListItemText primary="About" />
                           </ListItem>
                           {/* <ListItem button>
                               <ListItemText primary="Contact" />
                           </ListItem> */}
                       </List>
                  </Drawer>
                </Box> 
              );
            }
}
      
       
      

export default MyAppBar;


