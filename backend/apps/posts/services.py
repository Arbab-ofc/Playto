from django.db import transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from apps.karma.models import KarmaTransaction
from apps.comments.models import Comment
from .models import Post, Like
from .cache_utils import bust_leaderboard_cache, bust_posts_cache


@transaction.atomic
def toggle_like(user, content_type, object_id):
    is_post = content_type == 'post'
    target_model = Post if is_post else Comment
    existing = (
        Like.objects.select_for_update()
        .filter(user=user, content_type=content_type, object_id=object_id)
        .first()
    )

    if existing:
        existing.delete()
        target_model.objects.filter(id=object_id).update(like_count=F('like_count') - 1)
        action = 'unliked'
    else:
        like = Like.objects.create(user=user, content_type=content_type, object_id=object_id)
        target_model.objects.filter(id=object_id).update(like_count=F('like_count') + 1)
        target = get_object_or_404(target_model, id=object_id)
        karma_user = target.author
        karma_amount = 5 if is_post else 1
        KarmaTransaction.objects.create(
            user=karma_user,
            transaction_type=f'{content_type}_like',
            amount=karma_amount,
            related_like=like,
        )
        action = 'liked'

    like_count = target_model.objects.filter(id=object_id).values_list('like_count', flat=True).first() or 0
    bust_posts_cache()
    bust_leaderboard_cache()
    return {'action': action, 'like_count': like_count}
