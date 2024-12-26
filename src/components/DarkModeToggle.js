import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../assets/css/darkmodetoggle.css'; // Ensure correct import path

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`dark-mode-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
        >
            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
};

export default DarkModeToggle;
