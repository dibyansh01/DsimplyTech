import MyAppBar from "./Appbar.jsx";
import Signin from "./signin.jsx";
import Signup from "./signup.jsx";
import AddCourse from "./addcourse.jsx";
import Courses from "./courses.jsx";
import Course from "./course.jsx";
import Usercourses from "./usercourses.jsx";
import StickyFooter from "./footer.jsx";
import HomePage from "./home.jsx"
import About from "./aboutme.jsx";
import { userState } from "./store/atoms/user.js";
import { roleState } from "./store/atoms/role";
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
                            <Route path= "/aboutme" element = {<About />}/>

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