import React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {useStyles} from '../components/styles'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import TaskTable from "./TaskList";
import axios from "axios";
import {useAuth} from '../App'
import {useHistory, useLocation} from 'react-router-dom';
import {FormDialog} from "./AddTaskForm";
import { withRouter } from "react-router-dom";
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Card';
import PieChart from './pieChart';
import { GridListTileBar, TextField } from '@material-ui/core';



const HeaderComponent = ({handleLogOutClick}) => {
 const classes = useStyles();

 return (
   <div class={classes.root}>
    <AppBar position="static">
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
              <Grid item xs={6}>
              <Avatar alt="Travis Howard" src="/public/images/profile1.png" className={classes.large} />
              </Grid>
              <Grid item xs={6}>
               <Button color="inherit" onClick={(event) => handleLogOutClick(event)}>Log Out</Button>
              </Grid>
          </Grid>
        </Grid>
    </Grid>
    </AppBar>
    </div>
 )}

const TopComponent = ({tasks}) => {
    const classes = useStyles();
    const completedCount = tasks.filter(y => y.isCompleted === 1).length 
    const taskLength = tasks.length
    return (
        <div>
        <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            <br />
              <Grid item >
              <Card className={classes.card}>
                <h1>Tasks Completed</h1>
                <h3>{completedCount}/{taskLength}</h3>
              </Card>
              </Grid>
              <br />
              <Grid item >
              <Card className={classes.card}>
                <h1>last Created tasks </h1>
                {tasks.slice(taskLength -3,taskLength).map(obj => (
                    <ul>
                        <li>{obj.taskName}</li>
                    </ul>
                ))}
                </Card>
              </Grid>
              <br />
              <Grid item >
              <Card className={classes.card}>
              <PieChart 
              tasks={tasks}  completedCount= {completedCount}  />  
              </Card>
              </Grid>
          </Grid>
        </Grid>
        </Grid>
        </div>
    )
}



const MiddleComponent = ({search, open, taskName, handlePopUpClose, myChangeHandler,  handlePopUpOpen,  handleTaskChangeClick,  handleSearchClick }) => {
    const classes = useStyles();
    return (
      <div>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          <br />
            <Grid item >
            <Card className={classes.card}>
                <h3>Tasks</h3> 
          </Card>
          </Grid>
          <Grid item >
              <Card className={classes.card}>            
              <Button type="button" variant="outlined" color="primary" onClick={handleSearchClick}>
                <SearchIcon />
            </Button>
            <TextField
              id="filled-basic"
              label="Search" 
              variant="filled"
              type='text'
              name="search"
              value={search}
              placeholder="Search by task name"
              onChange={myChangeHandler}
            />
            </Card>
            </Grid>
            <FormDialog 
            taskName ={ taskName} 
            myChangeHandler={myChangeHandler}
            handleTaskChangeClick={handleTaskChangeClick} 
            open={open} 
            handleClose={handlePopUpClose}
            handlePopUpOpen={handlePopUpOpen}        />   
            </Grid> 
            </Grid>
        </div>
    )

     
}

const TaskList = ({tasks, myChangeHandler, handleEditSubmit, handleDeletePopUpOpen, handleDeleteSubmit, handlePopUpClose, deleteOpen,
editOpen, handleEditClick, handleSaveClick, taskId, taskName, handleCheckBoxChange 

}) => {
    return (
    <div style={{ height: 400, width: '100%' }}>
      {/* <DataGrid rows={rows} pageSize={5} columns={[{ field: 'name', editable: true }]}  checkboxSelection/> */}
      {/* <DataGrid  columns={columns}   /> */}
      <Grid item xs={12}>
          <TaskTable 
          tasks={tasks} 
          taskId={taskId}
          taskName={taskName}
          myChangeHandler={myChangeHandler} 
          handleEditSubmit={handleEditSubmit}
          handleDeletePopUpOpen={handleDeletePopUpOpen} 
          handleDeleteSubmit={handleDeleteSubmit}
          handlePopUpClose={handlePopUpClose}
          deleteOpen={deleteOpen}
          editOpen={editOpen}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick} 
          handleCheckBoxChange={handleCheckBoxChange}
          />
     </Grid>
    </div>
    )
}


var userToken = localStorage.getItem('userToken')
var userId = localStorage.getItem('userId')

