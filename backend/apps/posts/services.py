from django.db import IntegrityError, transaction
from django.db.models import F
from django.shortcuts import get_object_or_404
from apps.karma.models import KarmaTransaction
from apps.comments.models import Comment
from .models import Post, Like


@transaction.atomic
def toggle_like(user, content_type, object_id):
    try:
        like = Like.objects.create(user=user, content_type=content_type, object_id=object_id)

        if content_type == 'post':
            Post.objects.filter(id=object_id).update(like_count=F('like_count') + 1)
            post = get_object_or_404(Post, id=object_id)
            karma_user = post.author
            karma_amount = 5
        else:
            Comment.objects.filter(id=object_id).update(like_count=F('like_count') + 1)
            comment = get_object_or_404(Comment, id=object_id)
            karma_user = comment.author
            karma_amount = 1

        KarmaTransaction.objects.create(
            user=karma_user,
            transaction_type=f'{content_type}_like',
            amount=karma_amount,
            related_like=like,
        )

        return {'action': 'liked'}
    except IntegrityError:
        like = get_object_or_404(Like, user=user, content_type=content_type, object_id=object_id)
        KarmaTransaction.objects.filter(related_like=like).delete()

        if content_type == 'post':
            Post.objects.filter(id=object_id).update(like_count=F('like_count') - 1)
        else:
            Comment.objects.filter(id=object_id).update(like_count=F('like_count') - 1)

        like.delete()
        return {'action': 'unliked'}
