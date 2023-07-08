import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';

import { getUser } from "../../../store/slices/userSlice"


export default function Profile() {

   let user = useSelector(getUser);
   const navigate = useNavigate();

    return(
       
            <div className="container mt-4">
            <h2>My Profile</h2>
                <div className="row align-items-center">
                    <div className="col-4">
                           <div className="card">
                               <div className="card-header">
                                    <h3 className="text-center"> Personal Details</h3>
                               </div>
                               <div className="card-body text-center">
                                    <FontAwesomeIcon icon={faUser} style={{fontSize: "12rem"}}/>
                               </div>
                           </div>
                           <div className="card-footer text-center">
                               <button type="button" className="btn submitBtn btn-lg" onClick={()=> navigate('/personal-details')}>
                                     Update Details
                               </button>
                           </div>
                           
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Address Information</h3> 
                            </div>
                            <div className="card-body text-center">
                                <FontAwesomeIcon icon={faLocationDot} style={{fontSize: "12rem"}} />
                            </div>
                            <div className="card-footer text-center">
                                <button type="button" className="btn submitBtn btn-lg" onClick={()=> navigate('/update-address')}>
                                    Update Address
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Qualifications Info</h3>
                            </div>
                        
                        <div className="card-body text-center">
                           <FontAwesomeIcon icon={faGraduationCap} style={{fontSize: "12rem"}} />
                        </div>
                        <div className="card-footer text-center">
                            <button type="button" className="btn submitBtn" onClick={()=> navigate('/myaccount/qualification-info')}>
                                Update Information
                            </button>

                        </div>
                    </div>
                </div>
                </div>
            </div>
      
    )

}