import React, { useState, useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';
import '../../css/stylesCalories.css';

const DietInfo = () => {
	const [currentDate, setCurrentDate] = useState('');

	useEffect(() => {
		const today = new Date();
		setCurrentDate(today.toLocaleDateString());
	}, []);

	return (
		<div>
			<div className="bloque2">
				<p className="userName">Nic</p>
				<button className="boton-salir">Salir</button>

				<div className="resumen">
					<h2>
						Resumen para el <span id="fechaHoy">{currentDate}</span>
					</h2>
					<div className="resumen-item">
						<p>Consumido</p>
						<p className="valor">000 Kcal</p>
					</div>
					<div className="resumen-item">
						<p>Daily Rate</p>
						<p className="valor">000 Kcal</p>
					</div>
					<div className="resumen-item">
						<p>n% de lo normal</p>
						<p className="valor">000 Kcal</p>
					</div>
				</div>

				<h2 className="alimentos">Alimentos no recomendados</h2>
				<p className="dieta">Tu dieta se mostrará aquí</p>
				{/* <img src={leavesImage} alt="Logo" className="leaves" /> */}
			</div>
		</div>
	);
}

export default DietInfo;
