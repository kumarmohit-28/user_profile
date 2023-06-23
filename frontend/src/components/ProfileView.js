import React, { useContext, useEffect, useState } from 'react';
import {  useNavigate  } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { profileAPI } from '../services/handle';
import { AccessTokenContext } from '../context/AccessTokenContext';
const Profile = () => {
  const { user } = useContext(UserContext);
  const {accessToken}=useContext(AccessTokenContext);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
// console.log(user);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI(accessToken);
        console.log(response)
        setProfileData(response.data);
      } catch (error) {
        navigate("/edit-profile");
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user}</p>
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Bio: {profileData.bio}</p>
          {/* Display other profile details */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  );
};

export default Profile;
