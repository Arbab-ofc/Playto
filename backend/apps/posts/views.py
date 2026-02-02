import logging
from django.db.models import BooleanField, Exists, OuterRef, Prefetch, Value
from django.views.decorators.cache import cache_page
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.comments.models import Comment
from apps.common.permissions import IsOwner
from .models import Like, Post
from .serializers import PostSerializer, PostDetailSerializer
from .services import toggle_like
from .cache_utils import bust_posts_cache

logger = logging.getLogger('playto')


class PostListCreateView(generics.ListCreateAPIView):
    def get_queryset(self):
        if self.request.user.is_authenticated:
            post_like_subquery = Like.objects.filter(
                user=self.request.user, content_type='post', object_id=OuterRef('pk')
            )
            comment_like_subquery = Like.objects.filter(
                user=self.request.user, content_type='comment', object_id=OuterRef('pk')
            )
            comment_queryset = (
                Comment.objects.select_related('author')
                .annotate(liked_by_me=Exists(comment_like_subquery))
                .order_by('tree_id', 'lft')
            )
            queryset = (
                Post.objects.select_related('author')
                .annotate(liked_by_me=Exists(post_like_subquery))
                .prefetch_related(Prefetch('comments', queryset=comment_queryset))
            )
        else:
            comment_queryset = (
                Comment.objects.select_related('author')
                .annotate(liked_by_me=Value(False, output_field=BooleanField()))
                .order_by('tree_id', 'lft')
            )
            queryset = (
                Post.objects.select_related('author')
                .annotate(liked_by_me=Value(False, output_field=BooleanField()))
                .prefetch_related(Prefetch('comments', queryset=comment_queryset))
            )
        author_id = self.request.query_params.get('author')
        if author_id:
            queryset = queryset.filter(author_id=author_id)
        return queryset
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return super().get(request, *args, **kwargs)
        return cache_page(30)(super().get)(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, is_anonymous=bool(self.request.data.get('is_anonymous')))
        bust_posts_cache()


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            post_like_subquery = Like.objects.filter(
                user=self.request.user, content_type='post', object_id=OuterRef('pk')
            )
            comment_like_subquery = Like.objects.filter(
                user=self.request.user, content_type='comment', object_id=OuterRef('pk')
            )
            comment_queryset = (
                Comment.objects.select_related('author')
                .annotate(liked_by_me=Exists(comment_like_subquery))
                .order_by('tree_id', 'lft')
            )
            return (
                Post.objects.select_related('author')
                .annotate(liked_by_me=Exists(post_like_subquery))
                .prefetch_related(Prefetch('comments', queryset=comment_queryset))
            )
        comment_queryset = (
            Comment.objects.select_related('author')
            .annotate(liked_by_me=Value(False, output_field=BooleanField()))
            .order_by('tree_id', 'lft')
        )
        return (
            Post.objects.select_related('author')
            .annotate(liked_by_me=Value(False, output_field=BooleanField()))
            .prefetch_related(Prefetch('comments', queryset=comment_queryset))
        )


class PostLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        result = toggle_like(request.user, 'post', pk)
        post = Post.objects.get(id=pk)
        return Response({'action': result['action'], 'like_count': post.like_count})
