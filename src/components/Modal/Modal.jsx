import React, { useState }from 'react';
import { Link } from "react-router-dom";
import {filterObjectsByGroupBloodNotAllowed} from '../../shared/shared';
import products from '../../resources/productos.json';
import styles from './Modal.module.css'

const Modal = ({ values, onClose }) => {

	const [isModalOpen, setIsModalOpen] = useState(false);

	const formValues = {
		height:values.altura,
		weight:values.pesoActual,
		age:values.edad,
		desiredWeight:values.pesoDeseado,
		bloodType:values.grupoSanguineo
	};

	const dailyRate = 10 * formValues.weight + 6.25 * formValues.height - 5 * formValues.age - 161 - 10 * (formValues.weight - formValues.desiredWeight);

	let notAllowedProducts = filterObjectsByGroupBloodNotAllowed(products, formValues.bloodType, true);
	const notAllowedProductsList = [
		...notAllowedProducts.map((product) => product.title).filter(function (value, index, self) {
			return self.indexOf(value) === index;
		}).splice(0, 4),
	];

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<div className={styles['close-container']}>
					<button className={styles.close} onClick={onClose}>X</button>
				</div>
				<h1 className={styles.title}>Tu ingesta diaria recomendada de calorías es</h1>
				<div className={styles['calories-container']}>
					<h1 className={styles.calories}>{dailyRate}</h1>
					<span className={styles.units}>kcal</span>
				</div>
				<div>
					<h3 className={styles['list-title']}>
						Alimentos que no deberías comer
					</h3>
					<ul className={styles.list}>
						{notAllowedProductsList.map((item, index) => (
						<li key={index} className={styles.items}>{(index+1) + '. ' + notAllowedProductsList[index]}</li>))}
					</ul>
				</div>
				<div className={styles['button-container']}>
					<button
						className={styles['start-button']}
						type="submit">
						<Link to="/register">
						Comienza a perder peso
						</Link>
					</button>
					{isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
				</div>
			</div>
		</div>
	);
}

export default Modal;
