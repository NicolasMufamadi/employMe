import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import { getUser,logout } from '../../store/slices/userSlice';
import SideBar from './sideBar/sideBar';


export default function Header() {

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  console.log(user)
    return(
        <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <SideBar />
          <div className='d-flex'>
            <Link to='/about' className='link'>About</Link>
            <Link to='/quotes' className='link'>Quotes</Link>
            {
              user ? (
                <Link to='/login' className='link' onClick={()=>{dispatch(logout())}}>Logout</Link>
              ): (
                <Link to='/login' className='link'>Login</Link>
              )
              
            }
          </div>
        </div>
      </nav>
    )
}