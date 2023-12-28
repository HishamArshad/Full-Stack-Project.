import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import Login from './components/Login'
import Signup from './components/Signup';
import { useState } from 'react';
import Navbar from './components/Navbar'
import VerifyActivationCode from './components/Activation';
import Activationpage from './components/Activationpage';
import Yourpost from './components/Yourpost';
import PostDetailuser from './components/PostDetailuser';
import Chats from './components/Chat';
import Comparison from './components/Comparison';
function App() {
  const [isLoggedOut, setIsLoggedOut] = useState(localStorage.getItem('isLoggedOut') === 'true');
  return (
    <>

	<Router>
    <Navbar isLoggedOut={isLoggedOut}/>
 
    <Routes>
		<Route path='/' element={<PostList />} />
		<Route path='/create' element={<PostCreate />} />
    <Route path="/post/:postId" element={<PostDetail />} />
    <Route path="/login" element={<Login setIsLoggedOut={setIsLoggedOut} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/signup/verify" element={<VerifyActivationCode />} />
    <Route path="/activation" element={<Activationpage />} />
    <Route path="/yourpost" element={<Yourpost/>} />
    <Route path="/compare" element={<Comparison/>} />
    <Route path="/postuser/:postId" element={<PostDetailuser />} />
    <Route path="/chat" element={<Chats />} />
    </Routes>
  </Router>
    </>
  );
}

export default App;
 