import {  ListItem, 
          ListItemButton, 
          Container , 
          Grid ,
          List, 
          Divider, 
          ListItemText, 
          Typography, 
          CardHeader,
          Card, 
          CardContent,
          Chip
        } from "@mui/material"
import { Children, useEffect, useState } from "react"

export default function Quotes() {

    const categories = ['attitude','best','change','courage','dreams',,'failure','faith','fear','god','learning','life','success']
    const [quote,setQuote] = useState({});

    useEffect(() => {
        const getQuote = async() => {
            try {
                const request = await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",{
                    method: 'GET',
                    headers: {
                        'X-Api-Key': process.env.REACT_APP_API_KEY,
                        "Content-Type": 'application/json'
                    }
                })
                if(request.status === 200){
                    const response = await request.json();
                    setQuote(response[0])
                }
            } catch (error) {
                console.error(error)
            }
        }
        getQuote()
    },[])

    const requestQuote = async(category) => {
        try {
            const request = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`,{
                    method: 'GET',
                    headers: {
                        'X-Api-Key': process.env.REACT_APP_API_KEY,
                        "Content-Type": 'application/json'
                    }
                })
            if(request.status === 200){
                const response = await request.json();
                setQuote(response[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Container style={{marginTop: '30px'}}>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <List>
                    <Typography variant="h5">Quotes Categories</Typography>
                        {
                            categories.map((category) => (
                                <div  key={category}>
                                <ListItem>
                                    <ListItemButton onClick={() => requestQuote(category)}>
                                        <ListItemText>{category}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                                </div>
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs={9} marginTop={"10rem"}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" style={{textAlign: 'center'}}>
                                Quote
                            </Typography>
                            <Divider/>
                            <Typography style={{marginTop: '20px',marginBottom:'20px',textAlign: 'center',fontWeight: 'bold'}}>"{quote.quote}"</Typography>
                            <Divider />
                            <div style={{display: 'flex',justifyContent: 'center'}}>
                                <Typography style={{textAlign: 'center',fontWeight: 'bold',marginTop: '10px'}}>~{quote.author}  </Typography>
                                <Chip label={quote.category} style={{marginTop: '5px',marginLeft: '10px'}} color="success"/>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}