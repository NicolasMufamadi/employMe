import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { getUser } from "../../../../store/slices/userSlice";
import config from "../../../../config";

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
        
        console.log(id);
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
                                    
                                            <h5>Institution: {item.institution_name}</h5>
                                            <h5>Faculty: {item.study_field}</h5>
                                            <h5>Certificate: {item.study_type}</h5>
                                            <h5>From  {item.starting_date.substring(0,10) } To  {item.ending_date.substring(0,10)}</h5>
                                            <button className="btn btn-info text-light"  onClick={()=> update(item.qualification_id)}>
                                                Update
                                            </button>
                                            <button className="btn btn-danger text-light" style={{marginLeft: "1rem"}}>
                                                delete
                                            </button>
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