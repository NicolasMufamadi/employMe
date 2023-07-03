import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getUser, setUser } from "../../../../store/slices/userSlice";

export default function UpdateGender() {

    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [gender,setGender] = useState(user.gender);

    const updateGender = async() => {
        
        const request = await fetch('http://localhost:4444/user/'+user.user_id,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({gender})
        });

        const response = await request.json();

        if(response.user_id){
            dispatch(setUser(response))
            navigate('/personal-details');
        }

       
    }


    return(
        <div>
            <FontAwesomeIcon className="mt-2" icon={faCircleArrowLeft} size="lg" style={{marginLeft: 8}} onClick={()=> navigate('/personal-details')} />
        <div className="container">
            <h3 className="mt-3">Update Gender Status</h3>
            <div>
                <label className="label">Gender</label>
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg exampe" onChange={(e)=> setGender(e.target.value)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
            </div> 
            <button className="submitBtn" onClick={updateGender}>
                Submit
            </button>
        </div>
        </div>
    )

}