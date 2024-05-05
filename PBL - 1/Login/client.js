// Add event listener for the click event on the login button
loginButton.addEventListener('click', async function () {
    // Make a POST request to the login API
    const response = await fetch('/login', {
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
        // Extract the token from the response
        const data = await response.json();
        const token = data.token;

        // Store the token securely (e.g., in local storage)
        localStorage.setItem('token', token);

        // Redirect to the index.html page
        window.location.href = '../../Home/index.html';
    } else {
        // Handle invalid login credentials
        alert('Invalid email or password');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if the token is present in local storage
    const token = localStorage.getItem('token');

    // If the token is present, redirect to index.html
    if (token) {
        window.location.href = '../../Home/index.html';
    }
});
