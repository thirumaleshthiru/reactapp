import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const element = document.querySelector("#root");

const root = ReactDOM.createRoot(element);

root.render(
<BrowserRouter><App /></BrowserRouter>
)