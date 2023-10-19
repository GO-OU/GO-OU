document.getElementById("registrationForm").addEventListener("submit",function(event) {
    event.preventDefault();

    let username = document.getElementById("registerUsername").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    console.log("User Registration Details:", username, email, password);
    // TODO: send this data to the backend, store in db, etc.
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    console.log("User Login Details:", email, password);
    // TODO authenticate user using backend, validate email/password
});