from rest_framework import serializers
from .models import Post
from apps.comments.serializers import CommentFlatSerializer


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
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
            'comments',
        ]
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at', 'like_count', 'comments']


class PostDetailSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    comments = CommentFlatSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_username', 'content', 'created_at', 'updated_at', 'like_count', 'comments']
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at', 'like_count', 'comments']
