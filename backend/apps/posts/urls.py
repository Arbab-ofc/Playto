from django.urls import path
from .views import PostListCreateView, PostDetailView, PostLikeToggleView

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post_list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    path('posts/<int:pk>/like/', PostLikeToggleView.as_view(), name='post_like'),
]
