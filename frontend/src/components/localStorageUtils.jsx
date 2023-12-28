// localStorageUtils.js

// Utility function to store the token in localStorage
export const setTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Utility function to retrieve the token from localStorage
  export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };
  
  // Utility function to remove the token from localStorage
  export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };
   