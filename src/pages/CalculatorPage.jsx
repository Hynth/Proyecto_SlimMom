import React from 'react';
import Header from '../components/Header/Header';
import CaloriesCalculatorForm from '../components/CaloriesCalculatorForm/CaloriesCalculatorForm';

const CalculatorPage = () => {
	return (
		<div>
			<Header currentPage={'Calculator'} />
			<CaloriesCalculatorForm currentPage={'Calculator'} />
		</div>
	);
}

export default CalculatorPage;
