import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useLikePostMutation, useGetPostDetailsQuery, usePostDeleteMutation, useGetCommentDetailQuery } from './api/apiSlice';
import { Card, Button } from 'flowbite-react';
import Alert from './flowbite/Alert';
import Example from './Example';
import { getTokenFromLocalStorage } from './localStorageUtils';
import { getTokenFromLocalStorageq } from './localuser';
import axios from 'axios';

function PostDetail() {
  const { postId } = useParams();
  const { data: post, error, isLoading } = useGetPostDetailsQuery(postId);
  const { data: comment} = useGetCommentDetailQuery(postId);
  const [postDelete] = usePostDeleteMutation();
  const [redirect, setRedirect] = useState(false);
  const [likePost] = useLikePostMutation();
  const [isError, setIsError] = useState('');
  const [isError2, setIsError2] = useState(false);
  const [message, setMessage] = useState('');
 
 
  const handleLike = (postId) => {
    likePost(postId)
      .unwrap()
      .then((response) => {
        console.log('Post liked successfully:', response);
      })
      .catch((error) => {
        console.error('Error liking the post:', error);
      });
  };

  const handleDelete = (postId) => {
    postDelete(postId)
      .unwrap()
      .then((response) => {
        setRedirect(true);
        console.log('Post deleted successfully:', response);
      })
      .catch((error) => {
        setIsError(error.data.detail);
        setIsError2(true);
        setTimeout(() => {
          setIsError('');
          setIsError2(false);
        }, 3000);
        console.error('Error deleting the post:', error.data.detail);
      });
  };

  const handleComment = async () => {
    try {
      const userId = getTokenFromLocalStorageq();
      const token = getTokenFromLocalStorage();
      if (!userId) {
        console.error('User ID token not found in localStorage');
        return;
      }

      const data = {
        user: userId,
        text: message,
        post: postId,
      };

      const response = await axios.post('http://localhost:8000/api/comments/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      console.log('Comment posted successfully:', response.data);

      // Clear the comment input field
      setMessage('');

      // Update comments after posting
     
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

 

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      {post ? (
        <div>
          <Card className='break-words' key={post.id}>
            <Link to={`/post/${post.id}`} className="text-2xl font-bold px-8 tracking-tight text-gray-900 mb-3 dark:text-white">
              {post.title}
            </Link>
            <p className="font-normal px-8 whitespace-pre-wrap text-gray-700 dark:text-gray-400">
              {post.content}
            </p>
            <div className='flex'>
              <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="like">
                <path
                  d="M0,1v8c0,0.552246 0.447693,1 1,1h3v-10h-3c-0.552307,8.88178e-16 -1,0.447693 -1,1Z"
                  transform="translate(0 5)"
                  fill="#ffffff"
                  className="color000000 svgShape"
                ></path>
                <path
                  d="M9.15332,5.02979h-2.9541c-0.258301,0 -0.387695,-0.172363 -0.431152,-0.246582c-0.043457,-0.0737305 -0.131348,-0.270508 -0.0063477,-0.496094l1.0415,-1.87549c-0.228516,-0.410645 -0.251953,-0.893555 -0.0649414,-1.32471c-0.187012,-0.43164 -0.556152,-0.744629 -1.0127,-0.858398l-0.734375,-0.183594c-0.178711,-0.0449219 -0.368164,0.0122071 -0.492676,0.150391l-3.9873,4.42969c-0.413574,0.460449 -0.641113,1.0542 -0.641113,1.67236v5.23242c0,1.37842 1.12158,2.5 2.5,2.5l4.97412,-0.0004883c-1.12305,0 2.11475,-0.756348 2.41113,-1.83887l-1.06738,-4.89844c-0.03125,-0.13623 -0.0473633,-0.275879 -0.0473633,-0.415527c0,-1.01807 -0.828613,-1.84668 -1.84668,-1.84668Z"
                  transform="translate(5 .97)"
                  fill="#ffffff"
                  className="color000000 svgShape"
                ></path>
              </svg>
              <p> {post.likes.length}</p>
            </div>
            <Button color="light" onClick={() => handleLike(postId)}>
              Like
            </Button>
            <Button onClick={() => handleDelete(postId)}>Delete</Button>
            {isError2 ? (
              <div className='flex justify-center items-center'>
                <Alert status={isError}></Alert>
                <div style={{ width: '45px' }}>
                  <Example />
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Back to Post List</Link>
      <>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleComment}>Comment</Button>
      </>
      <div>
  <h2>Comments</h2>
  {comment ? (
    comment.map((commentt) => (
      <div key={commentt.id}>
        <p>{commentt.text}</p>
        <p>Posted by User ID: {commentt.user_id}</p>
      </div>
    ))
  ) : (
    <p>No comments available.</p>
  )}
</div>

    </div>
  );
}

export default PostDetail;
