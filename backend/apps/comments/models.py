from django.conf import settings
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from apps.posts.models import Post


class Comment(MPTTModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    content = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_count = models.IntegerField(default=0)
    lft = models.PositiveIntegerField(db_index=True, editable=False)
    rght = models.PositiveIntegerField(db_index=True, editable=False)
    tree_id = models.PositiveIntegerField(db_index=True, editable=False)
    level = models.PositiveIntegerField(db_index=True, editable=False)

    class MPTTMeta:
        order_insertion_by = ['created_at']

    class Meta:
        indexes = [
            models.Index(fields=['post', 'tree_id', 'lft']),
        ]
