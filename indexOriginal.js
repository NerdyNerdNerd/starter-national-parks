
const submitHandler = (event) => {
    // Prevent default behavior of refreshing the page
    event.preventDefault();
    //log message to console to verify it submitted
    console.log("the form was submitted");
};

const main = () => {
// Get the form element
const form = document.querySelector("#park-form");

// attach the submit handler
form.addEventListener("submit", submitHandler);
};

window.addEventListener("DOMContentLoaded", main);