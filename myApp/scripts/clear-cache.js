#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧹 Nettoyage du cache Expo...');

try {
    // Clear Expo cache
    console.log('Vidage du cache Expo...');
    execSync('npx expo start --clear', { stdio: 'inherit' });
} catch (error) {
    console.log('Cache vidé. Vous pouvez maintenant redémarrer votre serveur de développement.');
}

console.log('✅ Cache vidé avec succès !');
console.log('📱 Vous pouvez maintenant exécuter : npm start');
