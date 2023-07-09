import './login.css';
import { useState } from "react";
import { Link,useNavigate,Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import { setUser } from '../../../store/slices/userSlice';

export default function Login() {
   
   const navigate = useNavigate();
   const dispatch = useDispatch();
  // const user = useSelector(getUser);

   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [emailErr,setEmailErr] = useState('');
   const [passwordErr,setPasswordErr] = useState('');
   

   async function login(e) {
      
      e.preventDefault();

      const requestOptions = {
         method: "POST",
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({email: email, password: password})
      };

      try {

         const request = await fetch('http://localhost:4444/user/login',requestOptions);
         const response = await request.json();
         // console.log(response)
         if(response.data){   
            localStorage.setItem("token",response.token);
            dispatch(setUser(response.data));
            navigate('/');
            navigate(0);
         }
         
         if(response.passwordErr){
            setPasswordErr(response.passwordErr);
         }else{
            setPasswordErr('')
         }
         
         if(response.emailErr) {
            setEmailErr(response.emailErr);
         }else{
            setEmailErr('')
         }

      } catch (error) {
         console.log(error);
      }

   }

   return(
      <div className='d-flex justify-content-center'>
         <div className='loginForm'>
              <h1 className='header text-center'>Login</h1>
              <form>
                  <div className='form-group'>
                     <label className='label'>Email address</label>
                     <input 
                             type='email' 
                             className='input' 
                             placeholder='Enter email'
                             value={email}
                             onChange={(e)=>setEmail(e.target.value)}
                     />
                  </div>
                  {
                     emailErr ? (
                        <span style={{color: 'red'}}>{emailErr}</span>
                     ) : <></>
                  }
                  
                  <div className='form-group'>
                     <label className='label'>Password</label>
                     <input 
                             type='password' 
                             className='input' 
                             placeholder='Enter Password'
                             value={password}
                             onChange={(e)=>setPassword(e.target.value)}
                     />
                  </div>
                  {
                     passwordErr ? (
                        <span style={{color:'red'}}>{passwordErr}</span>
                     ): <></>
                  }
                  <div className='form-group text-center'>
                     <button  className='submitBtn' onClick={login}>Login</button>
                  </div>
              </form>              
              <div className='text-center'>
                  <p>No account?
                     <Link to='/register'>register</Link>
                  </p>
              </div>
         </div>
      </div>
   )
}