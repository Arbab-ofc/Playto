from django.db.models import BooleanField, Exists, OuterRef, Value
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.common.permissions import IsOwner
from apps.posts.models import Like
from apps.posts.services import toggle_like
from apps.posts.cache_utils import bust_posts_cache
from .models import Comment
from .serializers import CommentFlatSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentFlatSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            like_subquery = Like.objects.filter(
                user=self.request.user, content_type='comment', object_id=OuterRef('pk')
            )
            return Comment.objects.select_related('author').annotate(liked_by_me=Exists(like_subquery))
        return Comment.objects.select_related('author').annotate(
            liked_by_me=Value(False, output_field=BooleanField())
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, is_anonymous=bool(self.request.data.get('is_anonymous')))
        bust_posts_cache()


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentFlatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            like_subquery = Like.objects.filter(
                user=self.request.user, content_type='comment', object_id=OuterRef('pk')
            )
            return Comment.objects.select_related('author').annotate(liked_by_me=Exists(like_subquery))
        return Comment.objects.select_related('author').annotate(
            liked_by_me=Value(False, output_field=BooleanField())
        )


class CommentLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        result = toggle_like(request.user, 'comment', pk)
        return Response({'action': result['action'], 'like_count': result['like_count']})
