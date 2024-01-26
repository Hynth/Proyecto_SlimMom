import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/diary');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.loginContainer}>
      <Header currentPage={'Login'} />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Iniciar Sesión</h2>
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
        <button onClick={handleLogin} className={styles.loginButton}>
          Iniciar sesion
        </button>
        <button onClick={handleRegisterRedirect} className={styles.registerButton}>
          Crear una cuenta
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;









