import React from 'react';
import { createRoot } from 'react-dom/client';  // Asegúrate de que la ruta sea correcta
import App from './calorieCalculator/app.js';  // Asegúrate de que la ruta sea correcta

const root = createRoot(document.getElementById('root'));

// Renderiza tu aplicación usando root.render
root.render(<App />);
