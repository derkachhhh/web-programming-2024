
import pytest
from django.urls import reverse

from articles.models import Article


@pytest.mark.django_db
def test_get_article_list(api_client, user) -> None:
    Article.objects.create(owner=user, title='test-article', full_text='1234')
    response = api_client.get("/articles/", format="json")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0].get('title') == 'test-article'


@pytest.mark.django_db
def test_get_article_empty_list(api_client) -> None:
    response = api_client.get("/articles/", format="json")
    assert response.status_code == 200
    assert response.data == []


@pytest.mark.django_db
def test_get_article_create_article_no_auth(api_client, user) -> None:
    Article.objects.create(owner=user, title='test-article', full_text='1234')
    response = api_client.post(
        "/articles/",
        {
            'title': 'new title',
            'full_text': '1234',
        },
        format="json"
    )
    assert response.status_code == 401


@pytest.mark.django_db
def test_get_article_create_article(api_client, user) -> None:
    login_url = reverse('token_obtain_pair')
    tokens = api_client.post(
        login_url,
        {
            'username': 'adminuser', 'password': '1234',
        },
        format="json"
    ).data

    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
    response = api_client.post(
        "/articles/",
        {
            'title': 'new title',
            'full_text': '1234',
        },
        format="json"
    )
    assert response.status_code == 201
    assert response.data['owner'] == 'adminuser'
    assert response.data['title'] == 'new title'
    assert response.data['full_text'] == '1234'


@pytest.mark.django_db
def test_get_article_create_article_invalid_token(api_client, user) -> None:
    login_url = reverse('token_obtain_pair')
    api_client.post(
        login_url,
        {
            'username': 'adminuser', 'password': '1234',
        },
        format="json"
    )

    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer invalidtoken')
    response = api_client.post(
        "/articles/",
        {
            'title': 'new title',
            'full_text': '1234',
        },
        format="json"
    )
    assert response.status_code == 401
