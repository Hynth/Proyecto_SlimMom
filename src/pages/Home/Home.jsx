import React from 'react';
import Header from '../../components/Header/Header';
import CalculatorForm from '../../components/CalculatorForm/CalculatorForm'
import sH from '../Home/Home.module.css';

const Home = () => {
	return (
		<div className={sH.mainPage}>
			<Header currentPage={'Main'} />
			<CalculatorForm currentPage={'Main'} />
		</div>
	);
}

export default Home;
