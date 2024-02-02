// App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistrationPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DiaryPage from './pages/DiaryPage';
import CalculatorPage from './pages/CalculatorPage';
import { auth } from './firebase/firebase';

const App = () => {
  return (
    <AuthProvider auth={auth}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
