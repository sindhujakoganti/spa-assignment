import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {useHistory, useLocation } from 'react-router-dom';
import {useAuth} from '../App'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { useStyles } from "./styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const InnerForm = ({userName, userId, myChangeHandler, handleSubmit}) => {
  const classes = useStyles()
  return (
    <Grid>
    <Card className={classes.card}>
  <form className={classes.form} onSubmit={handleSubmit}>
    <p>User Name</p>
    <TextField
      id="filled-basic"
      label="User Name" 
      variant="filled"
      type='text'
      name="userName"
      value={userName}
      onChange={(event)=> myChangeHandler(event)}
    />
     <p>User Id</p>
    <TextField
    id="filled-basic"
    label="User Id"
    variant="filled"
    type='text'
    name="userId"
    value={userId}
    onChange={(event)=> myChangeHandler(event)}
    />
     <CardActions>
     <Button type="submit" variant="contained" color="primary">Submit</Button>      
   </CardActions>
  
    </form>
    </Card>
    </Grid>
  )
}


// const isAuthenticatedContext = React.createContext()

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {userName: '' , userId: ''}, isAuthenticated: false};
  }

  myChangeHandler = (event) => {
    this.setState({
      user: {...this.state.user, 
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmit = async(event) => {
     event.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
  }

    console.log(this.state);
    await axios.post(`http://localhost:9000/login`, {id: this.state.user.userId, name: this.state.user.userName}, {
        headers
      }).then(res => 
    { console.log(res) 
      localStorage.setItem('userToken', res.data.accessToken);
      localStorage.setItem('userId', JSON.stringify(res.data.id));

      let { from } = this.props.location.state || { from: { pathname: "/" } };
      // this.setState({...this.state, isAuthenticated : true});
      this.props.auth.signin(() => {
        this.props.history.replace(from);
      });
      // this.props.history.push('/home')
    }
    ).catch(err => err)
   }

  render() {
    return (
    <InnerForm 
    userName={this.state.user.userName} 
    userId={this.state.user.userId} 
    myChangeHandler={this.myChangeHandler} 
    handleSubmit={this.handleSubmit}/>
    );
  }
}

const MyLoginForm = withRouter(MyForm);

// export function useAuthObj() {
//   return React.useContext(isAuthenticatedContext)
// }

export default MyLoginForm;

export const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth(); 
  return (
  <MyLoginForm auth={auth} location={location} history={history}/>)
}
