import React, { useState,useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Authen from './Authen';


export default function Login() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    useEffect(()=>{
        if(currentUser){
            alert('Yoe are loged in')
            window.location.href = '/'
        }else{
            console.log('Loading');
        }
    },[currentUser])

    // Login 

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "password": password,
        "email": email,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://movierecords.herokuapp.com/api/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result['accessToken']){
                alert(result['message'])
                localStorage.setItem('token',result.accessToken) 
                window.location ='/'
            }else{
                alert('Please check your username and password')
            }
        })
        .catch(error => alert('error', error['message']));
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' ,p: 2 ,borderRadius: 5}}>
            <Typography variant='h6' gutterBottom>
                Login
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <TextField id="email" label="Email" variant="filled" fullWidth required
                        onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" label="Password" variant="filled" type="password" fullWidth required
                        onChange={(e) => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Login</Button>
                    </Grid>
                </Grid>
            </form>
            <Typography variant='h7' gutterBottom>
                ForStaff-ID Email: staff@email.com ,Password:123456
            </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}
