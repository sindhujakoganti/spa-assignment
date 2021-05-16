import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from "./styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';


export const DeleteDialog = ({ selectedTaskId ,taskId , handlePopUpOpen,  handleClose, handleDeleteSubmit, open })  => {
    const classes = useStyles()

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={(event) => handlePopUpOpen(event,selectedTaskId)}>
        <DeleteIcon />
        </Button>
        <Dialog open={open && selectedTaskId === taskId} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Do you want to delete the Task?</DialogTitle>
          <DialogContent>
            <Grid>
                <Card className={classes.card}>
                        <CardActions>
                            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>NO</Button>      
                            <Button type="submit" variant="contained" color="primary" onClick={(event) =>
                              handleDeleteSubmit(event,taskId)}>YES</Button>      
                        </CardActions>
                    </Card>
            </Grid>
        </DialogContent>
        </Dialog>
      </div>
    );
  }