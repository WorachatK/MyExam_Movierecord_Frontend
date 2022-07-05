import React ,{ useEffect,useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Typography } from '@mui/material';


export default function Home() {

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

  //movie
  const handlemovie=(id)=>{
    window.location.href = '/home/'+id
  }
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p:5}}>
        <Box sx={{ bgcolor: '#424242', height: 'auto' }}>
        <Typography variant='h3'sx={{padding: 2}} gutterBottom>
          Movie Record
        </Typography>

        <ImageList sx={{ width: 'auto', height: 'auto'}}>
          {items.map((item) => (
            <ImageListItem key={item.photo} sx={{margin : 2 ,cursor:'pointer'}}>
              <img
                onClick={()=>handlemovie(item._id)}
                src={item.photo}
                srcSet={item.photo}
                alt={item.moviename}
                loading="lazy"
              />
              <ImageListItemBar
                title={<h1>{item.moviename}</h1>}
                subtitle={
                  <>
                    <h2>released: {item.released}</h2>
                    <h2>rating: {item.rating}</h2>
                  </>
                }
                position="bottom"
              />
            </ImageListItem>
          ))}
        </ImageList>

        </Box>
      </Container>
    </React.Fragment>
  );
}
