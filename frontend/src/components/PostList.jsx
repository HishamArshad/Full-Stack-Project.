import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetPostListQuery, useLikePostMutation } from './api/apiSlice';
import { Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { Svg } from './svg';
import DefaultModal from './Video';
import UserProfile from './User';
// import { getTokenFromLocalStorageq } from './localuser';
// import Example from './Example';
function PostList() {
  const [posts, setPosts] = useState([]);
  const { data, error, isLoading } = useGetPostListQuery();
 
 
  const [likePost] = useLikePostMutation();
 
 
  const handleLike = (postId) => {
    likePost(postId)
      .unwrap() // Access the data from the mutation result
      .then((response) => {
        // Handle the response as needed
        console.log('Post liked successfully:', response);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error liking the post:', error);
      });
  };
  const authToken = 'Token 6b67294eeb50ef9ba6e7e6e72151da51bdc2450d';
  
  if (!data || data.length === 0) {
    return (
      <h1 className='items-center text-center mt-14'>No Posts Available</h1>
    )  
  }
  
  return (
    <div>
      <UserProfile />
      <DefaultModal />
      <h1 className='text-center mt-5'>Post List</h1>
      <div className='flex justify-center items-center flex-wrap sm:justify-center sm:items-center gap-3 md:justify-center'>
      {isLoading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>Error: {error.message}</li>
        ) : data ? (
          data.map((post) => (
            <div className='mt-4 w-96'>
            <Card
            className='break-words '
            key={post.id}
           
            
      
          >
 
          {/* <Link to={`/post/${post.id}`} className="w-16"><Example /></Link> */}
            <Link to={`/post/${post.id}`} className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {post.title.length > 50 ? `${post.title.slice(0, 40)}...` : post.title}</Link>
           
              <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}<Link to={`/post/${post.id}`}>...Read more</Link>
              </p>
            <div className='flex'>
            <svg width='15px' height='15px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="like"><path d="M0,1v8c0,0.552246 0.447693,1 1,1h3v-10h-3c-0.552307,8.88178e-16 -1,0.447693 -1,1Z" transform="translate(0 5)" fill="#ffffff" className="color000000 svgShape"></path><path d="M9.15332,5.02979h-2.9541c-0.258301,0 -0.387695,-0.172363 -0.431152,-0.246582c-0.043457,-0.0737305 -0.131348,-0.270508 -0.0063477,-0.496094l1.0415,-1.87549c0.228516,-0.410645 0.251953,-0.893555 0.0649414,-1.32471c-0.187012,-0.43164 -0.556152,-0.744629 -1.0127,-0.858398l-0.734375,-0.183594c-0.178711,-0.0449219 -0.368164,0.0122071 -0.492676,0.150391l-3.9873,4.42969c-0.413574,0.460449 -0.641113,1.0542 -0.641113,1.67236v5.23242c0,1.37842 1.12158,2.5 2.5,2.5l4.97412,-0.0004883c1.12305,0 2.11475,-0.756348 2.41113,-1.83887l1.06738,-4.89844c0.03125,-0.13623 0.0473633,-0.275879 0.0473633,-0.415527c0,-1.01807 -0.828613,-1.84668 -1.84668,-1.84668Z" transform="translate(5 .97)" fill="#ffffff" className="color000000 svgShape"></path></svg>
            <p> {post.likes.length}</p>
            </div>
             
 
            <button onClick={() => handleLike(post.id)}>Like</button>
          </Card>
            
</div>
          ))
        ) : null}

      </div>
    </div>
  );
}

export default PostList;
