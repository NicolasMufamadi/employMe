import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../../config/base.url";
import SchoolIcon from "@mui/icons-material/School";
import Card from "@mui/material/Card";
import CardContent  from "@mui/material/CardContent";
import Breadcrumbs  from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography  from "@mui/material/Typography";
import Button  from "@mui/material/Button";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import HandleEmptyArray from "../../handleEmptyArray";
import { Avatar, CardActions } from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DoneIcon from '@mui/icons-material/Done';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add'; 
import RemoveQualification from "./remove-qualification";

export default function ViewEducation() {


    
    const [qualifications,setQualifications] = useState([]);
    const [qualification_id,setQualification_id] = useState('');
    const [isOpen,setIsOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = () => {
            axiosBaseUrl.get(`/qualification/${user.data.user_id}`)
            .then((response) => {
                setQualifications(response.data)
            }).catch(err => {
                console.log(err)
            })

        }

        fetchData()

    },[user])


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
    
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Pad month with leading zero
        const day = date.getUTCDate().toString().padStart(2, '0'); // Pad day with leading zero
    
        return `${year}-${month}-${day}`;
    };

    const DateFormatter = ({ timestamp, ending_date_stamp }) => {

        const formattedDate = formatDate(timestamp);
        const ending_date = formatDate(ending_date_stamp);

        return (
            <div>
                <p style={{marginTop: '10px',marginLeft: '10px',fontWeight: 'bold'}}>[ {formattedDate} - {ending_date}]</p>
            </div>
        );
    };

    const handleOpenDialog = (id) => {
        setQualification_id(id);
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setIsOpen(false);
    }

    const handleUpdateQualification = (qualification) => {
        navigate('/myaccount/manage-education/update-qualification',{state: qualification})
    }


   return(
    <div style={{ margin: "25px" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="medium" />}
        >
            <Link className="link" to="/myaccount" key={1}>
              My Account
            </Link>
            <Typography key={2}>Manage Education</Typography>
        </Breadcrumbs>
        {
            qualifications.length > 0 ? (
                <>
                  <Typography variant="h3" style={{marginTop: '20px',marginBottom: '20px'}}>Qualifications</Typography>
                  <Button
                    variant="contained"
                    style={{margin: '10px 0',color: '#fff',backgroundColor: '#3AAFA9'}}
                    endIcon={<AddIcon />}
                    onClick={()=>navigate('/myaccount/manage-education/add')}
                  >
                    Add Qualification
                  </Button>
                  {
                    qualifications.map((qualification) => (
                        <Card raised key={qualification.qualification_id} sx={{marginBottom: '25px'}}>
                            <CardContent>
                                <div style={{display:'flex'}}>
                                    <Avatar>
                                        <WorkspacePremiumIcon style={{color: 'black'}}/>
                                    </Avatar>
                                    <Typography variant="h6" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '5px'}}>{qualification.qualification_type}</Typography>
                                </div>

                                <div style={{display:'flex',marginTop: '10px'}}>
                                    <Avatar>
                                        <LocalLibraryIcon style={{color: 'black'}}/>
                                    </Avatar>
                                    <Typography variant="p" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '10px'}}>{qualification.study_field}</Typography>
                                </div>

                                <div style={{display:'flex',marginTop: '10px'}}>
                                    <Avatar>
                                        <LibraryBooksIcon style={{color: 'black'}}/>
                                    </Avatar>
                                    <Typography variant="p" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '10px'}}>{qualification.study_type}</Typography>
                                </div>

                                <div style={{display:'flex',marginTop: '10px'}}>
                                    <Avatar>
                                        <AccountBalanceIcon style={{color: 'black'}}/>
                                    </Avatar>
                                    <Typography variant="p" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '10px'}}>{qualification.institution_name}</Typography>
                                </div>

                                {
                                    qualification.qualification_status === 'Completed' ? (
                                        <div style={{display:'flex',marginTop: '10px'}}>
                                            <Avatar>
                                                <DoneIcon style={{color: 'black'}}/>
                                            </Avatar>
                                            <Typography variant="p" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '10px'}}>{qualification.qualification_status}</Typography>
                                            <DateFormatter timestamp={qualification.starting_date} ending_date_stamp={qualification.ending_date} />
                                        </div>
                                    ): (

                                        <div style={{display:'flex',marginTop: '10px'}}>
                                            <Avatar>
                                                <RefreshIcon style={{color: 'black'}}/>
                                            </Avatar>
                                            <Typography variant="p" style={{fontWeight: 'bold',marginLeft: '15px',marginTop: '10px'}}>{qualification.qualification_status}</Typography>
                                            <DateFormatter timestamp={qualification.starting_date} ending_date_stamp={qualification.ending_date} />
                                        </div>
                                )
                            }                                
                            </CardContent>
                            <CardActions sx={{justifyContent: 'flex-end'}}>
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: '#3AAFA9'}} 
                                    endIcon={<EditIcon />}
                                    onClick={() => handleUpdateQualification(qualification)}
                                >
                                    Update
                                </Button>
                                <Button 
                                    variant="contained"
                                    color="error"
                                    endIcon={<DeleteIcon />}
                                    onClick={() => handleOpenDialog(qualification.qualification_id)}
                                >
                                    Remove
                                </Button>
                            </CardActions>  
                            <RemoveQualification  handleOpen={isOpen} handleClose={handleCloseDialog} id={qualification_id} />
                        </Card>
                    ))
                  } 
                </>
            ): (
                <HandleEmptyArray LinkIcon={<SchoolIcon sx={{fontSize: 200}} />} link={'/myaccount/manage-education/add'} message={'Add Education'} />
            )
        }
    </div>
   )

}