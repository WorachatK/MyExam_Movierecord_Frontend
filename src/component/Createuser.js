import React, { useState,useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Authen from './Authen';


export default function Createuser() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    //check rank + block customer

    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.rank === 'MANAGER' || currentUser.rank === 'TEAMLEADER' || currentUser.rank === 'FLOORSTAFF'){
                    console.log('Staff Here');
                }else{
                    alert('Staff Only')
                    window.location.href = '/'
                }
            }catch(error){
                alert(error)
                window.location.href = '/'
            }
        }else if(currentUser === false){
            alert('Staff Only')
            window.location.href = '/'
        }
    },[currentUser])


    // CreteUser 
    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        console.log('testtttt');

        var raw = JSON.stringify({
        "fname": fname,
        "lname": lname,
        "username": username,
        "password": password,
        "email": email,
        "avatar": avatar
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://movierecords.herokuapp.com/api/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message'])
            if(result['status']==='ok'){
                window.location.href = '/users'
            }
        })
        .catch(error => alert('error', error['message']));

        console.log('test');
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' ,p: 2 ,borderRadius: 5}}>
            <Typography variant='h6' gutterBottom>
                Create Users
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <TextField id="fname" label="First Name" variant="filled" fullWidth required
                        onChange={(e) => setFname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="lname" label="Last Name" variant="filled" fullWidth required
                        onChange={(e) => setLname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="username" label="Username" variant="filled" fullWidth required
                        onChange={(e) => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="email" type="email" label="Email" variant="filled" fullWidth required
                        onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" label="Password" variant="filled" type="password" fullWidth required
                        onChange={(e) => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="avatar" label="Avatar" variant="filled" fullWidth 
                        onChange={(e) => setAvatar(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Create User</Button>
                    </Grid>
                </Grid>

            </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
