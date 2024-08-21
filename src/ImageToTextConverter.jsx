import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageToTextConverter = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('Please select an image file.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageBase64 = event.target.result;
        setImageSrc(imageBase64);

        const { data: { text } } = await Tesseract.recognize(imageBase64, 'eng', {
          logger: (m) => console.log(m), // Optional logger callback
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // Whitelist of characters to recognize
          tessedit_create_hocr: false, // Disable hOCR output
        });

        setExtractedText(text.trim()); // Trim whitespace from extracted text
        setError('');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Image to Text Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%' }} />}
      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageToTextConverter;
