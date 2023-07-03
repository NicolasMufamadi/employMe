import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../../../store/slices/userSlice";

export default function UpdateAddressInformation() {

    const user = useSelector(getUser);
    const navigate = useNavigate();

    const [address, setAddress] = useState({});

    useEffect(() => {

        async function getAddress() {

            const request = await fetch('http://localhost:4444/address/' + user.user_id);
            const response = await request.json();
            setAddress(response);
        }

        getAddress();

    }, [address,user.user_id])


    const [streetNo, setStreetNo] = useState('');
    const [streetName, setStreetName] = useState('');
    const [optionalBuilding, setOptionalBuilding] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [zipCodeErr, setZipCodeErr] = useState('');
    const [streetNoErr, setStreetNoErr] = useState('');
    const [streetNameErr,setStreetNameErr] = useState('');
    const [cityErr,setCityErr] = useState('');
    const [suburbErr,setSuburbErr] = useState('');

    function validateInputs() {
        let valid = true;
        console.log('Validate')
        if (isNaN(streetNo)) {
            setStreetNoErr('Please enter a number');
            valid = false;
        }else if(streetNo === ''){
            setStreetNoErr('Required')
            valid = false;
        }else{
            setStreetNoErr('');
        }

        if(streetName === ''){
            setStreetNameErr('Required');
            valid = false; 
        }else{
            setStreetNameErr('');
        }
       
        if(city === ''){
            setCityErr('Required');
            valid = false;
        }else{
            setCityErr('');
        }

        if(suburb === ''){
            setSuburbErr('Required');
            valid = false;
        }else{
            setSuburbErr('');
        }

        if (isNaN(zipCode) || zipCode.length !== 4) {
            setZipCodeErr('Please enter a code of 4 digits');
            valid = false;
        }else if(zipCode === ''){
            setZipCodeErr('Required');
            valid = false;
        }else{
            setZipCodeErr('');
        //    valid = true;
        }

        return valid;

    }

    async function update(){
        
        if(validateInputs()){
        
        const request = await fetch('http://localhost:4444/address/'+address.address_id,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                street_name: streetName,
                feature: optionalBuilding,
                city: city,
                suburb: suburb,
                zip_code: zipCode
            })
        })

        const response = await request.json()
        console.log(response)
        if(response.rowCount > 0){
            navigate('/myaccount')
        }
    }

    }

    return (
        <div className="mt-5">
            <h2 className="text-center">Address Information</h2>
            <div className="d-flex justify-content-around">
                    <div className="card">
                        <div className="card-header">
                          <h3>Add New Address</h3> 
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <label className="label">Street Number</label>
                                    <input className="form-control input" value={streetNo} onChange={(e) => setStreetNo(e.target.value)} required/>
                                    <p className="text-danger">{streetNoErr}</p>
                                </div>
                                <div className="col-6">
                                    <label className="label">Street Name</label>
                                    <input className="form-control input" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
                                    <p className="text-danger">{streetNameErr}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label className="label">Complex/Busines Name(Optional)</label>
                                    <input className="form-control input" value={optionalBuilding} onChange={(e) => setOptionalBuilding(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label className="label">Province</label>
                                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                                        <option value="Eastern Cape">Eastern Cape</option>
                                        <option value="Free State">Free State</option>
                                        <option value="Gauteng">Gauteng</option>
                                        <option value="Kwazulu-Natal">Kwazulu-Natal</option>
                                        <option value="Limpopo">Limpopo</option>
                                        <option value="Mpumalanga">Mpumalanga</option>
                                        <option value="Northern Cape">Northern Cape</option>
                                        <option value="North West">North West</option>
                                        <option value="Western Cape">Western Cape</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="label">City</label>
                                    <input className="form-control input" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    <p className="text-danger">{cityErr}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label className="label">Suburb</label>
                                    <input className="form-control input" value={suburb} onChange={(e) => setSuburb(e.target.value)} required />
                                    <p className="text-danger">{suburbErr}</p>
                                </div>
                                <div className="col-6">
                                    <label className="label">Zip Code</label>
                                    <input className="form-control input" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                                    <p className="text-danger">{zipCodeErr}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="submitBtn mb-5" type="button" onClick={() => update()}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                
                <div className="card" style={{height: '25rem',width: '28rem'}}>
                    <div className="text-center card-header">
                        <h3>Current Address</h3> 
                    </div>
                    <div className="card-body text-dark">
                        <h5 className="fs-4">Street Name: {address.street_name}</h5>
                        <h5 className="fs-4">Complex/Business: {address.feature}</h5>
                        <h5 className="fs-4">Suburb: {address.suburb}</h5>
                        <h5 className="fs-4">City: {address.city}</h5>
                        <h5 className="fs-4">Area code: {address.zip_code}</h5>
                    </div>
                </div>
            </div>
        </div>
    )

}