import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <> 
    <SignedIn>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<Navigate to={"/"}/>} />
      </Routes>
        
      </SignedIn>
    <SignedOut>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"}/>} />
        </Routes>
      </SignedOut>
      
    </> 
  )
}

export default App