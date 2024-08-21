import React, { useState } from 'react';

const JpegToPngConverter = () => {
  const [jpegImage, setJpegImage] = useState(null);
  const [jpegSize, setJpegSize] = useState(null);
  const [pngImage, setPngImage] = useState(null);
  const [conversionError, setConversionError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

      // Display the JPEG image
      setJpegImage(imageUrl);
      setJpegSize(file.size);

      // Convert JPEG to PNG using canvas
      convertJpegToPng(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const convertJpegToPng = (imageUrl) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        // Convert canvas to PNG data URL
        const pngImageUrl = canvas.toDataURL('image/png');
        setPngImage(pngImageUrl);
        setConversionError(null); // Clear any previous conversion error
      } catch (error) {
        console.error('PNG conversion error:', error);
        setConversionError('Failed to convert JPEG to PNG.');
      }
    };

    img.src = imageUrl;
  };

  const handleDownload = () => {
    if (pngImage) {
      const link = document.createElement('a');
      link.href = pngImage;
      link.download = 'converted_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h2>JPEG to PNG Converter</h2>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <br />
      {conversionError && (
        <p style={{ color: 'red' }}>{conversionError}</p>
      )}
      {jpegImage && (
        <div>
          <h3>JPEG Image</h3>
          <img src={jpegImage} alt="JPEG" width="300" />
          <p>Original Size: {formatFileSize(jpegSize)}</p>
        </div>
      )}
      <br />
      {pngImage && (
        <div>
          <h3>PNG Image (Converted)</h3>
          <img src={pngImage} alt="PNG" width="300" />
          <p>Converted Size: {formatFileSize(pngImage.length)}</p>
          <button onClick={handleDownload}>Download PNG</button>
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

export default JpegToPngConverter;
