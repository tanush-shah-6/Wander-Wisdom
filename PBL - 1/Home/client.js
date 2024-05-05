document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Add event listener for the click event on the login button
    loginButton.addEventListener('click', async function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Make a POST request to the login API
        const response = await fetch('http://localhost:8800/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            

            // Store the token securely (e.g., in local storage)
            localStorage.setItem('token', "user");

            window.location.href = './index.html';

        } else {
            // Handle invalid login credentials
            alert('Invalid email or password');
        }
    });

});

