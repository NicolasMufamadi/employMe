import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axiosBaseUrl from '../../../config/base.url';

export default function DeleteAddress({ open, handleClose, address }) {

    const removeAddress = async () => {
        try {
            const response =await axiosBaseUrl.delete(`/address/${address}`)
            if(response.data){
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
 
    }
    
    return(
        <Dialog
            open={open}
            onClose={handleClose}
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
                    onClick={handleClose}
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