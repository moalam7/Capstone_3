/* login.js */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disable the button during the login process to prevent multiple submissions
  loginForm.querySelector("#loginButton").disabled = true;

  // Perform the login API request
  login(loginData)
    .then(response => {
      // On successful login, store the login data and redirect
      window.localStorage.setItem("login-data", JSON.stringify(response));
      window.location.replace("../posts/posts.html");
    })
    .catch(error => {
      console.error("Login failed:", error);
      // Handle login failure, enable the button again
      loginForm.querySelector("#loginButton").disabled = false;
      // Check if error has a specific message
      if (error.statusCode === 400 && error.message === "Invalid username or password") {
        alert("Login unsuccessful. Invalid username or password.");
      } else {
        alert("Login failed. Please try again later.");
      }
    });
});
