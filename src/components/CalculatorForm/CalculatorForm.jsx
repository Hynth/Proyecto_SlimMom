import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal/Modal'
import styles from './CalculatorForm.module.css'

const CalculatorForm = () => {
	const [activeLabel, setActiveLabel] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInputChange = labelFor => {
		setActiveLabel(labelFor);
	};

	const opcionesGrupoSanguineo = ['1', '2', '3', '4'];

	const validationSchema = Yup.object().shape({
		altura: Yup.number().required('Altura es requerida'),
		edad: Yup.number().required('Edad es requerida'),
		pesoActual: Yup.number().required('Peso actual es requerido'),
		pesoDeseado: Yup.number().required('Peso deseado es requerido'),
		grupoSanguineo: Yup.string().required('Grupo sanguíneo es requerido'),
	});

	const formik = useFormik({
		initialValues: {
			altura: '',
			edad: '',
			pesoActual: '',
			pesoDeseado: '',
			grupoSanguineo: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log('Formulario enviado con éxito:', values);
		},
	});

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				setIsModalOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className={styles.calculator}>
			<h1 className={styles['calculator-title']}>
				Calcula tu ingesta diaria de calorías ahora mismo
			</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.formulario}>
					<div className={styles.columna}>
						<label
							htmlFor="altura"
							className={`${styles['formulario-label']} ${activeLabel === 'altura' ? styles['formulario-label-clicked'] : ''
								}`}
							onClick={() => handleInputChange('altura')}
						>
							Altura*
						</label>
						<input
							id="altura"
							name="altura"
							type="number"
							className={styles['formulario-input']}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.altura}
						/>
						{formik.touched.altura && formik.errors.altura ? (
							<div className={styles['required_input']}>{formik.errors.altura}</div>
						) : null}

						<label
							htmlFor="edad"
							className={`${styles['formulario-label']} ${activeLabel === 'edad' ? styles['formulario-label-clicked'] : ''
								}`}
							onClick={() => handleInputChange('edad')}
						>
							Edad*
						</label>
						<input
							id="edad"
							name="edad"
							type="number"
							className={styles['formulario-input']}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.edad}
						/>
						{formik.touched.edad && formik.errors.edad ? (
							<div className={styles['required_input']}>{formik.errors.edad}</div>
						) : null}

						<label
							htmlFor="pesoActual"
							className={`${styles['formulario-label']} ${activeLabel === 'pesoActual'
								? styles['formulario-label-clicked'] : ''	}`}
							onClick={() => handleInputChange('pesoActual')}
						>
							Peso actual*
						</label>
						<input
							id="pesoActual"
							name="pesoActual"
							type="number"
							className={styles['formulario-input']}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.pesoActual}
						/>
						{formik.touched.pesoActual && formik.errors.pesoActual ? (
							<div className={styles['required_input']}>{formik.errors.pesoActual}</div>
						) : null}
					</div>

					<div className={styles.columna}>
						<label
							htmlFor="pesoDeseado"
							className={`${styles['formulario-label']} ${activeLabel === 'pesoDeseado'
								? styles['formulario-label-clicked'] : '' }`}
							onClick={() => handleInputChange('pesoDeseado')}
						>
							Peso deseado*
						</label>
						<input
							id="pesoDeseado"
							name="pesoDeseado"
							type="number"
							className={styles['formulario-input']}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.pesoDeseado}
						/>
						{formik.touched.pesoDeseado && formik.errors.pesoDeseado ? (
							<div className={styles['required_input']}>{formik.errors.pesoDeseado}</div>
						) : null}

						<label className={styles['formulario-label']}>Grupo sanguíneo*</label>
						<div className={styles['grupoSanguineo-options']}>
								{opcionesGrupoSanguineo.map((opcion) => (
									<div key={opcion}>	
										<input
											type='radio'
											id={opcion}
											name="grupoSanguineo"
											value={opcion}
											defaultChecked={formik.values.grupoSanguineo === opcion}
											onChange={() => formik.handleChange({ target: { name: 'grupoSanguineo', value: opcion } })}
										/>
										

										<label htmlFor={opcion}>{opcion}</label>
									</div>
								))}
								{formik.touched.grupoSanguineo && formik.errors.grupoSanguineo ? (
									<div className={styles['required_input']}>{formik.errors.grupoSanguineo}</div>
								) : null}
							</div>
					</div>
				</div>
				<div className={styles['button-container']}>
					<button
						className={styles['start-button']}
						type="submit"
						onClick={() => setIsModalOpen(true)}
					>
						Comienza a perder peso
					</button>
					{isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
				</div>
			</form>
		</div>
	);
}

export default CalculatorForm;
