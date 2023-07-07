import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../../../store/slices/userSlice"

export default function PersonalDetails() {

    const user = useSelector(getUser);
    const navigate = useNavigate();
   console.log(user)
    return (

        <div>
            <div className="container">
            <h3 className="mt-3">Personal Details</h3>
                <h5>Full Name</h5>
                <div className="card mb-3">
                    <div className="card-body text-dark">
                        <div className="d-flex">
                            <dt className="col-sm-9">{user.first_name} {user.middle_name} {user.last_name}</dt>
                            <button className="submitBtn d-flex justify-end" onClick={()=> navigate('/personal-details/update-names')}>Update</button>
                        </div>
                    </div>
                </div>
                <h5>Email</h5>
                <div className="card mb-3">
                    <div className="card-body text-dark">
                        <div className="d-flex">
                            <dt className="col-sm-9">{user.email}</dt>
                            <button className="submitBtn" onClick={()=> navigate('/personal-details/update-email')}>update</button>
                        </div>
                    </div>  
                </div>
                <h5>Cellphone Numbers</h5>
                <div className="card mb-3">
                    <div className="card-body text-dark">
                        <div className="d-flex">
                            <dt className="col-sm-9">{user.number_phone}</dt>
                            <button className="submitBtn" onClick={()=> navigate('/personal-details/update-numbers')}>update</button>
                        </div>
                    </div>  
                </div>
                <h5>Telephone Numbers</h5>
                <div className="card mb-3">
                    <div className="card-body text-dark">
                        <div className="d-flex">
                            <dt className="col-sm-9">{user.telephone}</dt>
                            <button className="submitBtn" onClick={()=> navigate('/personal-details/update-numbers')}>update</button>
                        </div>
                    </div>  
                </div>
                <h5>Gender</h5>
                <div className="card"  style={{marginBottom: '7rem'}}>
                    <div className="card-body text-dark">
                        <div className="d-flex">
                            <dt className="col-sm-9">{user.gender}</dt>
                            <button className="submitBtn" onClick={()=> navigate('/personal-details/update-gender')}>update</button>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )

}