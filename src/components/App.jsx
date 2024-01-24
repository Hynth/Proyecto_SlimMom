import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home/Home.jsx'
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import DiaryPage from '../pages/DiaryPage';
import Header from './Header/Header';
import styles from './Header/Header.module.css'
import CaloriesCalculator from './calorieCalculator/caloriesCalculator';

const App = () => {
  return (
    <div>
			<CaloriesCalculator/>
    </div>
  );
};

export default App;
