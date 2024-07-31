import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Slide } from "@mui/material";
import axiosBaseUrl from '../../../config/base.url';

export default function DeleteAddress({ open, close, address }) {

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const removeAddress = async () => {
        try {
            const response =await axiosBaseUrl.delete(`/address/${address}`)
            if(response.data){
                close()
            }
        } catch (error) {
            console.log(error)
        }
 
    }
    
    return(
        <Dialog
            keepMounted
            TransitionComponent={Transition}
            open={open}
            onClose={close}
        >
            <DialogTitle style={{textAlign: 'center',fontWeight: 'bolder'}}>Confirm your action</DialogTitle>      
            <DialogContent>
                <DialogContentText id="text" style={{fontWeight: 'bold'}}>
                    Are you sure you want to remove this address?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    style={{backgroundColor: '#3AAFA9'}}
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button 
                    variant='contained'
                    color='error'
                    onClick={removeAddress}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}