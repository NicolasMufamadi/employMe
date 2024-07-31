import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import IconButton  from '@mui/material/IconButton';



export default function MyAccount(){

    const navigate = useNavigate();

    return(
       <Container>
           <div style={{marginTop: '100px',display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
               <Box 
                   height={200}
                   width={200}
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
                        <PersonIcon  sx={{fontSize: 200,color: '#fff'}}/>
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Profile</p>
                </div>
               </Box> 
               <Box 
                   height={200}
                   width={200}
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
                        <HomeIcon  sx={{fontSize: 200,color: '#fff'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Address</p>
                </div>
               </Box> 
               <Box 
                   height={200}
                   width={200}
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
                    <IconButton onClick={() => navigate("/myaccount/view-education")}>
                        <SchoolIcon  sx={{fontSize: 200,color: '#fff'}} />
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Education</p>
                </div>
               </Box> 
           </div>
       </Container>
    )

}