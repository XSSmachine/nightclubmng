import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext('');

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("nightclubToken"));

  useEffect(() => {
  const fetchUser = async () => {
     const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

      axios
           .get('http://localhost:8000/users/me', requestOptions)
           .then(response => {
             // Registration successful
             localStorage.setItem('nightclubToken', response.data.access_token); // Update the token in the UserContext
               localStorage.getItem('nightclubToken');
               console.log(localStorage);
             // localStorage.setItem("nightclubToken", response.data.access_token); // Update the token in the UserContext


           })
           .catch(error => {
             // Registration failed
             if (error.response) {
               // The request was made and the server responded with an error status code
               setToken(null);
             } else if (error.request) {
               // The request was made but no response was received
               console.log(error.request);
             } else {
               // Something happened in setting up the request that triggered an Error
               console.log('Error', error.message);
             }
           });
  };
  fetchUser();
}, [token]); // Include localStorage in the dependency array


  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};