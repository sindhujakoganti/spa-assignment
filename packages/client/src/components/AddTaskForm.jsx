import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field, FieldArray } from 'formik';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { useStyles } from "./styles";
import TextField from '@material-ui/core/TextField';

export const FormDialog = ({ taskName ,handlePopUpOpen , myChangeHandler, handleClose, handleTaskChangeClick, open })  => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePopUpOpen}>
        + New Task
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
        <AddSingleTaskForm 
        taskName={taskName} 
        handleClose={handleClose}
        myChangeHandler={myChangeHandler}
        handleSubmit={handleTaskChangeClick}
        />
        </DialogContent>
      </Dialog>
    </div>
  );
}


const AddSingleTaskForm = ({taskName, handleClose,  myChangeHandler, handleSubmit}) => {
    const classes = useStyles()
    return (
      <Grid>
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
        id="filled-basic"
        label="Task Name" 
        variant="filled"
        type='text'
        name="taskName"
        value={taskName}
        onChange={(event)=> myChangeHandler(event)}
        />
       <CardActions>
          <Button type="button" variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>      
          <Button type="submit" variant="contained" color="primary">Save</Button>      
       </CardActions>
      </form>
      </Card>
      </Grid>
    )
}



// export const TaskFormList = ({taskNames, handleTaskChangeClick, handleDialogBox}) => (
//   <div>
//     <Formik
//       initialValues={{ taskNames }}
//       onSubmit={(event,values) =>
//           handleTaskChangeClick(event,values)
//       }
//       render={({ values }) => (
//         <Form>
//           <FieldArray
//             name="taskNames"
//             render={arrayHelpers => (
//               <div>
//                 {values.taskNames && values.taskNames.length > 0 ? (
//                   values.taskNames.map((taskName, index) => (
//                     <div key={index}>
//                       <Field name={`taskName.${index}`} />
//                       <Button
//                         type="button"
//                         onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                       >
//                         -
//                       </Button>
//                       <Button
//                         type="button"
//                         onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
//                       >
//                         +
//                       </Button>
//                     </div>
//                   ))
//                 ) : (
//                   <Button type="button" onClick={() => arrayHelpers.push('')}>
//                     New Task
//                   </Button>
//                 )}
//                   <DialogActions>
//           <Button onClick={handleDialogBox} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleTaskChangeClick} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//               </div>
//             )}
//           />
//         </Form>
//       )}
//     />
//   </div>
// );