var headers = {
  "content-type": "application/json",
  "x-access-token": userToken 
}

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: '', userToken: '', tasks: [],  open:false, taskName: '',
         deleteOpen: false, search : '', editOpen: false, taskId: 0,
        };
      }


  async componentDidMount(){
     userToken = localStorage.getItem('userToken')
     userId = localStorage.getItem('userId')

    headers = {
      "content-type": "application/json",
      "x-access-token": userToken 
    }

   await axios({
      method: 'get',
      url: 'http://localhost:9000/tasks',
      headers: headers
    }).then(res => {
      console.log(res.data);
            this.setState({
              ...this.state,
                tasks: res.data
            })
        }).catch(err => err)

  }
  
  handlePopUpOpen = () => {
    this.setState({...this.state, open: true})       
}

  handlePopUpClose = () => {
    this.setState({...this.state, open: false, deleteOpen: false, taskId: 0})
    };

 
   handleSearchbutton = async() => {
     try {
    const res = await axios({
      method: 'get',
      url: `http://localhost:9000/tasks`,
      params: {
        taskName:this.state.search,
      },
     headers: headers,
    })

    this.setState({
          ...this.state,
            tasks: res.data,
            search: '',
            taskName: ''
        })
   }
   catch(err){
     console.log(err);
   }
  }

    handleTaskChangeClick = async (event, values) => {
      event.preventDefault();

 

    const tasks = this.state.tasks
    const lastTaskId =  tasks.length > 0 ? this.state.tasks[this.state.tasks.length-1].taskId : 1
    
    try{
        await axios({
          method: 'post',
          url: 'http://localhost:9000/tasks',
          headers: headers,
          data: {
            userId , // need to get from localstorage dynamically 
            taskId: lastTaskId + 1,
            taskName: this.state.taskName,
            isCompleted: 0,
          }
        })

        const res = await axios({
          method: 'get',
          url: 'http://localhost:9000/tasks',
          headers: headers
        })

        this.setState({
                  ...this.state,
                    tasks: res.data,
                    open: !this.state.open,
                    taskName: ''
                })
    }
    catch(err){
      console.log(err);
    }
  }

    
   handleLogOutClick = (event) => {
    event.preventDefault();
    localStorage.clear();
    this.props.auth.signout(() => 
    this.props.history.push("/login")
    )

  }

    myChangeHandler = (event) => {
      event.preventDefault();
      this.setState({ ...this.state,  [event.target.name] : event.target.value});
    }

 

  handleEditSubmit = async(event, values) => {

    event.preventDefault();
    await axios({
      method: 'get',
      url: 'http://localhost:9000/tasks/:taskId/user/:userId',
      headers: headers,
      params:{
        taskId: values.taskId,
        userId
      },
      data: {
        taskName: values.taskName,
        isCompleted: values.isCompleted,
      }
    }).then(res => {
      console.log(res.data);
            this.setState({
              ...this.state,
                tasks: res.data,
                open: !this.state.open
            })
        }).catch(err => err)
  }

  handleDeleteSubmit= async(event, taskId) => {
    event.preventDefault();
    try{
    await axios({
      method: 'delete',
      url: `http://localhost:9000/tasks/${taskId}/user/${userId}`,
      headers: headers,
    });
    
    const res = await axios({
        method: 'get',
        url: 'http://localhost:9000/tasks',
        headers: headers
      })

    this.setState({
      ...this.state,
      tasks: res.data,
      deleteOpen: !this.state.deleteOpen,
      taskId: 0
    })

    }
    catch(err){
      console.log(err);
    }
    
    }


  handleDeletePopUpOpenClick = (event, taskId) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      deleteOpen: true,
      taskId
    })
  }

  handleEditClick = async(event, taskId, taskName) => {
    event.preventDefault();
  
      this.setState({
        ...this.state, 
        editOpen: true,
        taskId,
        taskName,
      })
 
  }

  handleEditSaveClick = async(event) => {
    event.preventDefault();
    try{
      await axios({
        method: 'put',
        url: `http://localhost:9000/tasks/${this.state.taskId}/user/${userId}`,
        headers: headers,
       data: {
         taskName: this.state.taskName,
       }
      });
      
      const res = await axios({
          method: 'get',
          url: 'http://localhost:9000/tasks',
          headers: headers
        })

        this.setState({
          ...this.state, 
          editOpen: false,
          tasks: res.data,
          taskId: 0,
          taskName: '',
        })
  
      }
      catch(err){
        console.log(err);
      }
  
  }

  handleCheckBoxChange= async (event, taskId, isCompleted) => {
    event.preventDefault();

    try{
      await axios({
        method: 'put',
        url: `http://localhost:9000/tasks/${taskId}/user/${userId}`,
        headers: headers,
        data: {
         isCompleted: !isCompleted === true ? 1 : 0
       }
      });
      
      const res = await axios({
          method: 'get',
          url: 'http://localhost:9000/tasks',
          headers: headers
        })

        this.setState({
          ...this.state, 
          editOpen: false,
          tasks: res.data,
          taskId: 0,
          taskName: '',
        })
  
      }
      catch(err){
        console.log(err);
      }
  
 
  }

  render(){
    return (
        <div>
        <HeaderComponent handleLogOutClick={this.handleLogOutClick}/>
     <Grid>
         <TopComponent tasks={this.state.tasks} />
     </Grid>
     <Grid>
         <MiddleComponent 
         search={this.state.search}
         taskName={this.state.taskName} 
         myChangeHandler={this.myChangeHandler} 
         handleTaskChangeClick={this.handleTaskChangeClick}  
         handleSearchClick={this.handleSearchbutton} 
         open={this.state.open} 
         handlePopUpClose={this.handlePopUpClose}
         handlePopUpOpen={this.handlePopUpOpen}
         
         />
         </Grid>
         <Grid>
         <TaskList tasks={this.state.tasks} 
          handleDeletePopUpOpen={this.handleDeletePopUpOpenClick}
          handleDeleteSubmit={this.handleDeleteSubmit}
          handlePopUpClose={this.handlePopUpClose}
          deleteOpen={this.state.deleteOpen}
          handleEditSubmit={this.handleEditSubmit} 
          myChangeHandler={this.myChangeHandler}
          editOpen={this.state.editOpen}
          handleEditClick={this.handleEditClick}
          handleSaveClick={this.handleEditSaveClick} 
          handleCheckBoxChange={this.handleCheckBoxChange}
          taskId={this.state.taskId}
          taskName={this.state.taskName}
          /> 
          </Grid>
     </div>
      )}
}

const DashboardData = withRouter(Dashboard);

export default DashboardData;


export const DashboardPage = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth(); 

  return (<DashboardData auth={auth} location={location} history={history}/>)
}