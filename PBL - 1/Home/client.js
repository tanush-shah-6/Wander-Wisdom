document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;

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
            
            localStorage.setItem('token', "user");
            alert("Login Successful!");
            window.location.href = './index.html';

        } else {
            alert('Invalid email or password!');
            window.location.href = './login.html';
        }
    });

});

