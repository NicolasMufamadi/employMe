import { useState } from "react";
import { Link } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {  ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
import Breadcrumbs  from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNext from "@mui/icons-material/NavigateNext";
import FormControl from "@mui/material/FormControl";
import InputLabel  from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import TextField  from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button  from "@mui/material/Button";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import axiosBaseUrl from "../../../config/base.url";

export default function AddEducation() {


    const user = useSelector((state) => state.auth.user);
    const date = new Date();
    const [data,setData] = useState({
        user_id: user.data.user_id,
        study_field: '',
        qualification_type: '',
        study_type: '',
        institution_name: '',
        qualification_status: ''
    })

    const [starting_date,setStartingDate] = useState(dayjs(""));
    const [ending_date,setEndingDate] = useState(dayjs(""));

    const qualificationTypes = [
        "National Certificate/ National Senior Certificate",
        "Higher Certificate/ Advanced National Certificate",
        "National Diploma/ Advanced Certificate",
        "Bachelor's Degree",
        "Honours Degree",
        "Masters",
        "Doctor's Degree"
    ]

    const statuses = [
        "In-progress",
        "Completed"
    ]

    const months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec']
    
    const breadcrumbs = [
        <Link 
            key='1' 
            className="link"
            to={'/myaccount'}
        >
           My Account
        </Link>,
        <Link 
            key='2' 
            className="link"
            to={'/myaccount/manage-education'}
        >
           Manage Education
        </Link>,
        <Typography key="3">
            Add Education 
        </Typography>

    ]


    const addQualification = async() => {
        if(starting_date !== ''){
            const obj = {...data}
            try {
                const request = await axiosBaseUrl.post('/qualification/',{
                    user_id: data.user_id,
                    study_field: data.study_field,
                    study_type: data.study_type,
                    qualification_type: data.qualification_type,
                    qualification_status: data.qualification_status,
                    institution_name: data.institution_name,
                    starting_date: starting_date.year()+'-'+ months[starting_date.month()] +'-'+ starting_date.date(),
                    ending_date: ending_date.year()+'-'+ months[ending_date.month()] +'-'+ ending_date.date()
                })
                console.log(request)
            } catch (error) {
                console.log(error)
            }
       }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }



    return(
        <div style={{margin: '25px'}}>
            <div>
                <ToastContainer style={{marginTop: "50px"}}  />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Breadcrumbs 
                aria-label="breadcrumb"
                separator = {<NavigateNext fontSize="small" />}
            >
                {breadcrumbs}
            </Breadcrumbs>
            <div style={{marginTop: '25px'}}>
               <Typography variant="h3">Add Qualification</Typography> 
               <Box
                   component={'form'}
                   onSubmit={handleFormSubmit}
                   sx={{width: '40%',marginTop: '15px'}}
               >
                <TextField  
                    label="Faculty"
                    name="study_field"
                    variant="filled"
                    onChange={handleOnChange}
                    value={data.study_field}
                    fullWidth
                    required
                />
                <FormControl fullWidth sx={{marginTop: '25px'}}>
                    <InputLabel>Qualification</InputLabel>
                    <Select
                       label="Qualification"
                       name="qualification_type"
                       variant="filled"
                       onChange={handleOnChange}
                       value={data.qualification_type}
                       required
                    >
                        {
                            qualificationTypes.map((item) => (
                                <MenuItem value={item} key={item}>{item}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField 
                    label="Study Field"
                    name="study_type"
                    variant="filled"
                    onChange={handleOnChange}
                    value={data.course}
                    style={{marginTop: '25px'}}
                    fullWidth
                    required
                />

                <TextField 
                    label="Name of institution"
                    name="institution_name"
                    variant="filled"
                    onChange={handleOnChange}
                    value={data.institution_name}
                    style={{marginTop: '25px'}}
                    fullWidth
                    required
                />
                <FormControl fullWidth style={{marginTop: '25px'}}>
                <InputLabel>Completion Status</InputLabel>
                <Select 
                    label="Completion Status"
                    name="qualification_status"
                    variant="filled"
                    onChange={handleOnChange}
                    value={data.qualification_status}
                    required
                >
                   {
                    statuses.map((item) => (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    ))
                   } 
                </Select>
                </FormControl>
                <div style={{marginTop: '25px',display: 'flex'}}>
                
                <DatePicker
                    label="Starting date"
                    name="starting_date"
                    value={starting_date}
                    onChange={(newDate) => setStartingDate(newDate)}
                />
                <DatePicker 
                    label="Ending date"
                    name="ending_date"
                    sx={{ml: 2}}
                    value={ending_date}
                    onChange={(newDate) => setEndingDate(newDate)}
                />
            </div>
               </Box>
            </div>
            <Button 
                variant='contained' 
                style={{margin: '15px 0',color: '#fff',backgroundColor: '#3AAFA9'}}
                onClick={() => addQualification()}
            >
                Add Education
            </Button>
          </LocalizationProvider>
        </div>
    )
}