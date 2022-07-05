import React, { useEffect, useState }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Authen from './Authen';


export default function Editeuseradmin() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    //check rank + block customer

    const [checkRank,setCheckRank] = useState(null)      
    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.rank === 'MANAGER'){
                    console.log('Staff Here');
                    setCheckRank(true)
                    console.log(checkRank);
                }else{
                    alert('MANAGER only')
                    window.location.href = '/'
                    setCheckRank(false)
            }}catch(error){
                alert(error)
                window.location.href = '/'
            }
        }else if(currentUser === false){
            alert('MANAGER only')
            window.location.href = '/'
        }
    },[currentUser,checkRank])

    // getdata from id 

    const { id } = useParams();

    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://movierecords.herokuapp.com/api/users/"+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result['status']==='ok'){
                setFname(result['user']['fname'])
                setLname(result['user']['lname'])
                setUsername(result['user']['username'])
                setEmail(result['user']['email'])
                setAvatar(result['user']['avatar'])
                setRank(result['user']['rank'])
            }
        })
        .catch(error => alert(error['message']));
    },[id])

    // end get data 

    // submit edit func 

    const [fname,setFname] = useState('')
    const [lname,setLname] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [rank,setRank] = useState('')

    const handleChange = (event) => {
        setRank(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fname": fname,
            "lname": lname,
            "username": username,
            "email": email,
            "avatar": avatar,
            "rank":rank,
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://movierecords.herokuapp.com/api/users/"+id, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result['status']==='ok'){
                alert(result['message'])
                window.location.href = '/users'
            }
        })
        .catch(error => alert(error['message']));
    }

    // end submit func
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' ,p: 2 ,borderRadius: 5}}>
            <Typography variant='h6' gutterBottom>
                Edit Users
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <TextField id="fname" label="First Name" variant="filled" fullWidth required
                        value={fname} onChange={(e) => setFname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="lname" label="Last Name" variant="filled" fullWidth required
                        value={lname} onChange={(e) => setLname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="username" label="Username" variant="filled" fullWidth required
                        value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="email" label="Email" disabled={true} variant="filled" fullWidth required
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="avatar" label="Avatar" variant="filled" fullWidth
                        value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Rank</InputLabel>
                        <Select
                            label="Select"
                            value={rank}
                            onChange={handleChange}
                            helperText="Please select your currency"
                            variant="filled"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="MANAGER">MANAGER</MenuItem>
                            <MenuItem value="TEAMLEADER">TEAMLEADER</MenuItem>
                            <MenuItem value="FLOORSTAFF">FLOORSTAFF</MenuItem>
                            <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                        </Select>
                    </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>Update User</Button>
                    </Grid>
                </Grid>

            </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
