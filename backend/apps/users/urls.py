from django.urls import path
from .views import RegisterView, LoginView, LogoutView, MeView, UserDetailView, UserByUsernameView, UserSearchView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
    path('users/search/', UserSearchView.as_view(), name='user_search'),
    path('users/by-username/<str:username>/', UserByUsernameView.as_view(), name='user_by_username'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user_detail'),
]
