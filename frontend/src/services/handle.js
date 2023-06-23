import axios from 'axios';

// Register API
export const registerAPI = async (userData) => {
  // try {
    const response = await axios.post('http://localhost:8000/api/register/', userData);
    return response; 
};

export const loginAPI = async (userData) => {
  // try {
    const response = await axios.post('http://localhost:8000/api/login/', userData);
    return response; 
};

export const profileAPI = async (token) => {
  
    const response = await axios.get('http://localhost:8000/api/profile/',{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response; 
};
export const editProfileAPI = async (token,profileData) => {
  console.log(token);
  console.log(profileData);
  
    const response = await axios.put('http://localhost:8000/api/edit-profile/',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response; }