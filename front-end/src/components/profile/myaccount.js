import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SchoolIcon from '@mui/icons-material/School';
import IconButton  from '@mui/material/IconButton';



export default function MyAccount(){

    return(
       <Container>
           <div style={{marginTop: '50px',display: 'flex', alignItems: 'center',justifyContent: 'center'}}>
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
                    <IconButton>
                        <PersonIcon  sx={{fontSize: 200,color: '#fff'}} On/>
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
                    <IconButton>
                        <MyLocationIcon  sx={{fontSize: 200,color: '#fff'}} On/>
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
                    <IconButton>
                        <SchoolIcon  sx={{fontSize: 200,color: '#fff'}} On/>
                    </IconButton>
                    <p style={{fontWeight: 'bold'}}>Education</p>
                </div>
               </Box> 
           </div>
       </Container>
    )

}