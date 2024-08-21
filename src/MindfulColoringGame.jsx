import React, { useState } from 'react';

const MindfulColoringGame = () => {
  const [currentColor, setCurrentColor] = useState('#000000'); // Initial color (black)
  const [isDrawing, setIsDrawing] = useState(false); // State to track drawing

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (isDrawing) {
      const canvas = event.target;
      const ctx = canvas.getContext('2d');

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.fillStyle = currentColor;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const changeColor = (newColor) => {
    setCurrentColor(newColor);
  };

  return (
    <div className="mindful-coloring-game">
      <h2>Mindful Coloring Game</h2>
      <p>Click and drag to color the canvas.</p>
      <div className="color-palette">
        <button onClick={() => changeColor('#000000')} style={{ backgroundColor: '#000000' }}></button>
        <button onClick={() => changeColor('#FF0000')} style={{ backgroundColor: '#FF0000' }}></button>
        <button onClick={() => changeColor('#00FF00')} style={{ backgroundColor: '#00FF00' }}></button>
        <button onClick={() => changeColor('#0000FF')} style={{ backgroundColor: '#0000FF' }}></button>
        <button onClick={() => changeColor('#FFFF00')} style={{ backgroundColor: '#FFFF00' }}></button>
        <button onClick={() => changeColor('#FF00FF')} style={{ backgroundColor: '#FF00FF' }}></button>
      </div>
      <canvas
        className="coloring-canvas"
        width={600}
        height={400}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
      ></canvas>
    </div>
  );
};

export default MindfulColoringGame;
