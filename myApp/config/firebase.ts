import { initializeApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider } from 'firebase/auth';

// Configuration Firebase - Projet Interp
const firebaseConfig = {
    apiKey: "AIzaSyAMWo-w8I1l-XXzjeBm3YcNC26EHQvGLG8",
    authDomain: "interp-c9f64.firebaseapp.com",
    projectId: "interp-c9f64",
    storageBucket: "interp-c9f64.appspot.com",
    messagingSenderId: "867418689035",
    appId: "1:867418689035:web:interp-app" // À vérifier dans Firebase Console
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Obtenir l'instance d'authentification
export const auth = getAuth(app);

// Provider pour l'authentification par téléphone
export const phoneProvider = new PhoneAuthProvider(auth);

export default app;
