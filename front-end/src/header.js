import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout,getUser } from './store/slices/auth.slice';
import { useEffect } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main: "#3AAFA9",
    },
    secondary:{
      main: "#fff"
    },
  },
});

const LinkButton = styled(Button)({
  borderRadius: '15px',
  padding: '2px 15px 2px 15px',
  backgroundColor: '#fff',
  color: '#17252A',
  fontSize: '14px',
  textTransform: 'unset !important',
  marginRight: '5px',
  '&:hover':{
    backgroundColor: '#17252A',
    color: '#fff'
  }
  
});
               
function Header() {
  
  const user = useSelector((state)=> state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user)

  useEffect(() => {
    if(localStorage.getItem('jwtToken')){
      dispatch(getUser())
    }else{
      dispatch(logout())
    }
  }, [dispatch,navigate])


  const LoggedIn = () => {
     return(
      <>
          <LinkButton onClick={() => navigate('/myaccount')} style={{fontWeight: 'bold'}}>MyAccount</LinkButton>
          <LinkButton style={{fontWeight: 'bold'}}>MyApplications</LinkButton>
          <LinkButton style={{fontWeight: 'bold'}} >Quotes</LinkButton>
          <LinkButton onClick={()=> handleLogout()} style={{fontWeight: 'bold'}} >Logout</LinkButton>
      </>
     )
  }
  
  const Guest = () => {
    return(
      <>
          <LinkButton  style={{fontWeight: 'bold'}}>Quotes</LinkButton>
          <LinkButton className='mr-3'  style={{fontWeight: 'bold'}}>About</LinkButton>
          <LinkButton onClick={() => navigate("/login")}  style={{fontWeight: 'bold'}}>Login</LinkButton>
      </>
    )
  }
  
  const handleLogout = () => {
      navigate('/login')
      dispatch(logout())
  }



  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color='primary' enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <MenuIcon />
          </IconButton>
          <Typography 
              className='logo' 
              color="secondary" 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1 }} 
              style={{fontWeight: 'bold'}} 
              onClick={() => navigate('/')}
          >
            EmployMe
          </Typography>
          {
            user ? <LoggedIn /> : <Guest />
          }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    </Box>
  );
}

export default Header;
