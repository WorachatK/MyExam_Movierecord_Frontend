import React, { useEffect, useState }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function Register() {

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [repassword,setRepassword] = useState('')
    const [password,setPassword] = useState('')

    //////////////////////// Check Password ///////////////////////////
    const [checkpassword,setCheckpassword] = useState(true)
    const [alertpassword,setAlertpassword] = useState('')

    useEffect(()=>{
        if(repassword===password && password.trim().length>5){
            setCheckpassword(false);
            setAlertpassword('')
        }else if(repassword!==password){
            setCheckpassword(true);
            setAlertpassword('Passwords do not match');
        }else if(2<password.trim().length<6 && password !== ''){
            setCheckpassword(true);
            setAlertpassword('password should be at least 6 alphanumeric');
        }
    },[password,repassword])

    //submit

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "username": username,
        "password": password,
        "email": email,
        "avatar":"",
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
                window.location.href = '/'
            }
        })
        .catch(error => alert(error['message']));
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' ,p: 2 ,borderRadius: 5}}>
            <Typography variant='h6' gutterBottom>
                Register
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <TextField id="username" label="Username" variant="filled" fullWidth required
                        onChange={(e) => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" type="email" label="Email" variant="filled" fullWidth required
                        onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" label="Password" variant="filled" type="password" fullWidth required
                        onChange={(e) => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="repassword" label="Re-Password" variant="filled" type="password" fullWidth required
                        onChange={(e) => setRepassword(e.target.value)}/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <p style={{color:'#ef5350'}}>{alertpassword}</p>
                        <Button type="submit" disabled={checkpassword} variant="contained" fullWidth>Create User</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
