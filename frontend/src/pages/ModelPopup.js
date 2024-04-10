import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

const ModelPopup = () => {

    const [open, openChange] = useState(false);

    const functionPopup = () => {
        openChange(true);
    }

    const closepopup = () => {
        openChange(false);
    }
    return (
        <div>
            <Button onClick={functionPopup}>Open popup</Button>
            <Dialog open={open} fullWidth maxWidth="xl">
                <DialogTitle>User Screen</DialogTitle>
                <DialogContent>
                    <DialogContentText>This screen sjdjdj</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closepopup}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModelPopup
