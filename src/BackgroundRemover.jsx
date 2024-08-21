import React, { useState } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';

const BackgroundRemover = () => {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setInputImage(imageUrl);

    setProcessing(true);
    const net = await bodyPix.load();

    const imageElement = new Image();
    imageElement.src = imageUrl;

    imageElement.onload = async () => {
      const segmentation = await net.segmentPerson(imageElement);
      const maskData = segmentation.data;

      const canvas = document.createElement('canvas');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(imageElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const imageDataArray = imageData.data;

      // Set alpha channel (transparency) based on mask
      for (let i = 0; i < maskData.length; i++) {
        if (!maskData[i]) {
          // Set transparency for background pixels
          imageDataArray[i * 4 + 3] = 0; // Alpha channel
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const modifiedImageUrl = canvas.toDataURL('image/png');

      setOutputImage(modifiedImageUrl);
      setProcessing(false);
    };
  };

  return (
    <div>
      <h1>Background Remover</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {processing && <p>Processing...</p>}
      {inputImage && (
        <div>
          <h2>Input Image</h2>
          <img src={inputImage} alt="Input" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {outputImage && (
        <div>
          <h2>Output Image (Background Removed)</h2>
          <img src={outputImage} alt="Output" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default BackgroundRemover;
