// RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(userCredential.user, {
                displayName: name,
            });

            history('/diary');
        } catch (error) {
            setError(error.message);
        }
    };

const handleLoginRedirect = () => {
        history('/login');
    };

    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.title}>Registro</h2>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    placeholder="Nombre*"
                    required
                />
                <label className={styles.label}></label>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="Correo Electrónico*"
                    required
                />
                <label className={styles.label}></label>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Contraseña*"
                    required
                />
                <label className={styles.label}></label>
            </div>
            <button onClick={handleRegister} className={styles.registerButton}>
                Registro
            </button>
            <button onClick={handleLoginRedirect} className={styles.loginButton}>
                Iniciar Sesión
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default RegisterForm;




