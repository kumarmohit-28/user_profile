import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { editProfileAPI } from '../services/handle';
import { AccessTokenContext } from '../context/AccessTokenContext';
const ProfileForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const { accessToken} = useContext(AccessTokenContext);
  const navigate = useNavigate();

  const handleProfile = async (profileData) => {
    // try {
      try {
        const response = await editProfileAPI(accessToken,profileData);
        navigate("/profile");

      } catch (error) {
        setMessage(`Error: ${error}`);
      }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      name,
      bio,
    };
    handleProfile(profileData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create/Edit Profile</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <button type="submit">Save Profile</button>
      {message && <p>{message}</p>}

    </form>
  );
};

export default ProfileForm;
