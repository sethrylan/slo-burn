import React from 'react';
import { useTheme } from '../utils/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="theme-toggle">
      <button onClick={toggleDarkMode} className="toggle-button">
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeToggle;
