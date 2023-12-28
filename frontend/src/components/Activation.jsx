import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Example from './Example';
 
function VerifyActivationCode() {
  const location = useLocation();
  const { search } = location;
  const [isRedirect, setIsRedirect] = useState(false)
  useEffect(() => {
    const urlParams = new URLSearchParams(search);
    const activationCode = urlParams.get('code');
    
    if (activationCode) {
      // Store the activation code in local storage with a 1-minute expiration
      setWithExpiry('activationCode', activationCode, 5 * 60 * 1000); // 1 minutes in milliseconds
            }
        }, [search]);

        useEffect(() => {
            // Check if the activation code has expired
            const activationCode = getWithExpiry('activationCode');

            if (activationCode) {
            // The activation code is still valid
            console.log('Activation code:', activationCode);

            // Define the base URL of your API
            const baseUrl = 'http://127.0.0.1:8000';

            // Define the URL with the code as a query parameter
            const url = `${baseUrl}/api/accounts/signup/verify/?code=${activationCode}`;

            // Send the GET request
            axios
                .get(url)
                .then((response) => {
                // Handle the success response here
                console.log('Activation successful:', response.data);
                // You can add further logic here based on the response
                })
                .catch((error) => {
                // Handle errors
                console.error('Activation failed:', error);
                // You can access error.response.data to get details of the error response
                });
            } else {
            console.log('Activation code has expired or does not exist in local storage.');
            }
            
        }, []);
 
            useEffect(() => {
                setTimeout(() => {
                setIsRedirect(true);
                }, 2000);
            }, []); // Run this effect only once when the component mounts

            if(isRedirect) {
                return <Navigate to='/'/>
            }
  return (
    <div className='text-center flex jextify-center flex-col items-center mt-20'>
        
      Verification Succesfull! <br />
      Redirecting <br />
      <div style={{ width: '45px' }}><Example /></div>
    </div>
  );
}

export default VerifyActivationCode;

// Helper function to set an item in local storage with an expiration time
function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl * 1000, // Convert minutes to milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  

// Helper function to get an item from local storage with expiration handling
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date().getTime();
  if (now > item.expiry) {
    // Remove the item from local storage if it has expired
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
