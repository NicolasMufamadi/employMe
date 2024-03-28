import { useState } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosBaseUrl from '../../../config/base.url';
import  Typography  from '@mui/material/Typography';
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button  from '@mui/material/Button';

export default function Register() {

    const [formData,setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    }); 
    const [emailErr,setEmailErr] = useState(false);
    const [passwordErr,setPasswordErr] = useState(false);
    const [confirmPasswordErr,setConfirmPasswordErr] = useState(false);

    const navigate = useNavigate();
    

    const handleSubmit = () => {

        if(validateForm()){
            axiosBaseUrl.post('/user/',{
                email: formData.email,
                password: formData.password
            }).then(response => {
                if(response){
                    navigate('/login')
                }
            }).catch(err =>{
                setEmailErr(true)
                toast.error("Email already exists")
            })
        }
  
    }

    const validateForm = () => {
        
        let valid = true
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if(formData.email === ''){
            setEmailErr(true)
            toast.error('Email is required')
            valid = false
        }else{
            setEmailErr(false)
            valid = true
        }
        
        if(!re.test(formData.password)){
            setPasswordErr(true)
            toast.error("Password must match minimum requirements")
            valid = false
        }else{
            setPasswordErr(false)
            valid = true
        }


        if(formData.password !== formData.confirmPassword){
            setConfirmPasswordErr(true)
            toast.error("passwords not matching")
            valid = false
        }else{
            setConfirmPasswordErr(false)
            valid = true
        }

        return valid

    }

    return(
        <>
           <ToastContainer style={{marginTop: "50px"}}/>
           <Container>
                <Typography variant='h3'style={{marginTop: '50px'}}>Create an account</Typography>
             <div>
                <FormControl  sx={{mt: 2}} style={{width: '50%'}}>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <FilledInput 
                        id='email'
                        type='email'
                        color='#17252A'
                        error={emailErr}
                        onChange={(e) => setFormData({...formData,email: e.target.value})}
                    >
                    </FilledInput>
                </FormControl>
            </div>
            <div>
                <FormControl  sx={{mt: 2}} style={{width: '50%'}}>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <FilledInput 
                        id='password'
                        type='password'
                        color='#17252A'
                        error={passwordErr}
                        onChange={(e) => setFormData({...formData,password: e.target.value})}
                    >
                    </FilledInput>
                    {
                        passwordErr ?
                        (
                            <p style={{color: 'red'}}>Password must have min 8 characters, with at least a symbol, upper and lower case letters and a number</p>
                        ): 
                        (
                            <></>
                        )
                    }
                </FormControl>
            </div>
            <div>
                <FormControl  sx={{mt: 2}} style={{width: '50%'}}>
                    <InputLabel htmlFor='confirm-password'>Confirm Password</InputLabel>
                    <FilledInput 
                        id='confirm-password'
                        type='password'
                        color='#17252A'
                        error={confirmPasswordErr}
                        onChange={(e) => setFormData({...formData,confirmPassword: e.target.value})}
                        
                    >
                    </FilledInput>
                </FormControl>
            </div>
            <div style={{marginTop: "15px"}}>
                <Button variant="contained" 
                        style={{backgroundColor: "#3AAFA9",padding: "10px 60px 10px 60px "}}
                        onClick={() => handleSubmit()}
                >
                    Register
                </Button>
            </div>
           </Container>
        </>
    )
}