import { useNavigate } from "react-router-dom";
import { CardContent,Card,Button } from "@mui/material"


export default function HandleEmptyArray({LinkIcon,link,message}){

    const navigate = useNavigate();

    return(
        <div style={{textAlign: 'center',marginTop: '2rem',display: 'flex',justifyContent: 'center'}}>
        <Card sx={{width: 500,height: 300}}>
            <CardContent>
                <div>
                    {LinkIcon}
                </div>
                <Button 
                    variant="filled"
                    style={{margin: '15px 0',color: '#fff',backgroundColor: '#3AAFA9'}}
                    onClick={() => navigate(link)}>
                    {message}
                </Button>
            </CardContent>
        </Card>   
    </div>
    )
}