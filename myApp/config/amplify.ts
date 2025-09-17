import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

// Configuration d'AWS Amplify
export const configureAmplify = () => {
    try {
        Amplify.configure(awsconfig);
        console.log('AWS Amplify configuré avec succès');
    } catch (error) {
        console.error('Erreur lors de la configuration d\'AWS Amplify:', error);
    }
};

// Configuration spécifique pour React Native
export const configureAmplifyForReactNative = () => {
    try {
        const reactNativeConfig = {
            ...awsconfig,
            // Configuration spécifique pour React Native
            Auth: {
                ...awsconfig.Auth,
                // Désactiver la vérification automatique des attributs
                autoSignIn: false,
                // Configuration des attributs requis
                signUpVerificationMethod: 'code',
                // Configuration des attributs d'inscription
                signUpAttributes: ['phone_number'],
                // Configuration des attributs de connexion
                usernameAttributes: ['phone_number'],
            },
        };

        Amplify.configure(reactNativeConfig);
        console.log('AWS Amplify configuré pour React Native');
    } catch (error) {
        console.error('Erreur lors de la configuration d\'AWS Amplify pour React Native:', error);
    }
};
