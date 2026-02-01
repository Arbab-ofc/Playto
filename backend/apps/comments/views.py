from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.common.permissions import IsOwner
from apps.posts.services import toggle_like
from .models import Comment
from .serializers import CommentFlatSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.select_related('author').all()
    serializer_class = CommentFlatSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.select_related('author').all()
    serializer_class = CommentFlatSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwner]


class CommentLikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        result = toggle_like(request.user, 'comment', pk)
        comment = Comment.objects.get(id=pk)
        return Response({'action': result['action'], 'like_count': comment.like_count})
