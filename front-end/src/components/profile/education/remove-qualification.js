import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axiosBaseUrl from '../../../config/base.url';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function RemoveQualification({ handleOpen, handleClose, id }){


    const handleRemoveQualification = async() => {
        
        try {
            const request = await axiosBaseUrl.delete(`/qualification/${id}`);
            console.log(request);
            if(request.status === 200){
                handleClose();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }

    }

    return(
        <Dialog
            open={handleOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
          <DialogTitle style={{textAlign: 'center',fontWeight: 'bold'}}>Confirm your actions</DialogTitle>
          <DialogContent>
            <DialogContentText style={{textAlign: 'center',fontWeight: 'bold'}}>
                Are you sure you want to remove this qualification?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
               variant='contained'
               style={{backgroundColor: '#3AAFA9'}}
               onClick={handleClose}
            >
                Cancel
            </Button>
            <Button
                variant='contained'
                color='error'
                onClick={handleRemoveQualification}
            >
                Delete
            </Button>
          </DialogActions>
        </Dialog>
    )
}