import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUser, getUser, logout } from '../../store/slices/userSlice';
import SideBar from './sideBar/sideBar';
import config from '../../config';


export default function Header() {

  const [isEmployee,setEmployee] = useState(false);
  const [user,setUser] = useState(useSelector(getUser));
 
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    async function verifyIsLoggedIn(){
          const request = await fetch(`${config.baseURL.endPoint}/user/auth`,{headers: {'Authorization': 'Bearer '+ localStorage.getItem("token")} });
          const response = await request.json();    
          console.log(response)  
          if(response.err){
               logOut()
          }
    }
     
    verifyIsLoggedIn();

  },[])



  useEffect(()=>{
     console.log(user);
       if(user && user.userrole === "Employee"){
           setEmployee(true);
           dispatch(fetchUser(user.user_id))
       }

  },[user,dispatch])
  
  
    const logOut = () => {
      localStorage.clear();
      navigate('/login');
     // navigate(0);
      setUser(null);
      setEmployee(false);
    }


    return(
        <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <SideBar />
          <div className='d-flex'>
            {
              isEmployee ? (
                <>
                  <Link className='link'>My Applications</Link>
                  <Link className='link' to='myaccount'>My Account</Link>
                </>
              ): 
              <></>
            }
            <Link to='/about' className='link'>About</Link>
            <Link to='/quotes' className='link'>Quotes</Link>
            {
              user ? (
                <Link to='/login' className='link' onClick={()=>logOut()}>Logout</Link>
              ): (
                <Link to='/login' className='link'>Login</Link>
              )
              
            }
          </div>
        </div>
      </nav>
    )
}