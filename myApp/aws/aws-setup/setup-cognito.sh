#!/bin/bash

# Script de configuration AWS Cognito pour Interp
# Assurez-vous d'avoir AWS CLI configuré avec les bonnes permissions

set -e

echo "🚀 Configuration AWS Cognito pour Interp..."

# Variables de configuration
POOL_NAME="InterpUserPool"
REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "📍 Région: $REGION"
echo "🏢 Compte AWS: $ACCOUNT_ID"

# 1. Créer le User Pool
echo "📝 Création du User Pool..."

USER_POOL_ID=$(aws cognito-idp create-user-pool \
    --pool-name "$POOL_NAME" \
    --policies '{
        "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireUppercase": true,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": true
        }
    }' \
    --auto-verified-attributes phone_number \
    --username-attributes phone_number \
    --mfa-configuration ON \
    --mfa-types SMS \
    --query 'UserPool.Id' \
    --output text)

echo "✅ User Pool créé: $USER_POOL_ID"

# 2. Créer l'App Client
echo "📱 Création de l'App Client..."

APP_CLIENT_ID=$(aws cognito-idp create-user-pool-client \
    --user-pool-id "$USER_POOL_ID" \
    --client-name "InterpAppClient" \
    --no-generate-secret \
    --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_REFRESH_TOKEN_AUTH \
    --query 'UserPoolClient.ClientId' \
    --output text)

echo "✅ App Client créé: $APP_CLIENT_ID"

# 3. Créer le rôle IAM pour Cognito
echo "🔐 Création du rôle IAM..."

# Créer le trust policy
cat > trust-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "cognito-idp.amazonaws.com"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "$USER_POOL_ID"
                }
            }
        }
    ]
}
EOF

# Créer le rôle
ROLE_ARN=$(aws iam create-role \
    --role-name "CognitoSMSRole" \
    --assume-role-policy-document file://trust-policy.json \
    --query 'Role.Arn' \
    --output text)

echo "✅ Rôle IAM créé: $ROLE_ARN"

# 4. Attacher la politique SMS
echo "📨 Configuration des permissions SMS..."

aws iam attach-role-policy \
    --role-name "CognitoSMSRole" \
    --policy-arn "arn:aws:iam::aws:policy/service-role/AmazonCognitoIdpSmsRole"

# 5. Configurer les SMS dans Cognito
echo "⚙️ Configuration des SMS..."

aws cognito-idp update-user-pool \
    --user-pool-id "$USER_POOL_ID" \
    --sms-configuration "SnsRegion=$REGION,SnsCallerArn=$ROLE_ARN"

# 6. Créer le fichier de configuration
echo "📄 Création du fichier de configuration..."

cat > aws-exports-updated.js << EOF
const awsmobile = {
    "aws_project_region": "$REGION",
    "aws_cognito_identity_pool_id": "$REGION:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "$REGION",
    "aws_user_pools_id": "$USER_POOL_ID",
    "aws_user_pools_web_client_id": "$APP_CLIENT_ID",
    "oauth": {
        "domain": "interp.auth.$REGION.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile"
        ],
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
EOF

echo "✅ Fichier de configuration créé: aws-exports-updated.js"

# 7. Nettoyage
rm -f trust-policy.json

echo ""
echo "🎉 Configuration terminée !"
echo ""
echo "📋 Informations importantes :"
echo "   User Pool ID: $USER_POOL_ID"
echo "   App Client ID: $APP_CLIENT_ID"
echo "   Rôle IAM: $ROLE_ARN"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Copier le contenu de aws-exports-updated.js dans votre aws-exports.js"
echo "   2. Configurer votre numéro de téléphone dans AWS SNS pour les tests"
echo "   3. Tester l'envoi de SMS"
echo ""
echo "🔧 Pour configurer SNS :"
echo "   aws sns set-sms-attributes --attributes '{\"MonthlySpendLimit\":\"1\",\"DefaultSMSType\":\"Transactional\"}'"
echo ""
echo "📱 Pour vérifier votre numéro :"
echo "   aws sns opt-in-phone-number --phone-number +VOTRE_NUMERO"
