import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumbs,Button,Card,CardActions,CardContent,Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOn from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axiosBaseUrl from "../../../config/base.url";
import HandleEmptyArray from "../../handleEmptyArray";
import DeleteAddress from "./deleteAddress";
import AddIcon from '@mui/icons-material/Add'; 


export default function ViewAddress(){

    const user = useSelector((state) => state.auth.user);
    const [address,setAddress] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        
        const fetchAddress = async() => {
            const response = await axiosBaseUrl.get(`/address/${user.data.user_id}`)

            if(response.data){ 
                setAddress(response.data.data)
            } 
        }

        fetchAddress()
    
    },[user])

    const handleDialogOpen = () => {
        setIsOpen(true)
    }

    const handleDialogClose = () => {
        setIsOpen(false);
    }


    return(
        <div style={{margin: '25px'}}>
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize="medium" />}
            >
                <Link className="link" to="/myaccount" key={1}>
                    My Account
                </Link>
                <Typography key={2}>Manage Address</Typography>
            </Breadcrumbs>
             
            <div style={{marginTop: '30px'}}>
                <Button
                    variant='contained' 
                    style={{margin: '15px 0',color: '#fff',backgroundColor: '#3AAFA9'}}
                    endIcon={<AddIcon />}
                    onClick={() => navigate('/myaccount/manage-address/add-address')}
                >
                    Add New Address
                </Button>
                {
                    address.length > 0 ? (
                        address.map((item) => (
                            <Card sx={{maxWidth: 700, marginBottom: '2rem'}} raised key={item.address_id}>
                            <CardContent>
                                <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{item.street_no} {item.street_name} </Typography>
                                {
                                    item.feature ? (
                                        <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{item.feature}</Typography>       
                                    ): <></>
                                }
                                <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{item.province}</Typography>
                                <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>{item.city}, {item.suburb}, {item.zip_code}</Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'flex-end'}}>
                                <Button 
                                    variant="contained" 
                                    style={{backgroundColor: '#3AAFA9'}} 
                                    endIcon={<EditIcon />}
                                    onClick={() => 
                                        navigate('/myaccount/manage-address/edit-address',
                                            {state: {
                                                address_id: item.address_id,
                                                street_no: item.street_no,
                                                street_name: item.street_name,
                                                feature: item.feature,
                                                suburb: item.suburb,
                                                zip_code: item.zip_code,
                                                city: item.city,
                                                province: item.province
                                            }})
                                        } 
                                >
                                    Edit
                                </Button>    
                               
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    endIcon={<DeleteIcon />}
                                    onClick={handleDialogOpen}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                                <DeleteAddress open={isOpen} handleClose={handleDialogClose} address={item.address_id} />
                            </Card>
                        ))
                        
                    ) : (
                        <>
                           <HandleEmptyArray LinkIcon={<LocationOn sx={{fontSize: 200}} />} message="Add Address" link={"/myaccount/manage-address/add-address"}  />
                        </>
                    )
                }
                
            </div>

        </div>
    )
}