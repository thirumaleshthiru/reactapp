import React, { useState, useRef, useEffect } from 'react';

function ImageFilter() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterType, setFilterType] = useState('none');
  const canvasRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const applyFilter = (context, filterType) => {
    const imageElement = new Image();
    imageElement.src = selectedImage;
    imageElement.onload = () => {
      const canvas = canvasRef.current;
      const scaleFactor = canvas.width / imageElement.width;
      canvas.height = imageElement.height * scaleFactor;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

      switch (filterType) {
        case 'grayscale':
          context.filter = 'grayscale(100%)';
          break;
        case 'sepia':
          context.filter = 'sepia(100%)';
          break;
        case 'invert':
          context.filter = 'invert(100%)';
          break;
        case 'blur':
          context.filter = 'blur(5px)';
          break;
        case 'brightness':
          context.filter = 'brightness(150%)';
          break;
        case 'contrast':
          context.filter = 'contrast(150%)';
          break;
        case 'hue-rotate':
          context.filter = 'hue-rotate(90deg)';
          break;
        case 'saturate':
          context.filter = 'saturate(200%)';
          break;
        case 'opacity':
          context.filter = 'opacity(50%)';
          break;
        case 'drop-shadow':
          context.filter = 'drop-shadow(4px 4px 10px rgba(0,0,0,0.5))';
          break;
        case 'sepia':
          context.filter = 'sepia(100%)';
          break;
        case 'contrast':
          context.filter = 'contrast(150%)';
          break;
        case 'hue-rotate':
          context.filter = 'hue-rotate(90deg)';
          break;
        case 'invert':
          context.filter = 'invert(100%)';
          break;
        case 'saturate':
          context.filter = 'saturate(200%)';
          break;
        case 'opacity':
          context.filter = 'opacity(50%)';
          break;
        case 'brightness-contrast':
          context.filter = 'brightness(120%) contrast(120%)';
          break;
        case 'sepia-saturate':
          context.filter = 'sepia(80%) saturate(180%)';
          break;
        case 'blur-invert':
          context.filter = 'blur(3px) invert(100%)';
          break;
        case 'hue-rotate-saturate':
          context.filter = 'hue-rotate(180deg) saturate(150%)';
          break;
        case 'brightness-opacity':
          context.filter = 'brightness(130%) opacity(70%)';
          break;
        default:
          context.filter = 'none';
          break;
      }

      context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL();
    downloadLink.download = 'filtered_image.png';
    downloadLink.click();
  };

  useEffect(() => {
    if (selectedImage) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      applyFilter(context, filterType);
    }
  }, [selectedImage, filterType]);

  return (
    <div>
      <h1>Image Filter App</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {selectedImage && (
        <div>
          <h2>Original Image</h2>
          <img
            src={selectedImage}
            alt="original"
            style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
          />

          <h2>Filtered Image</h2>
          <canvas
            ref={canvasRef}
            width={400} // Set the desired canvas width
            height={250} // Set the desired canvas height
            style={{ border: '1px solid black' }}
          />

          <select value={filterType} onChange={handleFilterChange}>
            <option value="none">None</option>
            <option value="grayscale">Grayscale</option>
            <option value="sepia">Sepia</option>
            <option value="invert">Invert</option>
            <option value="blur">Blur</option>
            <option value="brightness">Brightness</option>
            <option value="contrast">Contrast</option>
            <option value="hue-rotate">Hue Rotate</option>
            <option value="saturate">Saturate</option>
            <option value="opacity">Opacity</option>
            <option value="drop-shadow">Drop Shadow</option>
            <option value="brightness-contrast">Brightness & Contrast</option>
            <option value="sepia-saturate">Sepia & Saturate</option>
            <option value="blur-invert">Blur & Invert</option>
            <option value="hue-rotate-saturate">Hue Rotate & Saturate</option>
            <option value="brightness-opacity">Brightness & Opacity</option>
          </select>

          <button onClick={handleDownload}>Download Filtered Image</button>
        </div>
      )}
    </div>
  );
}

export default ImageFilter;
