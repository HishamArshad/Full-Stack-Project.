export const setTokenInLocalStorageqs = (stream) => {
    localStorage.setItem('stream', stream);
  };
  
  // Utility function to retrieve the token from localStorage
  export const getTokenFromLocalStorageqs = () => {
    return localStorage.getItem('stream');
  };
  
  // Utility function to remove the token from localStorage
  export const removeTokenFromLocalStorageqs = () => {
    localStorage.removeItem('stream');
  };
   