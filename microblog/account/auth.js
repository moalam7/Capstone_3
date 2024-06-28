/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
// Backup server:   https://microbloglite.onrender.com

// You can use this function to get the login data of the logged-in user (if any). It returns either an object including the username and token, or an empty object if the visitor is not logged in.
function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

// You can use this function to see whether the current visitor is logged in. It returns either `true` or `false`.
function isLoggedIn() {
  const loginData = getLoginData();
  return Boolean(loginData.token);
}


function register(registerData) {
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
  };

  return fetch(apiBaseURL + "/api/users", options)
      .then((response) => response.json())
      .then((data) => {
          if (data.statusCode === 409) {
              throw new Error(`Username ${registerData.username} already exists.`);
          }
          console.log("User registered:", data);
          return data;
      });
}

function login(loginData) {
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
  };

  return fetch(apiBaseURL + "/auth/login", options)
      .then((response) => response.json())
      .then((loginData) => {
          window.localStorage.setItem("login-data", JSON.stringify(loginData));
          return loginData;
      });
}


// This is the `logout()` function you will use for any logout button which you may include in various pages in your app. Again, READ this function and you will probably want to re-use parts of it for other `fetch()` requests you may need to write.
function logout() {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the server for any API requests which require the user to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the browser side of logging out (below) even if there is an error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("../account/login.html"); // redirect back to landing page
    });
}

function createPost(postContent) {
  //To even make a post, must get authorization
  const loginData = getLoginData();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(postContent),
  };

  return fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Post created:", data);
      return data;
    });
}

function getPosts() {
  const loginData = getLoginData();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  return fetch(`${apiBaseURL}/api/posts?limit=100&offset=0&username=${loginData.username}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Posts retrieved:", data);
      return data;
    });
}

function getProfile() {
  const loginData = getLoginData();

  const options = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${loginData.token}`,
      },
  };

  return fetch(apiBaseURL + `/api/users/${loginData.username}`, options)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to fetch profile data");
          }
          return response.json();
      })
      .then((data) => {
          console.log("Profile data:", data); // Check console for fetched profile data
          return data;
      });
}

function getPostsList() {
  const postsListDiv = document.getElementById("postsList");

  fetch("https://jsonplaceholder.typicode.com/posts") // Replace with your actual API endpoint
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add(
          "card-header",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        const userName = document.createElement("span");
        userName.textContent = `User ${post.userId}`;

        const iconImg = document.createElement("img");
        iconImg.src = "../pictures/three-dots.svg";
        iconImg.classList.add("icon");
        iconImg.width = 12;
        iconImg.height = 12;

        cardHeader.appendChild(userName);
        cardHeader.appendChild(iconImg);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = post.title;

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = post.body;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        cardFooter.textContent = `Created at: ${new Date().toLocaleDateString()} | Likes: 0`;

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);

        postsListDiv.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}
