import React, { useState,useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Authen from './Authen';


export default function Createmovie() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    //check rank + block customer

    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.rank === 'MANAGER' || currentUser.rank === 'TEAMLEADER' || currentUser.rank === 'FLOORSTAFF'){
                    console.log('MANAGER Here');
                }
            }catch(error){
                alert(error)
                window.location.href = '/'
            }
        }else if(currentUser === false){
            alert('Staff only')
            window.location.href = '/'
        }
    },[currentUser])


    // Crete Movie 
    const [mname,setMname] = useState('')
    const [released,setReleased] = useState('')
    const [photo,setPhoto] = useState('')
    const [vdo,setVdo] = useState('')
    const [text,setText] = useState('')
    const [rating,setRating] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "moviename": mname,
        "released": released,
        "rating": rating,
        "photo": photo,
        "vdo": vdo,
        "text": text
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://movierecords.herokuapp.com/movies", requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result['message'])
            if(result['status']==='ok'){
                window.location.href = '/movies'
            }
        })
        .catch(error => alert('error', error['message']));
    }

    const handleChange = (event) => {
        setRating(event.target.value);
    };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 5 }}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' ,p: 2 ,borderRadius: 5}}>
            <Typography variant='h6' gutterBottom>
                Create Movie Record
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{}}>
                    <Grid item xs={12}>
                        <TextField id="moviename" label="Movie Name" variant="filled" fullWidth required
                        onChange={(e) => setMname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="released" type="date" label="Released" variant="filled" fullWidth required
                        onChange={(e) => setReleased(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="poster" label="Poster URL" variant="filled" fullWidth
                        onChange={(e) => setPhoto(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="vdo" label="VDO Link" variant="filled" fullWidth 
                        onChange={(e) => setVdo(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="text" label="About Movie" fullWidth 
                        onChange={(e) => setText(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel required id="demo-simple-select-standard-label">Rating</InputLabel>
                        <Select
                            label="Select"
                            value={rating}
                            onChange={handleChange}
                            helperText="Please select your currency"
                            variant="filled"
                            
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="G">G</MenuItem>
                            <MenuItem value="PG">PG</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="MA">MA</MenuItem>
                            <MenuItem value="R">R</MenuItem>
                        </Select>
                    </FormControl>
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
