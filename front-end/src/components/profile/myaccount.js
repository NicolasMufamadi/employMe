import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import IconButton  from '@mui/material/IconButton';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';

export default function MyAccount(){

    const navigate = useNavigate();

    return(
       <Container>
           <div style={{marginTop: '20px',display: 'flex',justifyContent: 'center'}}>
               <Box 
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#3AAFA9"

               >
                <div>
                    <IconButton onClick={() => navigate('/myaccount/manage-profile') }>
                        <PersonIcon  sx={{fontSize: 150,color: '#17252A'}}/>
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Profile</p>
                </div>
               </Box> 
               <Box 
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#3AAFA9"
                   
               >
                <div>
                    <IconButton onClick={() => navigate("/myaccount/manage-address")}>
                        <HomeIcon  sx={{fontSize: 150,color: '#17252A'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Address</p>
                </div>
               </Box> 
               <Box 
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#3AAFA9"
                   
               >
                <div>
                    <IconButton onClick={() => navigate("/myaccount/manage-education")}>
                        <SchoolIcon  sx={{fontSize: 150,color: '#17252A'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Qualification</p>
                </div>
               </Box> 
           </div>
           <div style={{display: 'flex',justifyContent: 'center'}}>
               <Box    
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#17252A"

               >
                <div>
                    <IconButton>
                        <PsychologyIcon  sx={{fontSize: 150,color: '#fff'}}/>
                    </IconButton>
                    <p style={{fontWeight: 'bold',color: '#fff'}}>Skills</p>
                </div>
               </Box> 
               <Box 
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#17252A"
                   
               >
                <div>
                    <IconButton>
                        <WorkIcon  sx={{fontSize: 150,color: '#fff'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold',color: '#fff'}}>Work Experience</p>
                </div>
               </Box> 
               <Box 
                   height={150}
                   width={150}
                   my={4}
                   mx={4}
                   gap={4}
                   p={4}
                   display='flex'
                   alignItems='center'
                   justifyContent='center'
                   textAlign='center'
                   bgcolor="#17252A"
                   
               >
                <div>
                    <IconButton>
                        <LanguageIcon  sx={{fontSize: 150,color: '#fff'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold',color: '#fff'}}>Online Accounts</p>
                </div>
               </Box> 
           </div>
       </Container>
    )

}