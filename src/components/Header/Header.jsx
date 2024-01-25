import React, { useState }from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css'
import '../../css/stylesCalories.css';

const Header = ({ currentPage }) => {
	return (
		<div>
			<div className={styles.header}>
				<div className={styles['logo-container']}>
					<div className={styles.logo}></div>
				</div>
				<div className={styles.navigation}>
					<div className={styles['icon-hamburger']}></div>
					<div className={styles['buttons-container']}>
						{(() => {
							if (currentPage === 'Main' || currentPage === 'Register' || currentPage === 'Login') {
								return (
									<>
										<Link to="/login" className={styles['page-navigation']}>
											INICIAR SESION
										</Link>
										<Link to="/register" className={styles['page-navigation']}>
											CREAR UNA CUENTA
										</Link>
									</>
								);
							} else {
								return (
									<>
										<Link to="/diary" className={styles['page-navigation']}>
											DIARIO
										</Link>
										<Link to="/calculator" className={styles['page-navigation']}>
											CALCULADORA
										</Link>
									</>
								);
							}
						})()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
