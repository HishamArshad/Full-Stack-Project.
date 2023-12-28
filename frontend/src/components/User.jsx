import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { getTokenFromLocalStorage } from './localStorageUtils'; // Use the appropriate import for your utility function
import { setTokenInLocalStorageq } from './localuser'; // Use the appropriate import for your utility function

function UserProfile() {
  const [userId, setUserId] = useState(null);

  // Create a function to fetch the user ID
  const getCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/currentuser/', {
        headers: {
          Authorization: `Token ${getTokenFromLocalStorage()}`, // Replace with your actual token
        },
      });

      // Extract the user_id from the response data
      const user_id = response.data.user_id;

      // Store the user ID in localStorage
      setTokenInLocalStorageq(user_id);

      // Set the user ID in the component's state
      setUserId(user_id);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }

  // Call getCurrentUser when the component mounts
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {userId}</p> {/* Display the user ID */}
      {/* Display other user information as needed */}
    </div>
  );
}

export default UserProfile;
