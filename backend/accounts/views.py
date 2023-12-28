 
# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework import permissions
from rest_framework.generics import DestroyAPIView
from rest_framework import permissions
from django.conf import settings
from rest_framework import permissions
 
 # Replace with your user model
 
from rest_framework.permissions import IsAuthenticated
 

class UserSinglePostView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Retrieve the post for the currently authenticated user
        return Post.objects.get(pk=self.kwargs['pk'], author=self.request.user)
class UserPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter posts by the currently authenticated user
        return Post.objects.filter(author=self.request.user)

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the user is the author of the post or if the request is read-only
        return obj.author == request.user or request.method in permissions.SAFE_METHODS

class PostDeleteView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    permission_classes = [IsAuthorOrReadOnly]

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
 

    def perform_create(self, serializer):
        # Set the author of the post to the currently authenticated user
        serializer.save(author=self.request.user)

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
 

class PostLikeView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def put(self, request, *args, **kwargs):
        try:
            post_id = int(kwargs.get('pk'))  # Convert the id to an integer
            post = self.queryset.get(id=post_id)
            user = self.request.user
            if user in post.likes.all():
                post.likes.remove(user)
            else:
                post.likes.add(user)
            return Response(self.get_serializer(post).data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"detail": "Invalid post ID."}, status=status.HTTP_400_BAD_REQUEST)




 
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.permissions import IsAuthenticated

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

from rest_framework.decorators import api_view, permission_classes
 
from django.http import JsonResponse
from .models import Comment

def post_comments(request, post_id):
    try:
        comments = Comment.objects.filter(post_id=post_id)
        data = [{'id': comment.id, 'text': comment.text, 'user_id': comment.user_id, 'created_at': comment.created_at} for comment in comments]
        return JsonResponse(data, safe=False)
    except Comment.DoesNotExist:
        return JsonResponse([], safe=False)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user_id(request):
    user_id = request.user.id  # Get the user ID of the currently logged-in user
    return Response({'user_id': user_id})


