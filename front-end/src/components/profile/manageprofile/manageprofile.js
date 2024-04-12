import { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography  from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box  from '@mui/material/Box';
import Breadcrumbs  from '@mui/material/Breadcrumbs';
import Stack  from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField  from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilledInput  from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Button  from '@mui/material/Button';
import { getUser, updateUser } from '../../../store/slices/auth.slice';

function ManageProfile() {

    const currentUser = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.userToken)
    const [user,setUser] = useState({data: currentUser.data})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    console.log(user.data)
    const [form,setForm] = useState({
        firstName: (user && user.data.first_name) ? user.data.first_name : '', 
        middleName: (user && user.data.middle_name) ? user.data.middle_name : '',
        lastName: (user && user.data.last_name) ? user.data.last_name : '',
        phoneNumber: (user && user.data.number_phone) ? user.data.number_phone : '',
        telephone: (user && user.data.telephone) ? user.data.telephone : '',
        gender: (user && user.data.gender) ? user.data.gender : '',
        userRole: (user && user.data.userrole) ? user.data.userrole : '',
        organization: (user && user.data.organization) ? user.data.organization : '',
        email: (user && user.data.email) ? user.data.email : '' 
    });

    useEffect(() => {
        async function getUpdatedUserInformation(){
            const result = await dispatch(getUser(user.data.user_id));
            const newUser = result.payload
            console.log(user)
            console.log(newUser)
//            setUser({data: newUser})
        }
        getUpdatedUserInformation();
    },[user])

    const handleFirstNameChange = (e) => {
        setForm({...form,firstName: e.target.value});
    }
    
    const handleMiddleNameChange = (e) => {
        setForm({...form,middleName: e.target.value});
    }

    const handleLastNameChange = (e) => {
        setForm({...form,lastName: e.target.value});
    }

    const handlePhoneNumberChange = (e) => {
        setForm({...form,phoneNumber: e.target.value});
    }

    const handleTelephoneChange = (e) => {
        setForm({...form,telephone: e.target.value});
    }

    const handleGenderChange = (e) => {
        setForm({...form,gender: e.target.value});
    }

    const handleEmailChange = (e) => {
        setForm({...form,email: e.target.value})
    }

    const handleChanges = async() => {
        
        let data = {}
         
        if(form.firstName !== user.data.first_name){
            data = {
                ...data,"first_name": form.firstName,"user_id": user.data.user_id
            }
        }

        if(form.middleName !== user.data.middle_name){
            data = {
                ...data,"middle_name": form.middleName,"user_id": user.data.user_id
            }
        }

        if(form.lastName !== user.data.last_name){
            data = {
                ...data,"last_name": form.lastName,"user_id": user.data.user_id
            }
        }

        if(form.phoneNumber !== user.data.number_phone){
            data = {
                ...data,"number_phone": form.phoneNumber,"user_id": user.data.user_id
            }
        }

        if(form.telephone !== user.data.telephone ){
            data = {
                ...data,"telephone": form.telephone,"user_id": user.data.user_id
            }
        }

        if(form.gender !== user.data.gender){
            data = {
                ...data,"gender": form.gender,"user_id": user.data.user_id
            }
        }

        if(form.email !== user.data.email){
            data = {
                ...data,"email": form.email,"user_id": user.data.user_id
            }
        }

        if(Object.keys(data).length > 0){
            const update =await dispatch( updateUser(data))
            if(update.type !== 'auth/updateUser/rejected'){
                setUser(update.payload)
                toast.success("Update successful")
            }else{
                toast.error("Email already exists")
            }
        }else{
            console.log("No changes made")
        }


    }

    const handleUpdateEmail = () => {

    }

    const handleUpdatePassword = () => {

    }


    const breadcrumbs = [
        <Link className='link' underline='hover' key={2} to='/myaccount'>My Account</Link>,
        <Typography key={2} >Manage Profile</Typography>
    ]

  return (
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
            sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    mt: 3,
                    width: '100%',
                    height: 500,
                   },
                }}
        >
            <Paper elevation={2}>
                <div style={{margin: '10px'}}>
                       <FormControl sx={{width: '30%',margin: '15px'}}>
                            <InputLabel>First Name</InputLabel>
                            <FilledInput 
                                label='FirstName'
                                variant='filled'
                                color='#17252A'
                                value={form.firstName}
                                onChange={(e) => handleFirstNameChange(e)}
                            />
                       </FormControl>
                       <FormControl sx={{width: '30%',margin: '15px'}}>
                            <InputLabel>Middle Name</InputLabel>
                            <FilledInput 
                                variant='filled'
                                color='#17252A'
                                value={form.middleName}
                                onChange={(e) => handleMiddleNameChange(e)}
                            />
                       </FormControl>
                       <FormControl sx={{width: '30%',margin: '15px'}}>
                            <InputLabel>Last Name</InputLabel>
                            <FilledInput 
                                variant='filled' 
                                color='#17252A'
                                value={form.lastName}
                                onChange={(e) => handleLastNameChange(e)}
                            />
                       </FormControl>
                </div>

                <div style={{marginTop: '30px'}}>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>Phone Number</InputLabel>
                        <FilledInput 
                            variant='filled' 
                            color='#17252A'
                            value={form.phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e)}
                        />
                    </FormControl>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>Telephone Number</InputLabel>
                        <FilledInput 
                            variant='filled' 
                            color='#17252A'
                            value={form.telephone}
                            onChange={(e) => handleTelephoneChange(e)}
                        />
                    </FormControl>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>Gender</InputLabel>
                        <FilledInput 
                            variant='filled'
                            color='#17252A'
                            value={form.gender}
                            onChange={(e) => handleGenderChange(e)}
                        />
                    </FormControl>
                </div>

                <div style={{marginTop: '30px'}}>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>User Role</InputLabel>
                        <FilledInput 
                            variant='filled'
                            color='#17252A'
                            disabled
                            value={form.userRole}
                        />
                    </FormControl>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>Organization</InputLabel>
                        <FilledInput 
                            variant='filled'
                            color='#17252A'
                            disabled
                            value={form.organization}
                        />
                    </FormControl>
                    <FormControl sx={{width: '30%',margin: '15px'}}>
                        <InputLabel>Email</InputLabel>
                        <FilledInput 
                            variant='filled' 
                            color='#17252A'
                            value={form.email}
                            onChange={(e) => handleEmailChange(e)}
                        />
                    </FormControl>
                </div>
                <div style={{marginTop: '10px'}}>
                    <Button variant='contained' style={{margin: '15px',color: '#fff',backgroundColor: '#3AAFA9'}} onClick={() => handleChanges()}>Save Changes</Button>
                    <Button variant='contained' color='error' style={{margin: '15px'}}onClick={() => navigate('/myaccount/manage-profile/change-password')}>Update password</Button>
                </div>
            </Paper>
        </Box>
    
    </div>
    </>
  )
}

export default ManageProfile