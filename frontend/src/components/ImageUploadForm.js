import React, { useState } from 'react';

const ImageUploadForm = ({ handleImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    handleImageUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Image</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;
