import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Link } from 'react-router-dom';

const SideBar = () => {
   return(
        <div>
            <FontAwesomeIcon icon={faBars} className='icon' onClick={() => console.log('Hello React')} />
            <Link className='navbar-brand' style={{ color: '#388087', margin: '10px' }} to='/'>employMe</Link>
        </div>
   )
   
}

export default SideBar;