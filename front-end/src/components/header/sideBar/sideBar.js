import { React, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import { Link } from 'react-router-dom';

const SideBar = ({role}) => {

   const [sideBar,setSideBar] = useState(false);

   const controlSideBar = () => setSideBar(!sideBar)

   const SetSideBarButton = () => {
        if(sideBar){
            return <FontAwesomeIcon icon={faXmark} className='icon'  onClick={() => controlSideBar()} />
        }else{
            return <FontAwesomeIcon icon={faBars} className='icon' onClick={() => controlSideBar()} />
        }

   }

   
   
   return(
        <div>
            {
                role === "Admin" ? (
                    <SetSideBarButton  /> 
                ):
                <></>
            }
            <Link className='navbar-brand' style={{ color: '#388087', margin: '10px' }} to='/'>employMe</Link>
        </div>
   )
   
}

export default SideBar;