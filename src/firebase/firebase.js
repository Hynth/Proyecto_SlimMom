// Importa las dependencias necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de tu aplicación en Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCIM2XWcTfmJC3Wj78_ggjvCvluBJIN5oc',
  authDomain: 'slimmom-379b2.firebaseapp.com',
  projectId: 'slimmom-379b2',
  storageBucket: 'slimmom-379b2.appspot.com',
  messagingSenderId: '840004182207',
  appId: '1:840004182207:web:b33d32d273d93ea036e60a',
  measurementId: 'G-E99C49V04E',
};

// Inicializa la aplicación de Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta las instancias de autenticación y Firestore
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

// Exporta la instancia de la aplicación si es necesario
export default firebaseApp;
