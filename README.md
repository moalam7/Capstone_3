# Twitter Frontend Clone

This is a frontend clone of Twitter, designed to interact with the MicroblogLite API. The project includes features like user authentication, profile management, post creation, deletion, and real-time post updates.

## Table of Contents

- [Features](#features)
- [Pages](#pages)
  - [Index](#index)
  - [Login](#login)
  - [Register](#register)
  - [Posts](#posts)
  - [Profile](#profile)
  - [Edit Profile](#edit-profile)
- [JavaScript Files](#javascript-files)
  - [auth.js](#authjs)
- [Setup](#setup)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- User authentication (login, register, logout)
- Profile management (view and edit profile)
- Real-time post creation and deletion
- Display list of posts from other users

## Pages

### Index

The index page serves as the landing page for the application. It provides options to log in or register.
![Index](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/index.PNG "Index")

### Login

The `login.html` page allows users to log in to their accounts. It interacts with the MicroblogLite API to authenticate users, create user sessions, edit user information, and log out users.
![Login](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/login.PNG "Login")

### Register

The `register.html` page enables new users to create an account by interacting with the MicroblogLite API.
![Register](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/register.PNG "Register")

### Posts

The `posts.html` page is the main interface for interacting with posts. Users can create new posts, view their posts in real-time, and delete their posts. Additionally, it displays a list of posts from other users.
![Posts](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/posts.PNG "Posts")

### Profile

The `profile.html` page displays the user's profile information.
![Profile](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/profile.PNG "Profile")

### Edit Profile

The `edit-profile.html` page allows users to update their profile information.
![Edit Profile](https://github.com/moalam7/Capstone_3/blob/main/microblog/pictures/README_images/editprofile.PNG "Edit Profile")

## JavaScript Files

### auth.js

The `auth.js` file contains all security-related functions, including user authentication, session management, and validation.

## Dependencies

- Bootstrap - For responsive layout and styling.
- jQuery - For DOM manipulation.
- MicroblogLite API - Backend API for user and post management. [_MicroblogLite_ API docs](http://microbloglite.us-east-2.elasticbeanstalk.com/)
