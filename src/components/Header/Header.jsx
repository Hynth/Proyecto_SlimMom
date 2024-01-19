import React, { useState }from 'react';
import styles from './Header.module.css'
import '../../css/stylesCalories.css';

const Header = () => {
	const [currentPage, setCurrentPage] = useState('diario');

	const handlePageChange = page => {
		setCurrentPage(page);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles['logo-container']}>
					<div className={styles.logo}></div>
				</div>
				<div className={styles.navigation}>
					<div className={styles['icon-hamburger']}></div>
					<div className={styles['buttons-container']}>
						<button
							className={styles['page-navigation']/* `page-navigation ${currentPage === 'diario' ? 'active' : ''
						}`}
						onClick={() => handlePageChange('diario') */}
						>
							INICIAR SESION
						</button>
						<button
							className={styles['page-navigation']/* `page-navigation ${currentPage === 'calculadora' ? 'active' : ''
						}`}
						onClick={() => handlePageChange('calculadora') */}
						>
							REGISTRO
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
