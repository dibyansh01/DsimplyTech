import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card, Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "./store/atoms/user.js";
import { roleState } from './store/atoms/role.js';


function Signin(){
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);
    const saveRole = useSetRecoilState(roleState);
    
    return <div>
        {role}
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'center'}}>
                < Typography variant = {"h6"}>
                Welcome back. Sign in below
                </Typography>
            </div>
        
        <div style={{
                display: 'flex',
                justifyContent: 'center'}}>
            <Card variant="outlined" style={{width: 400, padding: 20}}>
            <form>
            <TextField
                    onChange={(event) => {
                        let elemt = event.target;
                        setEmail(elemt.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                    type ={"email"}
                    required
                />
                <br /> <br />
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    required
                />
                <br /> <br />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        label="Role"
                        onChange={(e) => {
                            setRole(e.target.value)
                        }}
                    >
                        <MenuItem value = 'admin'>Admin</MenuItem>
                        <MenuItem value = 'user'>User</MenuItem>
                    </Select>
                </FormControl>
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        try {
                                const response = await axios.post(`http://localhost:3000/${role}/login`,
                                    {
                                      // username: email,
                                      // password: password,
                                    },
                                    {
                                      headers: {
                                        "Content-type": "application/json",
                                        username: `${email}`,
                                        password: `${password}`,
                                      },
                                    }
                                  );
                            const data = response.data; // Access the response data using response.data
                    
                            localStorage.setItem("token", data.token);
                            setUser({
                                userEmail: email,
                                isLoading: false
                            })
                            saveRole({
                                role: role
                            })
                            //console.log(data);
                            //console.log(role)
                            alert(data.message)
                            navigate('/');
                        } catch (error) {
                            // Handle error if the request fails
                            console.log(error);
                            alert(error)
                        }
                    }}
                > Signin</Button>
            </form>
            </Card>
        </div>
      
    </div>
}
export default Signin