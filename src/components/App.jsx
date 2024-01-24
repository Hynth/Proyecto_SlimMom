import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home/Home'
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import DiaryPage from '../pages/DiaryPage';
import CalculatorPage from '../pages/CalculatorPage'

const App = () => {
  return (
    <div>
			<Routes>
				<Route
					path="/"
					element={<Home />} />
				<Route
					path="/register"
					element={<RegistrationPage />} />
				<Route
					path="/login"
					element={<LoginPage />} />
				<Route
					path="/diary"
					element={<DiaryPage />} />
				<Route
					path="/calculator"
					element={<CalculatorPage />} />
			</Routes>
    </div>
  );
};

export default App;
