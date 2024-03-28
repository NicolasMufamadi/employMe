import './App.css';
import { useEffect } from 'react';
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
import { logout, isAuthenticated } from './store/slices/auth.slice';

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

  useEffect(()=>{
    async function verifyAuthentication(){
      if(user !== null){
        const response = await dispatch(isAuthenticated(user.token))
        if(response.type === 'auth/isAuthenticated/rejected') {
          navigate('/login')
        }
      }
    }
    verifyAuthentication()
  })


  const LoggedIn = () => {
     return(
      <>
          <LinkButton>MyApplications</LinkButton>
          <LinkButton onClick={() => navigate('/myaccount')}>MyAccount</LinkButton>
          <LinkButton>Quotes</LinkButton>
          <LinkButton onClick={()=> handleLogout()}>Logout</LinkButton>
      </>
     )
  }
  
  const Guest = () => {
    return(
      <>
          <LinkButton>Quotes</LinkButton>
          <LinkButton className='mr-3'>About</LinkButton>
          <LinkButton onClick={() => navigate("/login")}>Login</LinkButton>
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
          <Typography color="secondary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
