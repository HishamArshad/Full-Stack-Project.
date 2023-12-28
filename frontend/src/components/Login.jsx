'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Alert  from './flowbite/Alert';

import { useLoginMutation } from './api/apiSlice'; // Adjust the import path
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setTokenInLocalStorage } from './localStorageUtils';
import { setTokenInLocalStorageqs } from './localstream';
function Login({setIsLoggedOut}) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [loginError, setLoginError] = useState(false);
  
  const handleLogin = async () => {
    try {
      
      const result = await login(credentials);
      const token = result.data.token;
      const idds = result.data.id;
      const iddss = result.data;
      const stream = result.data.stream_token;
      console.log(stream)
      setTokenInLocalStorageqs(stream)
      console.log(token)
      console.log(idds)
      console.log(iddss)
      // Store the token in localStorage
      setTokenInLocalStorage(token)
      localStorage.setItem('isLoggedOut', 'false');

      console.log('Login successful'); 
        setRedirectToHome(true) 
     
      setIsLoggedOut(false)
    } catch (error) {
      setLoginError(true)
      console.error('Login failed:', error);
    }
  }
  
 
  if (redirectToHome) {
    return <Navigate to="/" />;
    
  }
  
  return (
    <div>
    <div className='items-center justify-center flex mt-10'>
      <form className="flex max-w-md flex-col gap-4">
      <div>
        {loginError ? (
          <Alert status={"Invalid Email or Password"}/>
        ) : null}
        
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Your email"
          />
        </div>
        <TextInput
          id="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="name@gmail.com"
          required
          name="email"
          type="email"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Your password"
          />
        </div>
        <TextInput
          id="password"
          required
          name="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          type="password"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">
          Remember me
        </Label>
      </div>
      <Button onClick={handleLogin}>
        Submit
      </Button>
    </form>
      {/* <input
        type="text"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button> */}
    
    </div>
    </div>
  );
}
export default Login