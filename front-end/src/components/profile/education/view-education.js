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

export default function ViewEducation() {


    const [education,setEducation] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {

        const FetchData = () => {
            axiosBaseUrl.get(`/qualification/${user.data.user_id}`)
            .then((response) => {
                setEducation(response.data)
            }).catch(err => {
                console.log(err)
            })

        }

        FetchData()

    })

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
        <div style={{textAlign: 'center',marginTop: '5rem',display: 'flex',justifyContent: 'center'}}>
            <Card sx={{width: 500,height: 300}}>
                <CardContent>
                    <div>
                        <SchoolIcon sx={{fontSize: 200}} />
                    </div>
                    <Typography variant="h6">No data captured</Typography>
                    <Button variant="outlined" onClick={() => navigate("/myaccount/manage-education/add")}>Add Education</Button>
                </CardContent>
            </Card>   
        </div>
    </div>
   )

}