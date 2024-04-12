import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack  from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography  from "@mui/material/Typography";
import Box  from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Button  from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { changePassword } from "../../../store/slices/auth.slice";

export default function ChangePassword() {

    const [showPassword,setShowPassword] = useState(false);
    const [newPassword,setNewPassword]  = useState('');
    const [currentPassword,setCurrentPassword] = useState('');
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const breadcrumbs = [
        <Link className='link' underline='hover' key={2} to='/myaccount'>My Account</Link>,
        <Link className='link' underline='hover' key={2} to='/myaccount/manage-profile'>Manage Profile</Link>,
        <Typography key={2} >Manage Password</Typography>
    ]

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault(); 
    }

    const handleChangePassword = async () => {
        const data = {
            "user_id": user.data.user_id,
            "newPassword": newPassword,
            "currentPassword": currentPassword
        }

        const response = await dispatch(changePassword(data))
        if(response.payload.data.err){
            toast.error(response.payload.data.err)
        }else{
            toast.success(response.payload.data.success)
            setTimeout(()=> navigate('/myaccount/manage-profile',{replace: true}), 5000)
            
        }
    }

    
   return(
    <>
    <ToastContainer style={{marginTop: "50px"}}  />
    <div style={{margin: '25px'}}>
        <Stack spacing={2}>
            <Breadcrumbs 
                separator={<NavigateNextIcon fontSize='medium' />}
                aria-label='breadcrumb'
            >
                {breadcrumbs}
            </Breadcrumbs> 
        </Stack>
        <Box
            mt={2}
        >
           <Paper elevation={2} sx={{height: 500}}>
               <div style={{textAlign: 'center'}}>
                  <FormControl sx={{mt: 10,width: '60%'}}>
                    <InputLabel>Current Password</InputLabel>
                    <FilledInput
                        fullWidth
                        variant='filled'
                        color='#17252A'
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                     />
                  </FormControl>
                  <FormControl sx={{mt: 10,width: '60%'}}>
                    <InputLabel>New Password</InputLabel>
                    <FilledInput
                        fullWidth
                        variant='filled'
                        color='#17252A'
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                     />
                  </FormControl>
                  <div style={{marginTop: '3rem'}}>
                     <Button 
                        style={{backgroundColor: "#3AAFA9",padding: "10px 60px 10px 60px "}}
                        variant="contained"
                        onClick={() => handleChangePassword()}
                     >
                        Change Password
                    </Button>
                  </div>
               </div>
           </Paper>
        </Box>
    </div>
    </>
   )
}