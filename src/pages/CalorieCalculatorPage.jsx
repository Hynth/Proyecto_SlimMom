import React from 'react';
import Header from '../components/Header/Header';
import CalorieCalculator from '../components/calorieCalculator/caloriesCalculator';

const CalculatorPage = () => {
	return (
		<div>
			<Header currentPage={'Calculator'} />
			<CalorieCalculator currentPage={'Calculadora'} />
		</div>
	);
}

export default CalculatorPage;