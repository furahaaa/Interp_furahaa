// Template aws-exports.js
// Remplacez les valeurs par vos vraies informations

const awsmobile = {
    "aws_project_region": "us-east-1", // Votre région
    "aws_cognito_identity_pool_id": "us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "us-east-1", // Votre région
    "aws_user_pools_id": "VOTRE_USER_POOL_ID", // À copier depuis Cognito
    "aws_user_pools_web_client_id": "VOTRE_APP_CLIENT_ID", // À copier depuis Cognito
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
    "aws_cognito_mfa_types": ["SMS"]
};

export default awsmobile;