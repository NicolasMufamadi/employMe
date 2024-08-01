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
import HandleEmptyArray from "../../handleEmptyArray";

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

    },[user])

    console.log(education)

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
            education.length > 0 ? (
                <>
                
                </>
            ): (
                <HandleEmptyArray LinkIcon={<SchoolIcon sx={{fontSize: 200}} />} link={'/myaccount/manage-education/add'} message={'Add Education'} />
            )
        }
    </div>
   )

}