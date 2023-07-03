import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getUser, setUser } from "../../../../store/slices/userSlice"

export default function UpdateContacts() {
    
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [newContact,setNewContact] = useState(user.number_phone);
    const [telephone,setNewTelephone] = useState(user.telephone);

    /*
    const validateNumbers = () {
        
    }
    */
    const updateContacts = async() => {
        const request = await fetch('http://localhost:4444/user/'+user.user_id,{
            method: "PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({telephone: telephone,number_phone: newContact})
        })

        const response = await request.json();
        console.log(response);

        if(response.user_id){
            
            dispatch(setUser(response));
            navigate('/personal-details');

        }

    }
    
    return(
        <div>
            <FontAwesomeIcon className="mt-2" icon={faCircleArrowLeft} size="lg" style={{marginLeft: 8}} onClick={()=> navigate('/personal-details')} />
        <div className="container">
            <h1 className="mt-3">Update Contact Numbers</h1>
            <label className="label mt-3">Cell Phone</label>
                <div className="row">
                    <input className="input" value={newContact} onChange={(e)=> setNewContact(e.target.value)}/>
                </div>
                <label className="label">Telephone</label>
                <div className="row">
                    <input className="input"  value={telephone} onChange={(e)=> setNewTelephone(e.target.value)}/>
                </div>
                <div>
                    <button className="submitBtn" onClick={() => updateContacts() }>
                        Submit
                    </button>
                </div>
        </div>
        </div>
    )

}