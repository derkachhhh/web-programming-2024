$(document).ready(function () {
    // Handle form submission
    $('#login-form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submit behavior

        const username = $('#username').val();
        const password = $('#password').val();

        // Send POST request to the Django REST JWT endpoint
        $.ajax({
            url: 'http://localhost:8000/api/token/', // Adjust the URL to match your Django app URL
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function (response) {
                // Save JWT tokens in localStorage
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);

                $('#login-status').text('Login successful! Redirecting...');
                // Redirect to another page after successful login
                window.location.href = 'index.html';  // Change to your desired URL or page
            },
            error: function (xhr, status, error) {
                $('#login-status').text('Login failed: ' + xhr.responseText);
                console.log('Error:', error);
            }
        });
    });
});