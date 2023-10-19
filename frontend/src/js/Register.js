document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("registerUsername").value;
        let email = document.getElementById("registerEmail").value;
        let password = document.getElementById("registerPassword").value;

        // sending data to backend for registration
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert('Registration successful!');
                    window.location.href = '/login.html'; // redirect to login page
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    });
});