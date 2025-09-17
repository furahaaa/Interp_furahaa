# Configuration AWS SMS pour la Validation par Téléphone

## 🚀 Vue d'ensemble

Ce guide explique comment configurer AWS Cognito et SNS pour envoyer des SMS de validation dans votre application React Native.

## 📋 Prérequis

- Compte AWS avec accès à Cognito et SNS
- Application React Native configurée avec AWS Amplify
- Numéro de téléphone vérifié dans AWS SNS (pour les tests)

## 🔧 Configuration AWS Cognito

### 1. Créer un User Pool

```bash
# Via AWS CLI
aws cognito-idp create-user-pool \
  --pool-name "InterpUserPool" \
  --policies '{"PasswordPolicy":{"MinimumLength":8,"RequireUppercase":true,"RequireLowercase":true,"RequireNumbers":true,"RequireSymbols":true}}' \
  --auto-verified-attributes phone_number \
  --username-attributes phone_number \
  --mfa-configuration ON \
  --mfa-types SMS
```

### 2. Configuration Interp (Déjà Configurée)

✅ **User Pool créé** : `User pool - kjgoiz`  
✅ **User Pool ID** : `eu-west-3_2XybcjI0G`  
✅ **App Client** : `InterpAppClient - if41pf`  
✅ **App Client ID** : `oh147dc5k4m824vjuocjsqgcd`  
✅ **Région** : `eu-west-3` (Europe - Paris)  
✅ **SMS activés** avec rôle IAM : `arn:aws:iam::392315624942:role/service-role/CognitoIdpSNSServiceRole`  

### 3. Configuration via AWS Console (Recommandée)

1. **Type d'application** : Application mobile
2. **Identifiants de connexion** : Numéro de téléphone + Nom d'utilisateur
3. **Attributs requis** : Numéro de téléphone + E-mail
4. **URL de retour** : `myapp://`
5. **MFA** : Activé avec SMS
6. **Politique de mot de passe** : Renforcée (8+ caractères, majuscules, minuscules, chiffres, symboles)

### 2. Configurer les Triggers Lambda (Optionnel)

```javascript
// Pré-inscription
exports.handler = async (event) => {
  // Validation personnalisée
  if (event.request.userAttributes.phone_number) {
    // Vérifier le format du numéro
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(event.request.userAttributes.phone_number)) {
      throw new Error('Format de numéro invalide');
    }
  }
  
  event.response.autoConfirmUser = false;
  event.response.autoVerifyPhone = false;
  
  return event;
};
```

### 3. Configurer les SMS

```bash
# Activer les SMS dans Cognito
aws cognito-idp update-user-pool \
  --user-pool-id YOUR_USER_POOL_ID \
  --sms-configuration '{"SnsRegion":"us-east-1","SnsCallerArn":"arn:aws:iam::YOUR_ACCOUNT:role/cognito-sms-role"}'
```

## 📱 Configuration React Native

### 1. Installation des Dépendances

```bash
npm install aws-amplify @react-native-async-storage/async-storage zustand
```

### 2. Configuration Amplify

```typescript
// config/amplify.ts
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

export const configureAmplify = () => {
  const config = {
    ...awsconfig,
    Auth: {
      ...awsconfig.Auth,
      autoSignIn: false,
      signUpVerificationMethod: 'code',
      signUpAttributes: ['phone_number'],
      usernameAttributes: ['phone_number'],
    },
  };
  
  Amplify.configure(config);
};
```

### 3. Configuration aws-exports.js (Interp)

```javascript
// aws-exports.js - Configuration spécifique Interp
const awsmobile = {
    "aws_project_region": "eu-west-3",
    "aws_cognito_identity_pool_id": "eu-west-3:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "eu-west-3",
    "aws_user_pools_id": "eu-west-3_2XybcjI0G",
    "aws_user_pools_web_client_id": "oh147dc5k4m824vjuocjsqgcd",
    "oauth": {
        "domain": "interp.auth.eu-west-3.amazoncognito.com",
        "scope": ["phone", "email", "openid", "profile"],
        "redirectSignIn": "myapp://",
        "redirectSignOut": "myapp://",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": ["PHONE_NUMBER"],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": ["PHONE_NUMBER"],
    "aws_cognito_mfa_configuration": "ON",
    "aws_cognito_mfa_types": ["SMS"],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": ["REQUIRES_UPPERCASE", "REQUIRES_LOWERCASE", "REQUIRES_NUMBERS", "REQUIRES_SYMBOLS"]
    }
};

export default awsmobile;
```

### 3. Service d'Authentification

```typescript
// services/authService.ts
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

class AuthService {
  async sendPhoneVerification(phoneNumber: string) {
    try {
      const result = await signUp({
        username: phoneNumber,
        password: this.generateTempPassword(),
        options: {
          userAttributes: {
            phone_number: phoneNumber,
          },
        },
      });
      
      return { success: true, userId: result.userId };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  async verifySMSCode(phoneNumber: string, code: string) {
    try {
      await confirmSignUp({
        username: phoneNumber,
        confirmationCode: code,
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
```

## 🎯 Utilisation dans l'Application

### 1. Saisie du Numéro de Téléphone

