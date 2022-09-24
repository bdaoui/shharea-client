import React, {useContext, useState, useEffect} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom"; 
import {AuthContext} from '../../context/context';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import logo from '../../assets/logo.png'

const NavBar = () => {

const [anchorElNav, setAnchorElNav] = useState(null);
const [anchorElUser, setAnchorElUser] = useState(null);
const [details, setDetails] = useState({})

const handleOpenNavMenu = (event) => {
  setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};

const navigate = useNavigate()
const { logOutUser, user } = useContext(AuthContext);
const id = user?._id;

useEffect(() => {
  axios
    .get(`http://localhost:5005/user/${id}/details`)
    .then((response) => setDetails(response.data))
    .catch((err) => console.log(err));
  // eslint-disable-next-line
}, [user]);




  return (
    // <nav >
    //     <ul>
    //       <li><NavLink to={"/home"} > Home</NavLink> </li>
    //       <li><NavLink to={`/profile/${id}`} > Profile</NavLink> </li>
    //       <li><NavLink to={"/login"}> Log In</NavLink> </li>
    //       <li><button onClick={() => {navigate('/join')}}> Join Chat</button> </li>
    //       <li><NavLink to={"/explore"}> Explore</NavLink> </li>
    //       <li><button onClick={logOutUser}> Log Out</button> </li>
          
    //     </ul>
    // </nav>

    <AppBar position="static" >
    <Container maxWidth="xl" >
      <Toolbar disableGutters>

        
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <img src={logo} style={{width:'120px', height:'30px'}} />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
              <MenuItem onClick={handleCloseNavMenu}>
                 <Link to='/'  style={{ textDecoration: 'none', color:'white' }}><Typography textAlign="center">Login</Typography></Link>
                </MenuItem> 
                <MenuItem onClick={handleCloseNavMenu}>
                 <Link to='explore'  style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Explore</Typography></Link>
                </MenuItem> 
                <MenuItem onClick={handleCloseNavMenu}>
                 <Link to='join'  style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Chat</Typography></Link>
                </MenuItem> 
          </Menu>
        </Box>

        
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
         <img src={logo} style={{width:'120px', height:'30px'}} />
        </Typography>

        
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
            <Link to='/'  style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Login</Typography></Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
            <Link to='explore'  style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Explore</Typography></Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
            <Link to='join'  style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Chat</Typography></Link>
            </Button>
         


        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={details.image} alt='none' />
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
            
              <MenuItem onClick={handleCloseUserMenu}>
              <Link to={`profile/${id}`} style={{ textDecoration: 'none', color:'white'  }}><Typography textAlign="center">Profile</Typography></Link>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" onClick={logOutUser}>Logout</Typography>
              </MenuItem>
      
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  );
};

export default NavBar;