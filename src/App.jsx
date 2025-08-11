import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home';
import { UseAuthStore } from './store/UseAuthStore';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';

const App = () => {
  const { IsLogin, verifyAuth } = UseAuthStore();

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route 
        path='/login' 
        element={
          <RedirectIfLoggedIn isLoggedIn={IsLogin}>
            <Login />
          </RedirectIfLoggedIn>
        } 
      />
      <Route 
        path='/signup' 
        element={
          <RedirectIfLoggedIn isLoggedIn={IsLogin}>
            <Signup />
          </RedirectIfLoggedIn>
        } 
      />
    </Routes>
  );
}

export default App;
