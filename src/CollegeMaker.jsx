import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const CollageMaker = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const stageRef = useRef();

  const handleImageUpload = (e) => {
    const newPhotos = Array.from(e.target.files).slice(0, 6);
    setPhotos(newPhotos);
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = uri;
    link.download = 'collage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Define placeholder templates using basic shapes and colors
  const templates = [
    { id: 1, pattern: () => <Rect width={800} height={800} fill="lightblue" /> },
    { id: 2, pattern: () => <Rect width={800} height={800} fill="lightyellow" /> },
    { id: 3, pattern: () => <Rect width={800} height={800} fill="lightgreen" /> },
    { id: 4, pattern: () => <Rect width={800} height={800} fill="lightcoral" /> },
    { id: 5, pattern: () => <Rect width={800} height={800} fill="lightpink" /> },
  ];

  return (
    <div>
      <h2>Collage Maker</h2>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Select Template:</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: selectedTemplate === template.id ? 'gray' : 'white',
                cursor: 'pointer',
              }}
            >
              {template.pattern()}
            </div>
          ))}
        </div>
      </div>

      <Stage width={800} height={800} ref={stageRef}>
        <Layer>
          {templates.find((template) => template.id === selectedTemplate)?.pattern()}
          {photos.map((photo, index) => (
            <Text key={index} text={`Image ${index + 1}`} x={200 * (index % 3)} y={200 * Math.floor(index / 3)} fontSize={20} />
          ))}
        </Layer>
      </Stage>

      {photos.length > 0 && (
        <button style={{ marginTop: '20px' }} onClick={handleDownload}>
          Download Collage
        </button>
      )}
    </div>
  );
};

export default CollageMaker;
