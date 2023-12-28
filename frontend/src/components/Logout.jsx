// Logout.js

import { useLogoutMutation } from './api/apiSlice'; // Adjust the import path
import { useSelector } from 'react-redux';
import { removeTokenFromLocalStorage, getTokenFromLocalStorage } from './localStorageUtils';
import { removeTokenFromLocalStorageq } from './localuser';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
function Logout() {
  // Use useSelector with a selector function to extract the token from Redux store
   
  const token = getTokenFromLocalStorage() // Assuming you store the token in your auth slice

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(token);
      // The user is logged out, you can also clear the token from your Redux store
      removeTokenFromLocalStorage();
      removeTokenFromLocalStorageq();
      console.log('Logout successful');
      localStorage.setItem('isLoggedOut', 'true');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
 
      <Button className='ml-4' onClick={handleLogout} disabled={isLoading}>Logout</Button>
 
  );
}

export default Logout;
