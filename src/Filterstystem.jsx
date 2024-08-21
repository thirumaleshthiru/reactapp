 import React, { useState } from 'react';

const products = [

  { id: 1, name: 'Product 1', category: 'Category A', price: 10, color: "red"},
  { id: 2, name: 'Product 2', category: 'Category B', price: 20, color: "orange" },
  { id: 3, name: 'Product 3', category: 'Category A', price: 15, color: "blue" },
  { id: 4, name: 'Product 4', category: 'Category C', price: 25, color: "red" },
  { id: 5, name: 'Product 5', category: 'Category C' },
  { id: 6, name: 'Product 6', price: 25, color: "red" },
 
];

const FilterSelect = ({ options, onSelect }) => {
  const handleChange = (e) => {
    const selectedOption = e.target.value;
    onSelect(selectedOption);
  };

  return (
    <select onChange={handleChange}>
      <option value="">All</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  );
};

const Filterstystem = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const categories = Array.from(new Set(products.map(product => product.category).filter(Boolean)));
  const prices = Array.from(new Set(products.filter(product => typeof product.price === 'number').map(product => product.price)));
  const colors = Array.from(new Set(products.filter(product => typeof product.color === 'string').map(product => product.color)));

  const handleCategoryChange = (selectedCategory) => {
    setCategoryFilter(selectedCategory);
  };

  const handleMinPriceChange = (selectedMinPrice) => {
    setMinPriceFilter(selectedMinPrice);
  };

  const handleMaxPriceChange = (selectedMaxPrice) => {
    setMaxPriceFilter(selectedMaxPrice);
  };

  const handleColorChange = (selectedColor) => {
    setColorFilter(selectedColor);
  };

  const filteredProducts = products.filter((product) => {
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    if (minPriceFilter && product.price < parseInt(minPriceFilter)) {
      return false;
    }
    if (maxPriceFilter && product.price > parseInt(maxPriceFilter)) {
      return false;
    }
    if (colorFilter && product.color !== colorFilter) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1>E-commerce Store</h1>
      <div>
        <FilterSelect
          options={categories}
          onSelect={handleCategoryChange}
        />
        <FilterSelect
          options={prices}
          onSelect={handleMinPriceChange}
        />
        <FilterSelect
          options={prices}
          onSelect={handleMaxPriceChange}
        />
        <FilterSelect
          options={colors}
          onSelect={handleColorChange}
        />
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name || '' }  {product.category || '' }  ${product.price || ''}  {product.color || ''} {product.country || ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filterstystem;
