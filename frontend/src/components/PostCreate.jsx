// PostCreate.js
'use client';

import { Label, Textarea ,  TextInput, Button } from 'flowbite-react';
import React, { useState } from 'react';
import { useCreatePostMutation } from './api/apiSlice';
import { Navigate } from 'react-router-dom';
import Check from './Check';
function PostCreate() {
 
  const [createPost] = useCreatePostMutation();
  const [credentials, setCredentials] = useState({ title: '', content: '' });
  const [redirect, setRedirect] = useState(false);

  const handleCreatePost = async () => {
    try {
    const result = await createPost(credentials);
    // Send a request to create a new post
      setRedirect(true)
    } catch(error) {
        console.error('Error creating the post:', error);
      };
  };
  if(redirect) {
    return <Navigate to='/'/>
  }
  return (
    <div className=' items-center justify-center flex'>
    <div className='w-9/12'>
      <h1>Create Post</h1>

      <div className="max-w-md">
      <div className="mb-2 block">
        <Label
          htmlFor="email3"
          value="Title"
        />
      </div>
      <TextInput
        
        id="email3"
      
        onChange={(e) => setCredentials({ ...credentials, title: e.target.value })}
        placeholder="Title"
        value={credentials.title}
        required
        
      />
    </div>

 
            <div className="mb-2 block">
            <div
      className="max-w-md"
      id="textarea"
    >
        <Label
          htmlFor="content"
          value="Content"
        />
      </div>
      <Textarea
      placeholder="Content"
      value={credentials.content}
      className="p-2"
      required
      rows={15}
      onChange={(e) => setCredentials({ ...credentials, content: e.target.value })}
      wrap="soft"
      style={{ whiteSpace: 'pre-wrap' }}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        // Ensure that the pasted content contains line breaks
        const contentWithLineBreaks = text.replace(/\n/g, '\n\n'); // You might need to adjust this based on your source
        // Insert the content with line breaks directly into the textarea
        const updatedContent = credentials.content + contentWithLineBreaks;
        setCredentials({ ...credentials, content: updatedContent });
      }}
      
    />


        <Button className='mt-4' onClick={handleCreatePost} color="light">
        Create
      </Button>
 
    </div>
    </div>
   
    </div>
  );
}

export default PostCreate;
