import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Authen from './Authen';


export default function Header() {

    // CheckAuth 
    const [currentUser,setCurrentUser] = useState(null)      
    Authen(setCurrentUser)

    //check rank + block customer

    const [checkRank,setCheckRank] = useState(null)      
    useEffect(()=>{
        if(currentUser){
            try{
                if(currentUser.rank === 'MANAGER' || currentUser.rank === 'TEAMLEADER' || currentUser.rank === 'FLOORSTAFF'){
                    console.log('Staff Here');
                    setCheckRank(true)
                }else{
                    console.log('customer');
                    setCheckRank(false)
            }}catch(error){
                alert(error)
                window.location.href = '/'
            }
        }else if(currentUser === false){
            console.log('Loading');
        }
    },[currentUser])
    
    // OpenMenu 
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // logout function
    const handleLogout = (event) =>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/'
    }

    //Go Link
    const golink = (link)=>{
        window.location.href = '/'+link
    }

    //edituser 
    const editAccout = ()=>{
        window.location.href = 'edituser/'+currentUser._id
    }

  return (
    <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" color="primary">
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography onClick={()=>golink('')} variant="h6" component="div" sx={{ flexGrow: 1,cursor:'pointer' }}>
                MOVIES RECORD
            </Typography>

            {/* check authen  */}
            {currentUser ? (
                <Box sx={{ flexGrow: 0 }}>

                    {/* check rank user  */}
                    {checkRank ? (
                        <>
                        <Button color="inherit" onClick={()=>golink('')} sx={{mr:2}}>HOME</Button>
                        <Button color="inherit" onClick={()=>golink('movies')} sx={{mr:2}}>Manage MOVIES</Button>
                        <Button color="inherit" onClick={()=>golink('users')} sx={{mr:5}}>Manage USERS</Button>
                        </>
                    ):(
                        <Button color="inherit" onClick={()=>golink('')} sx={{mr:2}}>HOME</Button>
                    )}
                    
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" 
                        src={currentUser.avatar} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                        
                    <Typography textAlign="center" sx={{m:1}}>{currentUser.username}</Typography>
                    <MenuItem>
                        <Typography textAlign="center" onClick={editAccout}>Accout</Typography>
                    </MenuItem>
                    <MenuItem >
                        <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                    </MenuItem>

                    </Menu>
                </Box>
            ):(
                <>
                <Button color="inherit" onClick={()=>golink('register')}>register</Button>
                <Button color="inherit" onClick={()=>golink('Login')}>Login</Button>
                </>
            )}
            
            </Toolbar>
        </AppBar>
    </Box>
  );
}
