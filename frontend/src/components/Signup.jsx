import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Alert from './flowbite/Alert';
import { Navigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Example from './Example';

function Signup() {
  const [credentials, setCredentials] = useState({ email: '', password: '', first_name: '', last_name: '' });
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError1, setLoginError1] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:8000/api/accounts/signup/', credentials);
        setIsSuccess(true);
      // if (response.data.success) {
      // 
      // } else if (response.data.error) {
      //   setLoginError(response.data.detail);
      //   
      // }
   
    } catch (error) {
      
      
        setLoginError(error.response.data.detail);
      
      
      setLoginError1(true);
      console.error('Login failed:', error.response.data.detail);
      
    }
  }
  const handleClick = () => {
    setIsLoading(true); // Assuming setIsLoading is a state updater function
    setTimeout(() => {
      setIsLoading(false); // Set isLoading back to false after 3000 milliseconds (3 seconds)
    }, 3000); // Fix the syntax error here, use a comma instead of a colon
  };
  
  if (isSuccess) {
    return <Navigate to="/activation" />;
  }

  return (
    <div>
      <div className='items-center justify-center flex mt-10'>
        <form onSubmit={handleLogin} className="flex max-w-lg flex-col gap-4">
          <div>
            {loginError1 ? (
              <Alert status={loginError} />
            ) : null}
 
            <div className="mb-2 block">
              <Label
                htmlFor="first_name"
                value="first_name"
              />
            </div>
            <TextInput
              id="first_name"
              value={credentials.first_name}
              onChange={(e) => setCredentials({ ...credentials, first_name: e.target.value })}
              name="first_name"
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="last_name"
                value="last_name"
              />
            </div>
            <TextInput
              id="last_name"
              value={credentials.last_name}
              onChange={(e) => setCredentials({ ...credentials, last_name: e.target.value })}
              name="last_name"
              type="text"
            />
          </div>
          <div>
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
          <div className='flex items-center justify-center' >
          <div>
          <Button type='submit'onClick={() => { handleLogin(); handleClick()}}>   
       Submit
        </Button>
        </div>
        <div style={{ width: '45px' }}>
              {loading ? (
                  <Example />
              ): null}
            
        </div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
