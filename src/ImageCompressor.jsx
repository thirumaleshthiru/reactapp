import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [compressionError, setCompressionError] = useState(null);

  // Function to convert bytes to megabytes (MB)
  const bytesToMB = (bytes) => {
    if (bytes === 0) return '0 MB';
    const mbSize = bytes / (1024 * 1024); // Convert bytes to megabytes
    return `${mbSize.toFixed(2)} MB`;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Reset previous state
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(null);
    setCompressedSize(null);
    setCompressionError(null);

    try {
  
      const originalImageUrl = URL.createObjectURL(file);
      setOriginalImage(originalImageUrl);
      setOriginalSize(file.size);

     
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight:800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

     
      const compressedImageUrl = URL.createObjectURL(compressedFile);
      setCompressedImage(compressedImageUrl);
      setCompressedSize(compressedFile.size);
    } catch (error) {
      console.error('Image compression error:', error);
      setCompressionError('Failed to compress the image.');
    }
  };

  return (
    <div>
      <h2>Image Compressor</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      {compressionError && (
        <p style={{ color: 'red' }}>{compressionError}</p>
      )}
      {originalImage && (
        <div>
          <h3>Original Image</h3>
          <img src={originalImage} alt="Original" width="300" />
          <p>Original Size: {bytesToMB(originalSize)}</p>
        </div>
      )}
      <br />
      {compressedImage && (
        <div>
          <h3>Compressed Image</h3>
          <img src={compressedImage} alt="Compressed" width="300" />
          <p>Compressed Size: {bytesToMB(compressedSize)}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
