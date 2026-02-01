import threading
import pytest
from datetime import timedelta
from django.utils import timezone
from rest_framework.test import APIClient
from apps.users.models import User
from apps.posts.models import Post
from apps.karma.models import KarmaTransaction


@pytest.mark.django_db
class TestLeaderboard:
    def test_leaderboard_calculates_24h_karma_correctly(self):
        client = APIClient()

        user1 = User.objects.create_user(username='user1', password='pass')
        user2 = User.objects.create_user(username='user2', password='pass')
        User.objects.create_user(username='user3', password='pass')

        Post.objects.create(author=user1, content='Post 1')
        Post.objects.create(author=user2, content='Post 2')

        now = timezone.now()

        KarmaTransaction.objects.create(
            user=user1,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=12),
        )
        KarmaTransaction.objects.create(
            user=user1,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=6),
        )
        KarmaTransaction.objects.create(
            user=user1,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=30),
        )

        KarmaTransaction.objects.create(
            user=user2,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=1),
        )
        KarmaTransaction.objects.create(
            user=user2,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=2),
        )
        KarmaTransaction.objects.create(
            user=user2,
            transaction_type='post_like',
            amount=5,
            created_at=now - timedelta(hours=3),
        )

        response = client.get('/api/leaderboard/')

        assert response.status_code == 200
        assert len(response.data) == 2

        assert response.data[0]['username'] == 'user2'
        assert response.data[0]['karma_24h'] == 15
        assert response.data[1]['username'] == 'user1'
        assert response.data[1]['karma_24h'] == 10

    def test_concurrent_likes_no_duplicate_karma(self):
        user = User.objects.create_user(username='liker', password='pass')
        author = User.objects.create_user(username='author', password='pass')
        post = Post.objects.create(author=author, content='Test post')

        client = APIClient()
        client.force_authenticate(user=user)

        def like_post():
            client.post(f'/api/posts/{post.id}/like/')

        threads = [threading.Thread(target=like_post) for _ in range(10)]

        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()

        post.refresh_from_db()
        assert post.like_count == 1

        karma_transactions = KarmaTransaction.objects.filter(user=author)
        assert karma_transactions.count() == 1
        assert karma_transactions.first().amount == 5
