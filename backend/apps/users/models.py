from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Sum, Q
from django.utils import timezone
from datetime import timedelta


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, default='')

    @property
    def total_karma(self):
        return self.karma_transactions.aggregate(total=Sum('amount'))['total'] or 0

    @property
    def karma_last_24h(self):
        since = timezone.now() - timedelta(hours=24)
        return (
            self.karma_transactions.filter(created_at__gte=since)
            .aggregate(total=Sum('amount'))['total']
            or 0
        )
