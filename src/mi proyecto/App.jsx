import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import CalculatorPage from '../pages/CalculatorPage'

const App = () => {
  return (
    <div>
			<Routes>
				<Route
					path="/calculator"
					element={<CalculatorPage />} />
			</Routes>
    </div>
  );
};

export default App;
