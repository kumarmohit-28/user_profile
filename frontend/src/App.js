import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProfileForm from './components/ProfileForm';
import MediaListing from './components/MediaListing';
import ProfileView from './components/ProfileView';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { AccessTokenProvider } from './context/AccessTokenContext';
const App = () => {

  return (
    <BrowserRouter>
<AccessTokenProvider>
<AuthProvider>
<UserProvider>
      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/profile" element={<ProfileView/>} />
        <Route path="/media-listing" element={<MediaListing/>} />
        <Route path="/edit-profile" element={<ProfileForm/>} />

      </Routes >
      </UserProvider>
      </AuthProvider>
</AccessTokenProvider>
    </BrowserRouter>
  );
};
export default App;
