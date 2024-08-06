import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  ToastContainer, toast } from "react-toastify";
import axiosBaseUrl from "../../../config/base.url";
import  Typography  from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions"
import TextField from "@mui/material/TextField";
import Container  from "@mui/material/Container";
import FormControl  from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { InputLabel, Select } from "@mui/material";


export default function AddAddress(){

    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const  { state }  = useLocation();

    const provinces = [{ name: "Eastern Cape" },{ name: "Free State" },{ name: "Gauteng" },{ name: "KwaZulu-Natal" },{ name: "Limpopo" },{ name: "Mpumalanga" },{ name: "Northern Cape" },{ name: "North West" },{ name: "Western Cape" }]
    const [data,setData] = useState({
        user_id: user.data.user_id,
        street_no: ( state && state.street_no ) ? state.street_no : "",
        street_name: ( state && state.street_name ) ? state.street_name : "",
        feature: ( state && state.feature ) ? state.feature : "",
        province: ( state && state.province ) ? state.province : "",
        city:( state && state.city ) ? state.city : "",
        suburb:( state && state.suburb ) ? state.suburb : "",
        zip_code:( state && state.zip_code ) ? state.zip_code : ""
    });

    const handleForm = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }

    const handleOnSubmit = async (e) => {
      e.preventDefault();
      
        try { 
            const request = await axiosBaseUrl.post(`/address/`,data,{
              headers: {
                "Content-Type": "application/json"
              },
            })
            console.log(data)
            if(request.data){
              toast.success("Address Added!")
              setTimeout(()=>(navigate('/myaccount/manage-address')), 5000)
            }

        } catch (error) {
            console.log(error)
        }
      
    

    }

    const handleFormUpdate = async(e) => {
      e.preventDefault();
      try {
        const request =await axiosBaseUrl.put(`/address/${state.address_id}`,data)
        if(request.status === 200){
          toast.success("Address Updated!")
          setTimeout(()=>(navigate('/myaccount/manage-address')), 5000)
        }
      } catch (error) {
        console.log(error)
      }  
    }

    return (
      <Container style={{ margin: "25px" }}>
        <ToastContainer style={{marginTop: '50px'}} />
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="medium" />}
        >
          <Link className="link" to="/myaccount" key={1}>
            My Account
          </Link>
          <Link className="link" to="/myaccount/manage-address">
            Manage Address
          </Link>
          <Typography key={2}>Manage Address</Typography>
        </Breadcrumbs>
        <Box 
          component="form"
          sx={{marginTop: '25px'}}
          onSubmit={state ? handleFormUpdate : handleOnSubmit}
        >
          <Card>
            <TextField
              variant="filled" 
              label="Street Number"
              name="street_no"
              value={data.street_no}
              onChange={handleForm}
              style={{margin: '25px',width: '300px'}}
              required
            />

            <TextField 
              variant="filled"
              label="Street Name"
              name="street_name"
              value={data.street_name}
              onChange={handleForm}
              style={{margin: '25px',width: '300px'}}
              required
            />

            <TextField 
              variant="filled"
              label="Complex Building"
              helperText="Optional"
              name="feature"
              value={data.feature}
              onChange={handleForm}
              style={{margin: '25px',width: '300px'}}
            />

            <TextField 
              variant="filled"
              label="Suburb"
              name="suburb"
              value={data.suburb}
              onChange={handleForm}
              style={{margin: '25px',width: '500px'}}
              required
            />

            
            <TextField 
              variant="filled"
              label="Zip Code"
              name="zip_code"
              value={data.zip_code}
              onChange={handleForm}
              style={{margin: '25px',width: '500px'}}
              required
            />

            <TextField 
              variant="filled"
              label="City"
              name="city"
              value={data.city}
              onChange={handleForm}
              style={{margin: '25px',width: '500px'}}
              required
            />
            <FormControl style={{margin: '25px',width: '500px'}}>
              <InputLabel>Province</InputLabel>
              <Select 
                variant="filled"
                label="Province"
                name="province"
                value={data.province}
                onChange={handleForm}
                required
              >
                {
                  provinces.map((province) => (
                    <MenuItem value={province.name} key={province.name}>{province.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <CardActions>
              {
                state ? (
                  <Button 
                    type="submit"
                    style={{margin: '25px',color: '#fff',backgroundColor: '#3AAFA9'}}
                >
                  Update Address
                </Button>                  
                ) : (
                  <Button 
                    type="submit"
                    style={{margin: '25px',color: '#fff',backgroundColor: '#3AAFA9'}}
                >
                  Add Address
                </Button>
                )
              }
            </CardActions>
          </Card>
        </Box>
      </Container>
    );

}