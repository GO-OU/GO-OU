document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        // sending data to backend for auth
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert('Login successful!');
                    window.location.href = '/dashboard.html'; // TODO redirect to user dashboard
                } else {
                    alert('Login failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    });
});