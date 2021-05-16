import React, {useState} from 'react';
// import * as axios from 'axios'
import LoginForm from '../components/loginForm'
// import { useHistory } from "react-router-dom";
// import {useAppContext} from './authContextFile'

//   const url = `http://localhost:9000`
  

class Login extends React.Component {
   // let history = useHistory();

   constructor(props) {
    super(props);
    this.state = {user: {id: "", name: ""}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


    // const {  userHasAuthenticated } = useAppContext();

    handleSubmit = (obj) => {
    obj.event.preventDefault();
       console.log(obj.values);
        setTimeout(() => {
            this.setState({
                user: {
                 ...obj.values
                }
            })
          obj.setSubmitting(false);
        }, 400);
      };
     
    // const signIn = async (values) => {
    //     // event.preventDefault();

    //     let userName = values.userName
    //     let id = values.id

    //     const headers = {
    //         'Content-Type': 'application/json'          }

    //       const data = {
    //         name: userName,
    //         id,
    //       }
          
    //     await axios.post(`${url}/login`, data, {
    //           headers: headers
    //         })
    //         .then((response) => {
    //             userHasAuthenticated(true);
    //             setUser({
    //             userName: response.data[0].name,
    //             id: response.data[0].id,
    //             accessToken: response.data[0].accessToken
    //         })
    //         history.push('/home');
    //         })
    //         .catch((error) => {
    //             userHasAuthenticated(false);
    //             history.pushState('/login');
    //           console.log(error);
    //         })
  
    // }

    render(){
      return (
        <div>
              <h3>Login</h3>
                <LoginForm user={this.state.user} handleSubmit={this.handleSubmit} />
        </div>
      ) 
    }   
}

    export default Login;