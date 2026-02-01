import logging
from datetime import timedelta
from django.db import connection
from django.db.models import Sum, Q, Count
from django.utils import timezone
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model

logger = logging.getLogger('playto')
User = get_user_model()


class LeaderboardView(APIView):
    def get(self, request):
        cache_key = 'leaderboard_24h'
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)

        twenty_four_hours_ago = timezone.now() - timedelta(hours=24)

        leaderboard = (
            User.objects.annotate(
                karma_24h=Sum(
                    'karma_transactions__amount',
                    filter=Q(karma_transactions__created_at__gte=twenty_four_hours_ago),
                ),
                total_posts=Count('posts', distinct=True),
                total_comments=Count('comments', distinct=True),
            )
            .filter(karma_24h__isnull=False, karma_24h__gt=0)
            .order_by('-karma_24h')[:5]
        )

        result = [
            {
                'username': user.username,
                'karma_24h': user.karma_24h or 0,
                'total_posts': user.total_posts,
                'total_comments': user.total_comments,
            }
            for user in leaderboard
        ]

        if connection.queries:
            logger.info('Leaderboard SQL: %s', connection.queries[-1].get('sql'))

        cache.set(cache_key, result, 60)
        return Response(result)
