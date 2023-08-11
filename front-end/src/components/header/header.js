import styled from 'styled-components';
import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchUser, getUser } from '../../store/slices/userSlice';
import { IconContext } from 'react-icons/lib';
import { SideBarData } from './sideBar/sideBarData';
import SideMenu from './sideBar/sideMenu';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import config from '../../config';

const Nav = styled.div`
  background: #C2EDCE;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #388087;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0%' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const LogoWrap = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`;

const Links = styled.div`
  margin-left: 50%;
`;

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [sidebar, setSidebar] = useState(false);
  const [user,setUser] = useState(useSelector(getUser));
  const [userRole,setRole] = useState(null);
 
  const showSidebar = () => setSidebar(!sidebar);

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
    if(user && user.userrole === "Employee"){
      //  setEmployee(true);
         setRole("Employee")
         dispatch(fetchUser(user.user_id))
    }

    if(user && user.userrole === "Admin"){
       setRole("Admin")
    }

},[user,dispatch])


 const logOut = () => {
   localStorage.clear();
   navigate('/login');
   setUser(null);
   setRole(null);
 }

  return (
    <>
      <IconContext.Provider value={{ color: sidebar ? '#C2EDCE' : '#388087' }}>
        <Nav>
          {
            userRole === 'Admin' ? (
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
            ) : <></>
          }
          <LogoWrap>
            <Link style={{textDecoration: 'none',color: '#388087'}} to='/'>
              <h4 className='fw-bold'>EmployMe</h4>
            </Link>
          </LogoWrap>
          <Links>
          <div className='d-flex'>
            {
              userRole === "Employee" ? (
                <>
                  <Link className='link'to="/myapplications">My Applications</Link>
                  <Link className='link' to='myaccount'>My Account</Link>
                </>
              ): 
              <></>
            }
            <Link to='/about' className='link'>About</Link>
            <Link to='/quotes' className='link'>Quotes</Link>
            <Link to="/faqs" className='link'>FAQs</Link>
            {
              user ? (
                <Link to='/login' className='link' onClick={()=>logOut()}>Logout</Link>
              ): (
                <Link to='/login' className='link'>Login</Link>
              )
              
            }
          </div>
          </Links>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <h5 className='text-light text-center'>EmployMe Dashboard</h5>
            {
              SideBarData.map((item, index) => {
                  return <SideMenu item={item} key={index} isOpen={showSidebar} />
              })
            }
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Header;
