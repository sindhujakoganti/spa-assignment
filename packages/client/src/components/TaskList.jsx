import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { DeleteDialog } from './DeletePopUp';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';



const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
});


function TaskTable({tasks, taskId, taskName, classes, handleCheckBoxChange, handleDeletePopUpOpen, handleDeleteSubmit, handlePopUpClose, deleteOpen,
  editOpen, handleEditClick, handleSaveClick,  myChangeHandler 


}) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          { tasks.length > 0 ? tasks.map((n, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row" className={classes.TableCell}>
                <Checkbox
                checked={n.isCompleted}
                onClick={(event) => handleCheckBoxChange(event, n.taskId, n.isCompleted)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                </TableCell>
                <TableCell numeric className={classes.tableCell}>{editOpen && n.taskId === taskId ?     
                <TextField
                id="filled-basic"
                label="Task Name" 
                variant="filled"
                type='text'
                name="taskName"
                value={taskName}
                onChange={(event)=> myChangeHandler(event)}/> : n.taskName}</TableCell>
                <TableCell numeric className={classes.tableCell}>
                {
                  editOpen && n.taskId === taskId ? 
                  <div className={classes.root}>
                    <Button onClick={(event) => handleSaveClick(event, n.taskId)} color="primary">Save</Button>
                  </div> : 
                      <div className={classes.root}>
                        <Button onClick={(event) =>  handleEditClick(event, n.taskId, n.taskName)} color="primary"><EditIcon /> </Button>
                      </div>
                }
                </TableCell>
                <TableCell numeric className={classes.tableCell}>
                <DeleteDialog 
                selectedTaskId={n.taskId}
                taskId={taskId}
                handlePopUpOpen={handleDeletePopUpOpen}  
                handleClose={handlePopUpClose}
                handleDeleteSubmit={handleDeleteSubmit}
                open = {deleteOpen}
                />  
                </TableCell>
              </TableRow>
            )
          }) : <h3>No Tasks </h3>}
        </TableBody>
      </Table>
    </Paper>
  );
}

TaskTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskTable);