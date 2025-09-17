# 🖥️ Configuration AWS Cognito - Guide Manuel (Console)

## 📋 Prérequis

- Compte AWS avec accès administrateur
- Navigateur web moderne
- Numéro de téléphone personnel pour les tests

## 🚀 Étape 1 : Créer le User Pool

### 1.1 Accéder à AWS Cognito
1. Aller sur [AWS Console](https://console.aws.amazon.com/)
2. Rechercher "Cognito" dans la barre de recherche
3. Cliquer sur "Amazon Cognito"

### 1.2 Créer un User Pool
1. Cliquer sur **"Create user pool"**
2. **Step 1: Configure sign-in experience**
   - Pool name: `InterpUserPool`
   - Cognito user pool sign-in options: ✅ `Phone number`
   - Cognito user pool sign-in options: ✅ `Allow phone number`
   - Cliquer **"Next"**

3. **Step 2: Configure security requirements**
   - Password policy: `Cognito defaults`
   - MFA: ✅ `Required`
   - MFA methods: ✅ `SMS text message`
   - User account recovery: ✅ `Enable self-service account recovery`
   - Cliquer **"Next"**

4. **Step 3: Configure sign-up experience**
   - Required attributes: ✅ `phone_number`
   - Username attributes: ✅ `phone_number`
   - Cliquer **"Next"**

5. **Step 4: Configure message delivery**
   - SMS delivery: ✅ `Enable SMS delivery`
   - SNS region: `us-east-1` (ou votre région)
   - Cliquer **"Next"**

6. **Step 5: Integrate your app**
   - App client name: `InterpAppClient`
   - Client secret: ❌ `Don't generate a client secret`
   - Cliquer **"Next"**

7. **Step 6: Review and create**
   - Vérifier la configuration
   - Cliquer **"Create user pool"**

## 🔐 Étape 2 : Configurer les Permissions IAM

### 2.1 Créer le Rôle IAM
1. Aller sur [IAM Console](https://console.aws.amazon.com/iam/)
2. Cliquer sur **"Roles"** → **"Create role"**
3. **Trusted entity type**: `AWS service`
4. **Service**: `Cognito`
5. **Use case**: `Cognito - Add Role to User Pool`
6. Cliquer **"Next"**

### 2.2 Attacher les Politiques
1. Rechercher et sélectionner: `AmazonCognitoIdpSmsRole`
2. Cliquer **"Next"**
3. **Role name**: `CognitoSMSRole`
4. **Description**: `Role for Cognito SMS delivery`
5. Cliquer **"Create role"**

### 2.3 Lier le Rôle à Cognito
1. Retourner sur Cognito
2. Sélectionner votre User Pool
3. **Sign-up experience** → **SMS configuration**
4. **SNS caller ARN**: Copier l'ARN du rôle créé
5. Cliquer **"Save changes"**

## 📱 Étape 3 : Configurer AWS SNS

### 3.1 Accéder à SNS
1. Aller sur [SNS Console](https://console.aws.amazon.com/sns/)
2. Cliquer sur **"Text messaging (SMS)"**

### 3.2 Configurer les Limites
1. **SMS preferences**
2. **Monthly spending limit**: `$1.00` (pour les tests)
3. **Default SMS type**: `Transactional`
4. Cliquer **"Save preferences"**

### 3.3 Vérifier votre Numéro (Optionnel)
1. **Phone numbers**
2. **Add phone number**
3. Saisir votre numéro: `+33XXXXXXXXX`
4. Cliquer **"Add phone number"**
5. Vérifier le code reçu par SMS

## ⚙️ Étape 4 : Mettre à Jour la Configuration

### 4.1 Récupérer les Informations
1. **Cognito** → **User Pools** → **InterpUserPool**
2. **App integration** → **App client and analytics**
3. Noter:
   - **User Pool ID**
   - **App client ID**

### 4.2 Mettre à Jour aws-exports.js
Remplacer dans votre fichier `aws-exports.js`:

```javascript
const awsmobile = {
    "aws_project_region": "us-east-1", // Votre région
    "aws_cognito_identity_pool_id": "us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "us-east-1", // Votre région
    "aws_user_pools_id": "VOTRE_USER_POOL_ID", // Copié depuis Cognito
    "aws_user_pools_web_client_id": "VOTRE_APP_CLIENT_ID", // Copié depuis Cognito
    "oauth": {
        "domain": "interp.auth.us-east-1.amazoncognito.com", // Votre région
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
```

## 🧪 Étape 5 : Test de Configuration

### 5.1 Redémarrer l'Application
```bash
# Arrêter et redémarrer Expo
npm start
```

### 5.2 Tester l'Envoi de SMS
1. Aller sur la page d'inscription téléphone
2. Saisir un numéro valide: `+33123456789`
3. Cliquer sur "Continuer"
4. Vérifier que le SMS est reçu

### 5.3 Vérifier les Logs
1. **AWS Console** → **CloudWatch** → **Log groups**
2. Rechercher: `/aws/cognito/InterpUserPool`
3. Vérifier les logs d'inscription

## 🚨 Dépannage

### Erreur: "InvalidParameterException"
- Vérifier le format du numéro (+33...)
- Vérifier que les SMS sont activés dans Cognito

### Erreur: "LimitExceededException"
- Attendre quelques minutes
- Vérifier les limites SNS

### Erreur: "UserLambdaValidationException"
- Vérifier la configuration Lambda
- Vérifier les permissions IAM

### Pas de SMS reçu
- Vérifier la configuration SNS
- Vérifier les limites de coût
- Vérifier le numéro de téléphone

## 💰 Coûts Estimés

- **Cognito**: Gratuit jusqu'à 50,000 utilisateurs actifs
- **SMS SNS**: ~$0.00645 par SMS (US/EU)
- **Lambda**: Gratuit jusqu'à 1M d'invocations/mois

## 🔒 Sécurité

- Limites de coût configurées
- Validation des numéros de téléphone
- MFA obligatoire
- Politiques de mot de passe strictes

## 📞 Support

En cas de problème:
1. Vérifier les logs CloudWatch
2. Vérifier la configuration IAM
3. Tester avec un numéro vérifié
4. Consulter la [documentation AWS](https://docs.aws.amazon.com/cognito/)
