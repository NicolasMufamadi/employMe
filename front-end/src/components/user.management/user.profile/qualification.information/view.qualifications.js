import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { getUser } from "../../../../store/slices/userSlice";
import config from "../../../../config";
import RemoveQualification from "./remove.qualification";

export default function ViewQualifications() {
 
   const user = useSelector(getUser);
   const navigate = useNavigate();

   const [qualifications,setQualifications] = useState([]);

   useEffect( ()=> {
         
       async function getQualifications(){

           const request = await fetch(`${config.baseURL.endPoint}/qualification/${user.user_id}`);
           const response = await request.json();
           setQualifications(response)
           console.log(response);
        }

        getQualifications();
    
   },[])


   const update = (id) => {
        navigate('/myaccount/qualification-info/update-qualification');
        localStorage.setItem("Id",id);
   }

    return(
        <div className="mt-4">
        <div className="container">
           <h2>My Qualifications</h2>
           <div className="d-flex mb-3">
          <button
                type="button"
                className="btn text-light"
                style={{ backgroundColor: "#388087" }}
                onClick={()=> navigate('/myaccount/qualification-info')}
          >
            Add Qualification
          </button>
          <button
                type="button"
                className="btn"
                style={{ marginLeft: "1rem", backgroundColor: " #C2EDCE" }}
                disabled
          >
            View Qualifications
          </button>
        </div>
           {
             qualifications.length > 0 ? (
                <div style={{marginBottom: '10rem'}}>
                    {
                        qualifications.map(item => (
                            <div key={item.qualification_id}  className="row">
                                <div className="col-8">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                           <h2>{item.qualification_status}</h2>
                                        </div>
                                        <div className="card-body text-dark">
                                            <h5>Certificate: {item.qualification_type}</h5>
                                            <h5>Institution: {item.institution_name}</h5>
                                            <h5>Faculty: {item.study_field}</h5>
                                            <h5>Course: {item.study_type}</h5>
                                            <h5>From  {item.starting_date.substring(0,10) } To  {item.ending_date.substring(0,10)}</h5>
                                            <div className="d-flex">
                                            <button className="btn btn-info text-light" style={{marginRight: '1.5rem'}}  onClick={()=> update(item.qualification_id)}>
                                                Update
                                            </button>
                                                <RemoveQualification qualificationId={item.qualification_id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
         
                </div>    
             ): (
                <div className="d-flex justify-content-center mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h4>Your Qualification List is Empty</h4>
                        </div>
                        <div className="card-body">
                            <FontAwesomeIcon icon={faGraduationCap} style={{fontSize: '10rem',marginLeft: '4rem'}} />
                        </div>  
                            <button className="submitBtn" onClick={()=> navigate('/myaccount/qualification-info')}>Add Qualification</button>
                    </div>
                </div>
             )
           }
        </div>
        </div>
    )
    
}