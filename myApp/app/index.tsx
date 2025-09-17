import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { Platform } from 'react-native';


export default function Index() {
    useEffect(() => {
        // Forcer la redirection vers splash.tsx immédiatement
        if (Platform.OS === 'android') {
            // Sur Android, rediriger immédiatement
            router.replace('/splash');
        } else {
            // Sur iOS/web, petit délai
            const timer = setTimeout(() => {
                router.push('/splash');
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []);

    // Afficher un écran de chargement minimal sur Android
    if (Platform.OS === 'android') {
        return null;
    }

    return null; // Pas de rendu car on redirige
}
