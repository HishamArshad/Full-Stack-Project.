export const setTokenInLocalStorageq = (userid) => {
    localStorage.setItem('userid', userid);
  };
  
  // Utility function to retrieve the token from localStorage
  export const getTokenFromLocalStorageq = () => {
    return localStorage.getItem('userid');
  };
  
  // Utility function to remove the token from localStorage
  export const removeTokenFromLocalStorageq = () => {
    localStorage.removeItem('userid');
  };
   