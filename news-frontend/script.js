const API_URL = 'http://localhost:8000/articles/';

$(document).ready(function () {
    loadArticles();

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

    // Add new article
    $('#article-form').on('submit', function (e) {
        e.preventDefault();
        const title = $('#article-title').val();
        const fullText = $('#article-full-text').val();

        $.ajax({
            url: API_URL,
            method: 'POST',
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
});
