import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// Optional performance measurement
// reportWebVitals();
