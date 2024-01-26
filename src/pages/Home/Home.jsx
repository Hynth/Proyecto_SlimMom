import React from 'react';
import Header from '../../components/Header/Header';
import sH from '../Home/Home.module.css';
import CaloriesCalculatorForm from '../../components/CaloriesCalculatorForm/CaloriesCalculatorForm';

const Home = () => {
	return (
		<div className={sH.mainPage}>
			<Header currentPage={'Main'} />
			<CaloriesCalculatorForm currentPage={'Main'} />
		</div>
	);
}

export default Home;
