import React, { useState } from 'react';
import './App.css'

const ColorPaletteCreator = () => {
  const initialColors = {
    section1: '#FF5733',
    section2: '#55ACEE',
    section3: '#FFC300',
    section4: '#8E44AD'
  };

  const [colors, setColors] = useState(initialColors);
  const [palettes, setPalettes] = useState([]);

  const handleColorChange = (section, color) => {
    setColors({ ...colors, [section]: color });
  };

  const isPaletteUnique = (newPalette) => {
    const paletteStrings = palettes.map((palette) => JSON.stringify(palette));
    return !paletteStrings.includes(JSON.stringify(newPalette));
  };

  const handleSubmitPalette = () => {
    const newPalette = { ...colors };

    if (isPaletteUnique(newPalette)) {
      setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
    }

    setColors(initialColors);
  };

  return (
    <div>
      <div className="palette-container">
        <div className="palette-section" style={{ flex: 6 }}>
          <input
            type="color"
            value={colors.section1}
            onChange={(e) => handleColorChange('section1', e.target.value)}
          />
        </div>
        <div className="palette-section" style={{ flex: 2 }}>
          <input
            type="color"
            value={colors.section2}
            onChange={(e) => handleColorChange('section2', e.target.value)}
          />
        </div>
        <div className="palette-section" style={{ flex: 1 }}>
          <input
            type="color"
            value={colors.section3}
            onChange={(e) => handleColorChange('section3', e.target.value)}
          />
        </div>
        <div className="palette-section" style={{ flex: 1 }}>
          <input
            type="color"
            value={colors.section4}
            onChange={(e) => handleColorChange('section4', e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSubmitPalette}>Submit Palette</button>

      <div className="palettes-container">
        {palettes.map((palette, index) => (
          <div className="palette" key={index}>
            {Object.entries(palette).map(([section, color]) => (
              <div
                className="palette-color"
                key={section}
                style={{ backgroundColor: color }}
              >
                <span className="color-hex">{color}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteCreator;
