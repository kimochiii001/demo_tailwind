import React from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';


const SnackBarSuccess = ({title, OnSB = false, OnClose }) => {
  return (
    <Snackbar open={OnSB} autoHideDuration={6000} onClose={OnClose}>
        <Alert onClose={OnClose} severity="success" sx={{ width: '100%' }}>
         {title}
        </Alert>
      </Snackbar>
  )
}

export default SnackBarSuccess