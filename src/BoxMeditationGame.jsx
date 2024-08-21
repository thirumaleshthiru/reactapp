import React, { useState, useEffect } from 'react';
import './BoxMeditationGame.css'; // Import CSS file for component styling

const BoxMeditationGame = () => {
  const [boxes, setBoxes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to generate random boxes with initial positions
  const generateBoxes = () => {
    const newBoxes = [];
    for (let i = 0; i < 5; i++) {
      const box = {
        id: i,
        top: Math.floor(Math.random() * 300) + 50,
        left: Math.floor(Math.random() * 500) + 50,
        color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
        speedX: Math.random() * 2 - 1, // Random horizontal speed (-1 to 1)
        speedY: Math.random() * 2 - 1, // Random vertical speed (-1 to 1)
      };
      newBoxes.push(box);
    }
    setBoxes(newBoxes);
  };

  // Function to update box positions (animation)
  const updateBoxes = () => {
    if (!isPlaying) return;

    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => ({
        ...box,
        top: box.top + box.speedY,
        left: box.left + box.speedX,
      }))
    );
  };

  // Use effect to update box positions periodically
  useEffect(() => {
    const animationFrame = requestAnimationFrame(updateBoxes);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, boxes]);

  // Function to start or stop the meditation
  const toggleMeditation = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      generateBoxes();
    }
  };

  return (
    <div className="box-meditation-game">
      <h2>Box Meditation Game</h2>
      <p>Click the button to start the meditation.</p>
      <button onClick={toggleMeditation}>{isPlaying ? 'Stop Meditation' : 'Start Meditation'}</button>
      <div className="box-container">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="box"
            style={{ top: box.top, left: box.left, backgroundColor: box.color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BoxMeditationGame;
