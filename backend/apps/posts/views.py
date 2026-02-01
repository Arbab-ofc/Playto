import logging
from django.db.models import Prefetch
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.comments.models import Comment
from apps.common.permissions import IsOwner
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from .services import toggle_like

logger = logging.getLogger('playto')


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.select_related('author').prefetch_related(
        Prefetch('comments', queryset=Comment.objects.select_related('author').order_by('tree_id', 'lft'))
    )
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]

    def get_queryset(self):
        return Post.objects.select_related('author').prefetch_related(
            Prefetch('comments', queryset=Comment.objects.select_related('author').order_by('tree_id', 'lft'))
        )


class PostLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        result = toggle_like(request.user, 'post', pk)
        post = Post.objects.get(id=pk)
        return Response({'action': result['action'], 'like_count': post.like_count})
