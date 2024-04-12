import { useState} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import  Typography  from '@mui/material/Typography';
import  Container from '@mui/material/Container';
import  FormControl  from '@mui/material/FormControl';
import  InputLabel from '@mui/material/InputLabel';
import  FilledInput  from '@mui/material/FilledInput';
import  Button  from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from '../../../store/slices/auth.slice';


export default function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const status = useSelector((state) => state.auth.status)
  

  const handleClickPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLogin = async() =>{
      const data = {
        "email": email,
        "password": password 
      }
    const res = await dispatch(login(data))
    
    if(res.type === "auth/login/rejected"){
       toast.error('Incorrect password or email')
    }

    if(res.type === "auth/login/fulfilled"){
      navigate('/')
    }

  }
  


  return (
    <>
      <ToastContainer style={{marginTop: "50px"}} />
      <Typography variant='h1' color="#17252A" style={{textAlign: 'center',marginTop: "5%"}}>Login</Typography>
      <Container style={{textAlign: 'center'}}>
        <FormControl sx={{m: 2, width: '50%'}}>
          <InputLabel htmlFor="email">email</InputLabel>
          <FilledInput  id='email' type='email' color='#17252A'  onChange={(e)=>setEmail(e.target.value)} ></FilledInput>      
        </FormControl>

        <FormControl sx={{m: 2, width: '50%'}}>
          <InputLabel htmlFor="password">password</InputLabel>
          <FilledInput
                id='password' 
                type={showPassword ? 'text' : 'password' }  
                color='#17252A'  
                onChange={(e)=> setPassword(e.target.value)} 
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton 
                        aria-label='toggle  password visibility'
                        onClick={handleClickPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}

                    </IconButton>
                  </InputAdornment>
                }
          >
          </FilledInput>      
        </FormControl>

        <div style={{display: 'flex', justifyContent: 'space-between' ,maxWidth: '50%',textAlign: 'center',marginLeft: "25%"}}>
          <Link style={{color: "#17252A",marginTop: '15px'}}>Forget Password</Link> 
          <p>No Account? <Link style={{color: "#17252A"}} to="/register">Register</Link></p>
        </div>

        <div>
          <Button variant="contained" 
                  style={{backgroundColor: "#3AAFA9",padding: "10px 60px 10px 60px "}}
                  onClick={()=> handleLogin()}
          >
                    Login
          </Button>
        </div>
        
      </Container>
    </>
  )
}