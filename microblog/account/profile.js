"use strict";

window.onload = function () {
  getProfileData();
  document.querySelector("#logoutLink").addEventListener("click", function () {
    logout();
  });
};

async function getProfileData() {
  try {
    const profileData = await getProfile();
    displayProfile(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error.message);
  }
}

function displayProfile(profileData) {
  console.log("Displaying profile data:", profileData); // Check console for profile data passed to function
  document.querySelector('#fullName').textContent = profileData.fullName;
  document.querySelector('#username').textContent = profileData.username;
  document.querySelector('#bio').textContent = profileData.bio || 'No bio provided';
}
