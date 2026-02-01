from django.conf import settings
from django.db import models
from apps.posts.models import Like


class KarmaTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('post_like', 'Post Like'),
        ('comment_like', 'Comment Like'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='karma_transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.IntegerField()
    related_like = models.ForeignKey(Like, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['-created_at']),
        ]
