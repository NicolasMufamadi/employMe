import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getUser } from "../../../store/slices/userSlice";

const SideBar = () => {

    const user = useSelector(getUser);
    const [isAdmin,setIsAdmin] = useState(false);

   useEffect(()=>{
    
    if( user && user.userrole === "Admin"){
        setIsAdmin(true);
    }

   },[isAdmin])

   return(
        <div>
            {
                isAdmin ? (
                    <FontAwesomeIcon icon={faBars} className='icon' onClick={() => console.log('Hello React')} />
                ):
                <></>
            }
            <Link className='navbar-brand' style={{ color: '#388087', margin: '10px' }} to='/'>employMe</Link>
        </div>
   )
   
}

export default SideBar;