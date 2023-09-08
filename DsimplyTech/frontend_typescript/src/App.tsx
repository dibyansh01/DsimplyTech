import MyAppBar from "./Appbar.tsx";
import Signin from "./signin.tsx";
import Signup from "./signup.tsx";
import AddCourse from "./addcourse.tsx";
import Courses from "./courses.tsx";
import Course from "./course.js";
import Usercourses from "./usercourses.tsx";
import StickyFooter from "./footer.tsx"
import HomePage from "./home.tsx"
import { userState } from "./store/atoms/user.ts";
import { roleState } from "./store/atoms/role.ts";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    RecoilRoot,
    useSetRecoilState,
    useRecoilValue
  } from 'recoil';
import axios from "axios";
import {useEffect} from "react";



function App() {
    return (
        <RecoilRoot>
            <div style={{width:'100vw', height: '100%', backgroundColor:'#b3e5ec'}}>
                {/* here RecoilRoot is for the state management  */}
                
                
                    <Router>
                
                    <MyAppBar/>
                    <InitUser />
                        <Routes>
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path= "/addcourse" element={<AddCourse />} />
                            <Route path= "/courses" element={<Courses />} />
                            <Route path= "/course/:courseId" element={<Course />} />
                            <Route path = "/usercourses" element={<Usercourses />} />
                            <Route path= "/" element = {<HomePage />} />

                        </Routes>
                        <StickyFooter/>
                    </Router>
            
            </div>
        </RecoilRoot>
    );
}

function InitUser() {
    const setUser = useSetRecoilState(userState);
    const Role = useRecoilValue(roleState);
    const init = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/${Role.role}/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}

export default App