import React, { useEffect, useState } from 'react';

const MediaListing = () => {
  const [profile, setProfile] = useState({});
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch media listing from the backend API and update the state
    // You can use axios or fetch for the API request
    const fetchData = async () => {
      try {
        const response = await fetch('/api/media_listing/');
        const data = await response.json();
        setProfile(data.profile);
        setImages(data.images);
        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching media listing:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Bio: {profile.bio}</p>

      <h2>Images</h2>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.url} alt="Profile" />
        </div>
      ))}

      <h2>Videos</h2>
      {videos.map((video) => (
        <div key={video.id}>
          <video controls>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default MediaListing;