```typescript
// inscription_tel.tsx
const handleContinue = async () => {
  const fullPhoneNumber = selectedCountry.code + phoneNumber.trim();
  
  if (!authService.isValidPhoneNumber(fullPhoneNumber)) {
    setErrorMessage('Format de numéro invalide');
    return;
  }
  
  const result = await authService.sendPhoneVerification(fullPhoneNumber);
  
  if (result.success) {
    setStorePhoneNumber(fullPhoneNumber);
    router.push('/verification_sms');
  } else {
    setErrorMessage(result.message);
  }
};
```

### 2. Vérification du Code SMS

```typescript
// verification_sms.tsx
const handleVerifyCode = async () => {
  const code = smsCode.join('');
  
  const result = await authService.verifySMSCode(phoneNumber, code);
  
  if (result.success) {
    setSMSVerified(true);
    router.push('/inscription_first');
  } else {
    setErrorMessage(result.message);
  }
};
```

## 🔒 Sécurité et Bonnes Pratiques

### 1. Limitation des Tentatives

```typescript
// Store d'authentification
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      smsCodeAttempts: 0,
      incrementSMSCodeAttempts: () => set((state) => ({ 
        smsCodeAttempts: state.smsCodeAttempts + 1 
      })),
      resetSMSCodeAttempts: () => set({ smsCodeAttempts: 0 }),
    }),
    { name: 'auth-storage' }
  )
);
```

### 2. Validation des Numéros

```typescript
isValidPhoneNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/[^\d+]/g, '');
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(cleaned);
}
```

### 3. Gestion des Erreurs

```typescript
// Gestion des erreurs AWS
if (error.code === 'InvalidParameterException') {
  return { success: false, message: 'Format de numéro invalide' };
} else if (error.code === 'LimitExceededException') {
  return { success: false, message: 'Trop de tentatives. Réessayez plus tard.' };
}
```

## 💰 Coûts AWS

- **SMS SNS** : ~$0.00645 par SMS (US/EU)
- **Cognito** : Gratuit jusqu'à 50,000 utilisateurs actifs
- **Lambda** : Gratuit jusqu'à 1M d'invocations/mois

## 🧪 Tests

### 1. Test de Configuration Interp

```bash
# Vérifier la configuration AWS
cd myApp
node aws-setup/test-config.js
```

### 2. Test dans l'Application

1. **Redémarrer l'app** : `npm start`
2. **Aller sur** : `inscription_tel.tsx`
3. **Saisir un numéro** : `+33123456789`
4. **Cliquer sur "Continuer"**
5. **Vérifier l'envoi SMS** via AWS Cognito

### 3. Numéros de Test

```typescript
// Utilisez des numéros de test AWS
const testNumbers = [
  '+1234567890', // US
  '+33123456789', // France
  '+447911123456', // UK
];

// Pour Interp, testez avec votre numéro personnel
const interpTestNumber = '+33XXXXXXXXX'; // Votre numéro
```

### 2. Sandbox Mode

```bash
# Activer le mode sandbox pour les tests
aws sns set-sms-attributes \
  --attributes '{"MonthlySpendLimit":"1","DefaultSMSType":"Transactional"}'
```

## 🚨 Dépannage

### Erreurs Courantes

1. **InvalidParameterException** : Format de numéro incorrect
2. **LimitExceededException** : Trop de tentatives
3. **UserLambdaValidationException** : Erreur de validation Lambda
4. **CodeMismatchException** : Code SMS incorrect

### Solutions

```typescript
// Vérifier la configuration
console.log('AWS Config:', awsconfig);

// Vérifier les logs Cognito
aws logs describe-log-groups --log-group-name-prefix "/aws/cognito"

// Tester l'envoi SMS
aws sns publish --phone-number "+1234567890" --message "Test SMS"
```

## 📚 Ressources

- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [AWS SNS SMS Guide](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-phone-number-as-subscriber.html)
- [AWS Amplify Auth](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)
- [React Native Phone Number Input](https://github.com/thegamenicorus/react-native-phone-number-input)

## 🔄 Mise à Jour

Pour mettre à jour la configuration :

1. Modifier `aws-exports.js`
2. Redémarrer l'application
3. Tester avec un nouveau numéro
4. Vérifier les logs AWS CloudWatch

## 📋 Résumé Configuration Interp

### ✅ Ressources AWS Créées

- **User Pool** : `User pool - kjgoiz` (ID: `eu-west-3_2XybcjI0G`)
- **App Client** : `InterpAppClient - if41pf` (ID: `oh147dc5k4m824vjuocjsqgcd`)
- **Région** : `eu-west-3` (Europe - Paris)
- **SMS** : Activés avec rôle IAM configuré
- **MFA** : Activé avec SMS obligatoire

### 🔧 Fichiers Configurés

- `aws-exports.js` : Configuration AWS mise à jour
- `authService.ts` : Service d'authentification SMS
- `authStore.ts` : Store Zustand pour l'état
- `inscription_tel.tsx` : Interface d'envoi SMS
- `verification_sms.tsx` : Interface de vérification

### 🚀 Prêt pour les Tests

Votre application Interp est maintenant configurée pour :
- ✅ Envoyer des SMS via AWS Cognito
- ✅ Valider les numéros de téléphone
- ✅ Gérer l'authentification par SMS
- ✅ Stocker l'état d'authentification

**Configuration complète ! Prêt pour les tests !** 🎉
