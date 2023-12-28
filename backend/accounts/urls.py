from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/like/', views.PostLikeView.as_view(), name='post-like'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),  # Define the new URL pattern
    path('posts/<int:pk>/delete/', views.PostDeleteView.as_view(), name='post-delete'),
    path('my-posts/', views.UserPostsView.as_view(), name='my-posts'),
    path('my-posts/<int:pk>/', views.UserSinglePostView.as_view(), name='my-single-post'),
    path('comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
    path('currentuser/', views.get_current_user_id, name='current-user-id'),
    path('commentss/<int:post_id>/', views.post_comments, name='post_comments'),
]
