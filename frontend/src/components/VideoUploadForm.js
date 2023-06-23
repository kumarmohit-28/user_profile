import React, { useState } from 'react';

const VideoUploadForm = ({ handleVideoUpload }) => {
  const [video, setVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video);
    handleVideoUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Video</h2>
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default VideoUploadForm;
