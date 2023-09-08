import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import {useState} from 'react'; 


function AddCourse(){
    const[title, setTitle] = useState("") 
    const[description, setDescription] = useState("") 
    const[image, setImage] = useState("") 
    const[price, setPrice] = useState("")
    return <div
        style={{
        display: 'flex',
        justifyContent: 'center'}}
        >
        <Card variant="outlined" style={{width: 800, padding: 20, marginTop: 200}}>
            <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth={true} 
                        label="Title" 
                        variant="outlined" 
                        />
            <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth={true} 
                        label="Description" 
                        variant="outlined" 
                        />
             <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e) => setImage(e.target.value)}
                        fullWidth={true} 
                        label="Image link" 
                        variant="outlined" 
                        />
             <TextField 
                        style={{marginBottom: 10}}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth={true} 
                        label="Price" 
                        variant="outlined" 
                        />



            <Button 
                        size='large' 
                        variant="contained"
                        onClick={async ()=>{
                            const response = await fetch('http://localhost:3000/admin/courses', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                },
                                body:JSON.stringify({
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    published: true,
                                    price
                                })
                            })
                            const data = await response.json();
                            console.log(data)
                            alert("Course added!")
                        }}
                        
                        >Create Course</Button>
            </Card>
    </div>
}

export default AddCourse