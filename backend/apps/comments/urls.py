from django.urls import path
from .views import CommentListCreateView, CommentDetailView, CommentLikeToggleView

urlpatterns = [
    path('comments/', CommentListCreateView.as_view(), name='comment_list'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment_detail'),
    path('comments/<int:pk>/like/', CommentLikeToggleView.as_view(), name='comment_like'),
]
