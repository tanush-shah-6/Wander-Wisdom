document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Add event listener for the form submission
    submitButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const firstname = firstnameInput.value;
        const lastname = lastnameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        // Make a POST request to the signup API
        try {
            const response = await fetch('http://localhost:8800/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                // Redirect to login.html if signup is successful
                window.location.href = './login.html';
            } else {
                // Display an error message if signup fails
                alert('Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
