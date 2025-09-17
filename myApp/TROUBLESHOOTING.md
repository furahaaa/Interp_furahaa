# Guide de Dépannage

## Erreur de Module AWS Amplify

Si vous rencontrez l'erreur "Requiring unknown module '2174'" ou des erreurs similaires de chargement de modules AWS Amplify, suivez ces étapes :

### Solution Rapide pour Expo Go

1. **Redémarrer le serveur de développement :**
   ```bash
   npm start
   ```

2. **Vider le cache d'Expo :**
   ```bash
   npx expo start --clear
   ```

### Si le problème persiste :

1. **Vider tous les caches :**
   ```bash
   npx expo start --clear
   ```

2. **Supprimer node_modules et réinstaller :**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Réinitialiser le cache Metro :**
   ```bash
   npx expo start --reset-cache
   ```

### Configuration AWS pour Expo Go

**Important :** L'application est maintenant configurée pour fonctionner avec Expo Go sans AWS Amplify. Les services utilisent des données simulées (mock) dans Expo Go.

### Mode Expo Go

L'application inclut des mécanismes de secours pour Expo Go :
- Réponses d'authentification simulées
- Stockage de données utilisateur simulé
- Gestion d'erreurs gracieuse

### Configuration pour Production

Pour le déploiement en production (build natif) :

1. **Configurer AWS Amplify CLI :**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialiser Amplify dans votre projet :**
   ```bash
   amplify init
   ```

3. **Ajouter l'authentification :**
   ```bash
   amplify add auth
   ```

4. **Ajouter le stockage :**
   ```bash
   amplify add storage
   ```

5. **Pousser les changements :**
   ```bash
   amplify push
   ```

### Différences entre Expo Go et Build Natif

- **Expo Go :** Utilise des données simulées, pas d'AWS Amplify
- **Build Natif :** Utilise AWS Amplify avec de vraies données

### Problèmes Courants

1. **Erreurs de module non trouvé :** Vider le cache Metro
2. **Erreurs de configuration AWS :** Vérifier les identifiants dans aws-exports.js
3. **Erreurs réseau :** S'assurer d'une connexion internet appropriée pour les services AWS

###  Support

Si les problèmes persistent, consultez :
- Documentation Expo : https://docs.expo.dev/
- Documentation AWS Amplify : https://docs.amplify.aws/
- Documentation React Native : https://reactnative.dev/
