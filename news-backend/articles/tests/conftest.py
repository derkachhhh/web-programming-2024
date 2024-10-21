import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture(scope="function")
def api_client() -> APIClient:
    """
    Fixture to provide an API client
    :return: APIClient
    """
    yield APIClient()


@pytest.fixture(scope="function")
def user() -> User:
    yield User.objects.create_user(  # create_user!!!
        username='adminuser',
        password='1234',
        email='adminuser@gmail.com',
    )
