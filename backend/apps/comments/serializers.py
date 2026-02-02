from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author_username', 'created_at', 'like_count', 'level', 'replies']

    def get_replies(self, obj):
        if obj.level < 5:
            replies = obj.get_children().select_related('author')
            return CommentSerializer(replies, many=True, context=self.context).data
        return []


class CommentFlatSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    parent_id = serializers.IntegerField(allow_null=True, required=False)
    liked_by_me = serializers.BooleanField(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'post',
            'parent_id',
            'content',
            'author_username',
            'created_at',
            'like_count',
            'liked_by_me',
            'is_anonymous',
            'level',
            'lft',
            'rght',
            'tree_id',
        ]
        read_only_fields = [
            'author_username',
            'created_at',
            'like_count',
            'liked_by_me',
            'level',
            'lft',
            'rght',
            'tree_id',
        ]

    def get_author_username(self, obj):
        return 'Anonymous' if obj.is_anonymous else obj.author.username
