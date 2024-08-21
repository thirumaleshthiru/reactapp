import React, { useState, useEffect } from 'react';

const BreathingExerciseGame = () => {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [breathingState, setBreathingState] = useState('exhale');
  const [breathCount, setBreathCount] = useState(0);

  const handleBreath = () => {
    if (breathingState === 'exhale') {
      setCharacterPosition(characterPosition + 1);
    } else {
      setCharacterPosition(characterPosition - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === ' ') {
        setBreathingState((prevState) => (prevState === 'inhale' ? 'exhale' : 'inhale'));
        setBreathCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const breathInterval = setInterval(() => {
      handleBreath();
    }, 10);

    return () => clearInterval(breathInterval);
  }, [breathingState]);

  return (
    <div className="breathing-exercise-game">
      <h2>Breathing Exercise Game</h2>
      <p>Press the spacebar to alternate between inhaling and exhaling.</p>
      <div className="game-container">
        <div
          className="character"
          style={{ top: `${characterPosition}%` }}
        >
          🌬️
        </div>
        <div className="breath-count">Breath Count: {breathCount}</div>
      </div>
    </div>
  );
};

export default BreathingExerciseGame;
