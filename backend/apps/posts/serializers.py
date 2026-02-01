from rest_framework import serializers
from .models import Post
from apps.comments.serializers import CommentFlatSerializer


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    comments = CommentFlatSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'author_username',
            'content',
            'created_at',
            'updated_at',
            'like_count',
            'is_anonymous',
            'comments',
        ]
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at', 'like_count', 'comments']

    def get_author_username(self, obj):
        return 'Anonymous' if obj.is_anonymous else obj.author.username


class PostDetailSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    comments = CommentFlatSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'author_username',
            'content',
            'created_at',
            'updated_at',
            'like_count',
            'is_anonymous',
            'comments',
        ]
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at', 'like_count', 'comments']

    def get_author_username(self, obj):
        return 'Anonymous' if obj.is_anonymous else obj.author.username
