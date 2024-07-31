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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button  from "@mui/material/Button";

export default function AddEducation() {

    const date = new Date();
    const [qualiication,setQualification] = useState("");
    const [course,setCourse] = useState("");
    const [institution,setInstitution] = useState("");
    const [starting_date,setStartingDate] = useState(dayjs(""));
    const [ending_date,setEndingDate] = useState(dayjs(""));
    const [faculty,setFaculty] = useState("");
    const [status,setStatus] = useState("");
    const [isValid,setIsValid] = useState(false)


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
        "InProgress",
        "Completed"
    ]
    
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
            to={'/myaccount-manage-education'}
        >
           Manage Education
        </Link>,
        <Typography key="3">
            Add Education 
        </Typography>

    ]


    const addQualification = () => {

        if(faculty === "" || course === "" || status === "" || institution === "" || qualiication === "" ){
            toast.error("All values required except ending date")
        }else{
            console.log("Proceed")
        }

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
            </div>
               <div style={{marginTop: '15px'}}>
               <FormControl sx={{width: "41%"}}>
                    <InputLabel>Study Field</InputLabel>
                    <FilledInput
                        color='#17252A'
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                    />
               </FormControl>
               </div>
               <div style={{marginTop: '20px'}}>
               <FormControl sx={{width: '41%'}}>
                    <InputLabel>Qualification Type</InputLabel>
                    <Select
                      value={qualiication}
                      onChange={(e) => setQualification(e.target.value)}
                      fullWidth
                    >
                        {
                            qualificationTypes.map((item) => (
                                <MenuItem 
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            ))
                        } 
                    </Select>
               </FormControl>
               </div>
               <div style={{marginTop: '20px'}}>
                    <FormControl sx={{width: '41%'}}>
                        <InputLabel>Name Of The Course</InputLabel>
                        <FilledInput 
                            color='#17252A'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            fullWidth
                        />
                    </FormControl>
            </div>
            <div style={{marginTop: '20px'}}>
                    <FormControl sx={{width: '41%'}}>
                        <InputLabel>Institution</InputLabel>
                        <FilledInput 
                            color='#17252A'
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            fullWidth
                        />
                    </FormControl>
            </div>
            <div style={{marginTop: '20px'}}>
               <FormControl sx={{width: '41%'}}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      fullWidth
                    >
                        {
                            statuses.map((item) => (
                                <MenuItem 
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            ))
                        } 
                    </Select>
               </FormControl>
            </div>
            <div style={{marginTop: '20px'}}>
                
                <DatePicker
                    label="Starting date"
                    value={starting_date}
                    onChange={(newDate) => setStartingDate(newDate)}
                />
                <DatePicker 
                    label="Ending date"
                    sx={{ml: 2}}
                    value={ending_date}
                    onChange={(newDate) => setEndingDate(newDate)}
                />
            </div>
            <div>
            <Button 
                variant='contained' 
                style={{margin: '15px 0',color: '#fff',backgroundColor: '#3AAFA9'}}
                onClick={() => addQualification()}
            >
                Add Education
            </Button>
            </div>
          </LocalizationProvider>
        </div>
    )
}