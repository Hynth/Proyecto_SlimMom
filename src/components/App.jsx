import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainPage from '../pages/MainPage';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from '../pages/LoginPage';
import DiaryPage from '../pages/DiaryPage';
import Header from './Header/Header';
import styles from './Header/Header.module.css';
import {Home } from './Home/Home.jsx';

const App = () => {
  return (
	  <div><Home>
		    <Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/register" element={<RegistrationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/diary" element={<DiaryPage />} />
			</Routes>	
	  </Home>
		  
		 
    </div>
  );
};

export default App;
