"use strict";

const registerForm = document.querySelector("#register");
const errorMessage = document.querySelector("#error-message");

registerForm.onsubmit = function (event) {
    event.preventDefault();

    const registerData = {
        username: registerForm.username.value,
        fullName: registerForm.fullName.value,
        password: registerForm.password.value,
    };

    if (registerData.password.length <= 6) {
        errorMessage.textContent = "Password must be more than 6 characters.";
        return;
    }

    registerForm.registerButton.disabled = true;
    errorMessage.textContent = ""; // Clear any previous error messages

    register(registerData)
        .then((data) => {
            if (data.statusCode === 409) {
                throw new Error(data.message);
            }
            // Automatically log in after successful registration
            return login({
                username: registerData.username,
                password: registerData.password,
            });
        })
        .then(() => {
            window.location.replace("../posts/posts.html");
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
            registerForm.registerButton.disabled = false;
        });
};
