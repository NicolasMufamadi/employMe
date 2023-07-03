import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import isEmail from "validator/lib/isEmail";

import { getUser, setUser } from "../../../../store/slices/userSlice"

export default function UpdateEmail() {

    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const updateEmail = async () => {

        if (email === confirmEmail) {

            const request = await fetch
                (
                    'http://localhost:4444/user/' + user.user_id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email })
                })
                const response = await request.json();
                console.log(response)
                if(response.user_id){
                    dispatch(setUser(response));
                    navigate('/personal-details');
                    navigate(0);
                   
                }else{
                    setEmailErr('Email already exists');
                }
            
            }else{
                setEmailErr('New email not matching Confirm email')
            }
    }

    const validateEmail = () => {
        if (!isEmail(email)) {
            setEmailErr('Please enter a valid new email');
        } else {
            setEmailErr('');
        }
    }

    return (
        <div>
            <FontAwesomeIcon className="mt-2" icon={faCircleArrowLeft} size="lg" style={{marginLeft: 8}} onClick={()=> navigate('/personal-details')} />
            <div className="container">
                <h1 className="mt-3">Update Email</h1>
                <div className="mt-5"></div>
                <label className="label">Email</label>
                <div className="row">
                    <input className="input" type='email' value={user.email} readOnly />
                </div>
                <label className="label">New Email</label>
                <div className="row">
                    <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button className="submitBtn mt-3" data-bs-toggle="modal" data-bs-target="#emailModal" onClick={validateEmail}>Submit</button>
            </div>
            <div className="modal" id="emailModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Email Changes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label className="label">Confirm Email</label>
                            <div className="row">
                                <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                                <p className="text-danger text-center">{emailErr}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn submitBtn" onClick={() => updateEmail()}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}