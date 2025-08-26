import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import {toast} from 'react-hot-toast'
import * as Sentry from "@sentry/react";
const App = () => {
  const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);
  return (
    <> 
    <SignedIn>
      <SentryRoutes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<Navigate to={"/"}/>} />
      </SentryRoutes>
        
      </SignedIn>
    <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"}/>} />
        </SentryRoutes>
      </SignedOut>
      
    </> 
  )
}

export default App