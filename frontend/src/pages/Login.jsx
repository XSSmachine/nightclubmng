import React, { useContext, useState } from "react";
// import { UserContext } from "../context/UserContext";
import ErrorMessage from "./NoPage";
import "./signup.css";
import axios from "axios";
const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // const [, setToken] = useContext(UserContext);

     const submitLogin = async () => {

       const userData = `grant_type=&username=${name}&password=${password}&scope=&client_id=&client_secret=`;

       axios
           .post('http://localhost:8000/login', userData)
           .then(response => {
             // Registration successful
                localStorage.setItem('token', response.data.access_token); // Update the token in the UserContext
               localStorage.getItem('token');
               console.log(localStorage);
           })
           .catch(error => {
             // Registration failed
             if (error.response) {
               // The request was made and the server responded with an error status code
               const errorMessage = error.response.data.detail;
               setErrorMessage(errorMessage);
             } else if (error.request) {
               // The request was made but no response was received
               console.log(error.request);
             } else {
               // Something happened in setting up the request that triggered an Error
               console.log('Error', error.message);
             }
           });
     }

     const openProfile = async () => {

     }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

    return (
        <div className="signup-container">
      <div className="signup-form">
        <h1 className="title has-text-centered">Login</h1>
        <form onSubmit={handleSubmit}>



          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          {/*<ErrorMessage message={errorMessage} />*/}
          <br />
          <button className="button is-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
    )
}
export default Login;
