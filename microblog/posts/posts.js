"use strict";

// Ensure the user is logged in before allowing post creation
if (isLoggedIn() === false) {
  window.location.replace("../account/login.html");
}

const postForm = document.querySelector("#postForm");
const postsList = document.querySelector("#postsList");

postForm.onsubmit = function (event) {
  event.preventDefault();

  const postContent = {
    text: postForm.postText.value,
  };

  createPost(postContent).then((newPost) => {
    postForm.reset(); // Reset the form after submission
    appendPost(newPost); // Append the new post to the list
  });
};

function loadPosts() {
  getPosts().then((posts) => {
    postsList.innerHTML = "";
    posts.reverse().forEach((post) => {
      appendPost(post);
    });
  });
}

function appendPost(post) {
  // Ensure post has the expected structure
  const postText = post.text || "No text";
  const postCreatedAt = new Date(post.createdAt).toLocaleString();
  const postLikes = post.likes ? post.likes.length : 0;

  const postItem = document.createElement("tr");
  postItem.innerHTML = `
    <td>${postText}</td>
    <td>${postCreatedAt}</td>
    <td>${postLikes}</td>
  `;
  // Insert the new post at the beginning of the list
  if (postsList.firstChild) {
    postsList.insertBefore(postItem, postsList.firstChild);
  } else {
    postsList.appendChild(postItem);
  }
}

// Load posts when the page loads
loadPosts();
