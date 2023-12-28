'use client';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Navbar } from 'flowbite-react';
import Logout from './Logout';
import { getTokenFromLocalStorage } from './localStorageUtils';
const token = getTokenFromLocalStorage();
import Eye from './Hh'
import { useLoginMutation } from './api/apiSlice'; 
export default function NavbarWithCTAButton({isLoggedOut}) {
 
  const [{ isLoading }] = useLoginMutation();
  if(isLoading) {
    return "Loading"
  }

 
 
 
  return (
    <Navbar fluid rounded>
      <Navbar.Brand  >
        <div className='flex'>
      <div style={{width: '40px'}}><Eye /></div>
        <Link to='/' className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Hisham</Link>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isLoggedOut ? (
          <>
          <Link to="./login">
            <Button className='ml-4'>Login</Button>
          </Link>
          <Link to="./signup">
            <Button className='ml-4'>SignUp</Button>
          </Link>
         
          </>
        ) : (
          <Logout />
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
    
        <Navbar.Link><Link to='/' >Home</Link></Navbar.Link>
        <Navbar.Link><Link to='/create'>Create Post</Link></Navbar.Link>
        <Navbar.Link><Link to='/yourpost'>YourPosts</Link></Navbar.Link>
        <Navbar.Link>Pricing</Navbar.Link>
        <Navbar.Link>Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
