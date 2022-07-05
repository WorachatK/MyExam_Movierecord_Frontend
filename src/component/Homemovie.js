import React ,{ useEffect,useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube';


function Homemovie() {

  // GetData from id
  const { id } = useParams();

  const [item,setItems] = useState([]);

  useEffect(()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://movierecords.herokuapp.com/movies/"+id,requestOptions)
    .then(res=>res.json())
    .then((result)=>{
        setItems(result['movie'])
    })
    .catch(error => alert(error['message']));
  },[id])
  
    const opts = {
        height: '400',
        width: '750',
        playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        },
    };
    

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:5}}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' }}>
        <Typography variant='h3'sx={{padding: 2}} gutterBottom>
          {item.moviename}
        </Typography>

        <Box sx={{ width: 'auto', height: '450px',display:'flex'}}>
            <ImageListItem key={item.photo} sx={{margin : 2 ,height:390}}>
              <img
                src={item.photo}
                srcSet={item.photo}
                alt={item.moviename}
                loading="lazy"
              />
            </ImageListItem>
            
            <Box sx={{margin : 2}}>
                <YouTube videoId={item.vdo} opts={opts} />
            </Box>
        </Box>

        <Box sx={{height: 'auto' ,padding:2}}>
            <Typography variant='h3'sx={{paddingX: 2}} gutterBottom>
                {item.moviename}
            </Typography>
            <Typography variant='h5'sx={{paddingX: 2}} gutterBottom>
                released: {item.released}
            </Typography>
            <Typography variant='h5'sx={{paddingX: 2}} gutterBottom>
                rating: {item.rating}
            </Typography>
            <Typography variant='h5'sx={{padding: 2}} gutterBottom>
                description
            </Typography>
            <Typography variant='h6'sx={{paddingX: 2}} gutterBottom>
                {item.text}
            </Typography>
        </Box>

        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Homemovie