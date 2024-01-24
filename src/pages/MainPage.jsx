import React, { useState } from 'react';
import Header from '../components/Header/Header';
import CalculatorForm from '../components/CalculatorForm/CalculatorForm'

const MainPage = () => {
	return (
		<div>
			<Header currentPage={'Main'}/>
			<CalculatorForm currentPage={'Main'} />
		</div>
	);
}

export default MainPage;
