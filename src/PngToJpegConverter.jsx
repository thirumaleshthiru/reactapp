import React, { useState } from 'react';

const PngToJpegConverter = () => {
  const [pngImage, setPngImage] = useState(null);
  const [pngSize, setPngSize] = useState(null);
  const [jpegImage, setJpegImage] = useState(null);
  const [conversionError, setConversionError] = useState(null);
  const [pngFileName, setPngFileName] = useState(null); // Track original PNG file name

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

      // Display the PNG image
      setPngImage(imageUrl);
      setPngSize(file.size);
      setPngFileName(file.name); // Store original PNG file name

      // Convert PNG to JPEG using canvas
      convertPngToJpeg(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const convertPngToJpeg = (imageUrl) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        // Convert canvas to JPEG data URL
        const jpegImageUrl = canvas.toDataURL('image/jpeg');
        setJpegImage(jpegImageUrl);
        setConversionError(null); // Clear any previous conversion error
      } catch (error) {
        console.error('JPEG conversion error:', error);
        setConversionError('Failed to convert PNG to JPEG.');
      }
    };

    img.src = imageUrl;
  };

  const handleDownload = () => {
    if (jpegImage && pngFileName) {
      const link = document.createElement('a');
      link.href = jpegImage;
      link.download = `${pngFileName.replace(/\.[^/.]+$/, '')}.jpg`; // Use original PNG file name with .jpg extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h2>PNG to JPEG Converter</h2>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <br />
      {conversionError && (
        <p style={{ color: 'red' }}>{conversionError}</p>
      )}
      {pngImage && (
        <div>
          <h3>PNG Image</h3>
          <img src={pngImage} alt="PNG" width="300" />
          <p>Original Size: {formatFileSize(pngSize)}</p>
        </div>
      )}
      <br />
      {jpegImage && (
        <div>
          <h3>JPEG Image (Converted)</h3>
          <img src={jpegImage} alt="JPEG" width="300" />
          <p>Converted Size: {formatFileSize(jpegImage.length)}</p>
          <button onClick={handleDownload}>Download JPEG</button>
        </div>
      )}
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default PngToJpegConverter;
