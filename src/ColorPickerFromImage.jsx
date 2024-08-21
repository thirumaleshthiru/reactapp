import React, { useState, useRef } from 'react';

const ColorPickerFromImage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [hoveredColor, setHoveredColor] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleMouseMove = (e) => {
    if (imageSrc && imgRef.current) {
      const img = imgRef.current;
      const bounds = img.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      setHoveredColor(hexColor);
      setMousePosition({ x, y });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageSrc && (
        <div style={{ position: 'relative' }}>
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: '100%' }}
            onMouseMove={handleMouseMove}
          />
          {mousePosition && (
            <div
              style={{
                position: 'absolute',
                left: mousePosition.x,
                top: mousePosition.y,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none', // Disable mouse events on the circle
              }}
            />
          )}
          {hoveredColor && (
            <div
              style={{
                position: 'absolute',
                left: mousePosition.x + 15,
                top: mousePosition.y - 15,
                backgroundColor: '#fff',
                padding: '5px',
                borderRadius: '3px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                zIndex: 999, 
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: hoveredColor,
                  border: '1px solid #ccc',
                  marginRight: '5px',
                }}
              />
              <span>{hoveredColor}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPickerFromImage;
