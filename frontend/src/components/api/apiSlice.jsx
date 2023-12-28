import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../localStorageUtils';
const authToken = getTokenFromLocalStorage();
console.log(authToken)
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/'}),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: () => 'posts/',
      providesTags: ['Posts'],
      headers: {
        'Authorization': `Token ${getTokenFromLocalStorage()}`,
      },
    }),
    getUserCurrent: builder.query({
      query: () => 'currentuser/',
      providesTags: ['Posts'],
      headers: {
        'Authorization': `Token 89139aa58d473c046b930d08c3090c792cf53f75`,
      },
      
      transformResponse: (response) => {
        console.log(response.user_id)
        return { id: response.user_id }; // Transform the response to match your data structure
  
      },
      
    }),
    getPostListUser: builder.query({
      query: () => 'my-posts/',
      providesTags: ['Posts'],
      headers: {
        'Authorization': `Token ${getTokenFromLocalStorage()}`,
      },
    }),
    createPost: builder.mutation({
        query: (credentials) => ({
          url: 'posts/',
          method: 'POST',
          headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
          body: credentials,
        }),
        invalidatesTags:["Posts"]
    }),
    likePost: builder.mutation({
        query: (postId) => ({
          url: `posts/${postId}/like/`,
          method: 'PUT',
          headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
        }),
        invalidatesTags:["Posts"]
      }),
    getPostDetails: builder.query({
        query: (postId) => `posts/${postId}/`,
        providesTags: ['Posts'],
        headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
      }),
      getCommentDetail: builder.query({
        query: (postId) => `commentss/${postId}/`,
        providesTags: ['Posts'],
        headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
      }),
      getPostDetailUser: builder.query({
        query: (postId) => `my-posts/${postId}/`,
        providesTags: ['Posts'],
        headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
      }),
      postDelete: builder.mutation({
        query: (postId) => ({
          url: `posts/${postId}/delete`,
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
        }),
        invalidatesTags: ['Posts'], // This invalidates the 'Posts' tag upon successful deletion.
      }),
      postDeleteUser: builder.mutation({
        query: (postId) => ({
          url: `my-posts/${postId}/delete`,
          method: 'DELETE',
          
          headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
            
          },
          
        }),
        invalidatesTags: ['Posts'], // This invalidates the 'Posts' tag upon successful deletion.
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: 'accounts/login/',
          method: 'POST',
          body: credentials,
       
        }),
        invalidatesTags:["Posts"]
      }),
      signup: builder.mutation({
        query: (credentials) => ({
          url: 'accounts/signup/',
          method: 'POST',
          body: credentials,
       
        }),
        invalidatesTags:["Posts"]
      }),
      logout: builder.mutation({
        query: () => ({
          url: 'accounts/logout/',
          method: 'GET',
          headers: {
            'Authorization': `Token ${getTokenFromLocalStorage()}`,
          },
        }),
        invalidatesTags:["Posts"]
      }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostListQuery, 
  useGetUserCurrentQuery,
  useLikePostMutation, 
  useGetPostDetailsQuery,
  usePostDeleteMutation ,
  useLoginMutation, 
  useGetCommentDetailQuery,
  useSignupMutation ,useLogoutMutation, 
  useCreatePostMutation, 

  useGetPostListUserQuery, 
  useGetPostDetailUserQuery,
  usePostDeleteUserMutation} = pokemonApi