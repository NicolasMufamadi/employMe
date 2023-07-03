import { useState } from "react";
import {useSelector ,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getUser, setUser } from "../../../../store/slices/userSlice"

export default function UpdateName() {

    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [first_name,setFirstName] = useState(user.first_name);
    const [middle_name,setMiddleName] = useState(user.middle_name);
    const [last_name,setLastName] = useState(user.last_name); 

    const update = async() => {
        
        const response = await fetch('http://localhost:4444/user/'+user.user_id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
            })})

        const data = await response.json();
        dispatch(setUser(data)); 
        navigate('/personal-details'); 
      }

    return (
            <div>
                <FontAwesomeIcon className="mt-2" icon={faCircleArrowLeft} size="lg" style={{marginLeft: 8}} onClick={()=> navigate('/personal-details')} />
        <div className="container">
            <h3 className="mt-3">Make Your Changes</h3>
            <div className="mt-3">
                <div className="form-group">
                    <label className="label">First Name</label>
                    <div className="row">
                        <input className="input" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="label">Middle Name</label>
                <div className="row">
                    <input className="input" value={middle_name} onChange={(e)=>setMiddleName(e.target.value) }/>
                </div>
            </div>

            <div className="form-group">
                <label className="label">Last Name</label>
                <div className="row">
                    <input className="input" value={last_name} onChange={(e)=> setLastName(e.target.value)} />
                </div>
            </div>
            <div className="">
                <button className="submitBtn" onClick={update}>Submit</button>
            </div>
        </div>
        </div>
    )

}