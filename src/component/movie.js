import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { ButtonGroup, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Authen from './Authen';


function MoviesContainer() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    //check rank + block customer

    const [checkRank,setCheckRank] = useState(null)      
    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.rank === 'MANAGER'){
                    console.log('Manager Here');
                    setCheckRank(true)
                }else if(currentUser.rank === 'TEAMLEADER' || currentUser.rank === 'FLOORSTAFF'){
                    console.log('staff Here');
                    setCheckRank(false)
                }else{
                    alert('Staff only')
                    window.location.href = '/'
                    setCheckRank(false)
            }}catch(error){
                alert(error)
                window.location.href = '/'
            }
        }else if(currentUser === false){
            alert('Staff only')
            window.location.href = '/'
        }
    },[currentUser])


    // GetData

    const [items,setItems] = useState([]);

    useEffect(()=>{
        UserGet()
    },[])

    const UserGet = () =>{
        fetch("https://movierecords.herokuapp.com/movies")
        .then(res=>res.json())
        .then((result)=>{
            setItems(result['movie'])
        })
    }

    // Endgetdata

    // Update user func  

    const editMovie = (id)=>{
        window.location.href = 'editmovie/'+id
    }

    //End Update user func  

    // Delete Function

    const deleteMovie = (id)=>{
        var getconfirm = window.confirm("Delete this movie");
        if (getconfirm === true){
            if(checkRank){
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
    
                var raw = JSON.stringify({
                "id": id
                });
    
                var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
    
                fetch("https://movierecords.herokuapp.com/movies/"+id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    alert(result['message'])
                    if(result['status']==='ok'){
                        UserGet()
                    }
                })
                .catch(error => alert(error['message']));
            }else{
                alert("Only Manager can delete")
            }
        }
    }

    // End delete function 

  return (
    <React.Fragment >
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:5}} >
      {currentUser 
            ? (
                <Box sx={{ bgcolor: '#424242', height: 'auto',p:3}} >
                {/* HeadBox */}
                <Box sx={{display:'flex'}}>
                    <Box sx={{ flexGrow:1}}>
                        <Typography variant='h6' gutterBottom>
                            Movies Data
                        </Typography>
                    </Box>
                    <Box>
                        <Link href='createmovie'>
                        <Button variant="contained">Create Movies</Button>
                        </Link>
                    </Box>
                </Box>

                {/* EndHeadBox */}

                {/* Table */}

                <TableContainer component={Paper} sx={{marginTop:3}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Poster</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Released</TableCell>
                            <TableCell align="center">rating</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                        </TableHead>

                        {/* ShowData */}

                        <TableBody>
                        {items.map((row) => (
                            <TableRow key={row.moviename} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                <Box display="flex" justifyContent="center">
                                        <Avatar alt={row.photo} src={row.photo}/>
                                </Box>
                                </TableCell>
                                <TableCell align="left">{row.moviename}</TableCell>
                                <TableCell align="left">{row.released}</TableCell>
                                <TableCell align="center">{row.rating}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button onClick={()=> editMovie(row._id)}>Edit</Button>
                                        <Button onClick={()=> deleteMovie(row._id)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>

                        {/* EndShowDat */}
                    </Table>
                </TableContainer>

                {/* endTable */}

            </Box>
            ):(
                <h1>Loading</h1>
            )}

        
      </Container>
    </React.Fragment>
  );
}

export default MoviesContainer;
