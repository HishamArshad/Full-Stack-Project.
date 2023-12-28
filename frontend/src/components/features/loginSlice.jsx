// apiSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state for the token
const initialState = {
  token: null,
};

// Define an async thunk for the login request
export const login = createAsyncThunk('auth/login', async (credentials) => {
  // Replace this with your actual API request to /api/accounts/login
  const response = await fetch('http://localhost:8000/api/accounts/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    return data.token;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
});

// Create an API slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        // Store the token in local storage
        localStorage.setItem('token', action.payload);
      });
  },
});

// Export the reducer and actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;
