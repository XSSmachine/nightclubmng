import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./NoPage";
import "./signup.css";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [, setToken] = useContext(UserContext);

 const submitRegistration = () => {
  const userData = {
    username: name,
    email: email,
    password: password
  };

  axios
    .post('http://localhost:8000/signup/users', userData)
    .then(response => {
      // Registration successful
      console.log(response.data);
      localStorage.setItem('token', response.data.access_token); // Update the token in the UserContext
               localStorage.getItem('token');
               console.log(localStorage); // Update the token in the UserContext
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
};


  // const submitRegistration = async () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username: name, email: email, hashed_password: password }),
  //   };
  //
  //   const response = await fetch("/signup/users", requestOptions);
  //   const data = await response.json();
  //
  //   if (!response.ok) {
  //     setErrorMessage(data.detail);
  //   } else {
  //     setToken(data.access_token);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that the passwords match and are greater than 5 characters"
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="title has-text-centered">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email Address</label>
            <div className="control">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

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
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                type="password"
                placeholder="Enter password"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>
          {/*<ErrorMessage message={errorMessage} />*/}
          <br />
          <button className="button is-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
