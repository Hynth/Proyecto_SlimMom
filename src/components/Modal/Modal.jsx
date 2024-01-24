import React, { useState }from 'react';
import { Link } from "react-router-dom";
import styles from './Modal.module.css'

const Modal = ({ onClose }) => {

	const [isModalOpen, setIsModalOpen] = useState(false);

	// const { dailyRate, notAllowedProducts, notAllowedProductsAll } = data
	const data = {
		calories:3500,
		notAllowedProducts:[
			'Productos de harina',
			'Leche',
			'Carne roja',
			'Carnes ahumadas',
		]
	};

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<div className={styles['close-container']}>
					<button className={styles.close} onClick={onClose}>X</button>
				</div>
				<h1 className={styles.title}>Tu ingesta diaria recomendada de calorías es</h1>
				<div className={styles['calories-container']}>
					<h1 className={styles.calories}>{data.calories}</h1>
					<span className={styles.units}>kcal</span>
				</div>
				<div>
					<h3 className={styles['list-title']}>
						Alimentos que no deberías comer
					</h3>
					<ul className={styles.list}>
						{data.notAllowedProducts.map((item, index) => (
						<li key={index} className={styles.items}>{(index+1) + '. ' + item}</li>))}
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
