import React from 'react';
import Header from '../components/Header/Header';
import CalculatorForm from '../components/CalculatorForm/CalculatorForm';

const CalculatorPage = () => {
	return (
		<div>
			<Header currentPage={'Calculator'} />
			<CalculatorForm currentPage={'Calculator'} />
		</div>
	);
}

export default CalculatorPage;
