import '../login/login.css';
import { useState } from 'react';
import  isEmail  from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfimPAssword] = useState('');
    
    const [emailErr,setEmailErr] = useState('');
    const [passwordErr,setPasswordErr] = useState('');
    const [confirmPasswordErr,setConfimPAsswordErr] = useState('');

    const navigate = useNavigate();

    const register = async (e) =>{
        
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        };
        
        if(validate()){
        try {
            
            const request = await fetch('http://localhost:4444/user/',requestOptions);
            const response = await request.json();
            console.log(response)
            if(response.err){
                setEmailErr(response.err);
            }else{
                navigate('/login');
            }

        } catch (error) {
            console.log(error)
        }

      }


    }

    function validate(){
        
        let valid = true;

        let passwordStrength = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");

        if(!isEmail(email)){
            setEmailErr('Enter a valid email address')
            valid = false;
        }else if(email === ''){
           setEmailErr('Email address required');
        }else{
            setEmailErr('');
        }

        if(confirmPassword !== password){
            setConfimPAsswordErr('passwords not matching');
            valid = false;
        }else{
            setConfimPAsswordErr('');
        }

        if(!passwordStrength.test(password)){
             setPasswordErr('At least 8 characters, 1 uppercase,1 lowercase, 1 digit & 1 special character');
             valid = false;
        }else{
            setPasswordErr('');
        }

        return valid;

    }

    return(
        <div className="d-flex justify-content-center">
             <div className='loginForm'>
                 <h1 className='header'>Register</h1>
             <form>
                <div className='form-group'>
                    <label className='label'>Email</label>
                    <input 
                            className='input' 
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {
                    emailErr ? (

                        <span style={{color: 'red'}}>{emailErr}</span>
                    ): <></>
                }
                <div className='form-group'>
                    <label className='label'>Password</label>
                    <input 
                            className='input' 
                            placeholder='Enter Pasword'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                    /> 
                </div>
                {
                    passwordErr ? (

                        <span style={{color: 'red'}}>{passwordErr}</span>
                    ): <></>
                }
                <div className='form-group'>
                    <label className='label'>Confirm password</label>
                    <input 
                            className='input'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e)=> setConfimPAssword(e.target.value)}
                    /> 
                </div>
                {
                    confirmPasswordErr ? (

                        <span style={{color: 'red'}}>{confirmPasswordErr}</span>
                    ): <></>
                }
                <div className='form-group'>
                    <button type='submit' className='submitBtn' onClick={register}>Register</button> 
                </div>
             </form>
             </div>
        </div>
    )
}