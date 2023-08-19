

import { Alert, IconButton, Snackbar } from '@mui/material';
import React from 'react'

const SnackBarPopup = ({title, OnSB = false, OnClose }) => {

    const [open, setOpen] = React.useState(OnSB);
 
    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setOpen(false);
    };
 
    const handleClickEvent = () => {
        setOpen(true);
    };
  return (
    <Snackbar open={OnSB} autoHideDuration={6000} onClose={OnClose}>
        <Alert onClose={OnClose} severity="error" sx={{ width: '250px' }}>
          {title}
        </Alert>
      </Snackbar>
    // <Snackbar
    //         anchorOrigin={{
    //             horizontal: "left",
    //             vertical: "bottom",
    //         }}
            
    //         open={OnSB}
    //         autoHideDuration={1000}
           
    //         onClose={OnClose}
    //         action={
    //             <Alert onClose={OnClose} severity="success" sx={{ width: '100%' }}>
    //            title
    //           </Alert>
    //         }
    //     />
  )
}

export default SnackBarPopup