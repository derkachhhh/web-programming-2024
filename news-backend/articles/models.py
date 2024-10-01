from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=255)
    full_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.created_at})"