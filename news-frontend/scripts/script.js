const API_URL = 'http://localhost:8000/articles/';
const accessToken = localStorage.getItem('access_token');

// Load all articles
function loadArticles() {
    $.get(API_URL, function (data) {
        $('#articles').empty();
        data.forEach(article => {
            $('#articles').append(`
                <li data-id="${article.id}">
                    <strong>${article.title}</strong>
            
                    <p>${article.full_text}</p>
                    <button class="edit-article">Edit</button>
                </li>
            `);
        });
    });
}

// Function to check if user is logged in (token exists)
function checkLoginStatus() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        // User is logged in, enable CRUD buttons
        $('#auth-status').text('Logged in');
        $('#post-button, #put-button, #delete-button').prop('disabled', false);
        $('#login-button').hide();
        $('#logout-button').show();
    } else {
        // User is not logged in, disable CRUD buttons
        $('#auth-status').text('Not logged in');
        $('#post-button, #put-button, #delete-button').prop('disabled', true);
        $('#login-button').show();
        $('#logout-button').hide();
    }
}

$(document).ready(function () {
    loadArticles();
    checkLoginStatus();

    // Add new article
    $('#article-form').on('submit', function (e) {
        e.preventDefault();
        const title = $('#article-title').val();
        const fullText = $('#article-full-text').val();

        $.ajax({
            url: API_URL,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify({ title, full_text: fullText }),
            success: function () {
                loadArticles();
                $('#article-form')[0].reset();
            },
            error: function () {
                $('.error').text('Error adding article.');
            }
        });
    });

    // Edit article - populate form
    $('#articles').on('click', '.edit-article', function () {
        const articleId = $(this).parent().data('id');
        $.get(`${API_URL}${articleId}/`, function (article) {
            $('#article-id').val(article.id);
            $('#article-title').val(article.title);
            $('#article-full-text').val(article.full_text);
        });
    });

    // Update article
    $('.update').on('click', function () {
        const articleId = $('#article-id').val();
        const title = $('#article-title').val();
        const fullText = $('#article-full-text').val();

        if (!articleId) {
            $('.error').text('Please select an article to update.');
            return;
        }

        $.ajax({
            url: `${API_URL}${articleId}/`,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify({ title, full_text: fullText }),
            success: function () {
                loadArticles();
                $('#article-form')[0].reset();
                $('.error').text('');
            },
            error: function () {
                $('.error').text('Error updating article.');
            }
        });
    });

    // Delete article
    $('.delete').on('click', function () {
        const articleId = $('#article-id').val();

        if (!articleId) {
            $('.error').text('Please select an article to delete.');
            return;
        }

        $.ajax({
            url: `${API_URL}${articleId}/`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function () {
                loadArticles();
                $('#article-form')[0].reset();
                $('.error').text('');
            },
            error: function () {
                $('.error').text('Error deleting article.');
            }
        });
    });

    $('#login-button').on('click', function () {
        window.location.href = 'login.html'; // Adjust to your login page URL
    });

    $('#logout-button').on('click', function () {
        // Remove tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Optionally, you can display a message (or simply redirect)
        alert('You have been logged out!');

        $('#login-button').show();
        $('#logout-button').hide();
        // Redirect back to login page
        // window.location.href = 'login.html'; // Adjust to your login page URL
    });
});
