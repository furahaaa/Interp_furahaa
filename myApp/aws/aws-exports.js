const awsmobile = {
    "aws_project_region": "eu-west-3",
    "aws_cognito_identity_pool_id": "eu-west-3:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "aws_cognito_region": "eu-west-3",
    "aws_user_pools_id": "eu-west-3_2XybcjI0G",
    "aws_user_pools_web_client_id": "oh147dc5k4m824vjuocjsqgcd",
    "oauth": {
        "domain": "interp.auth.eu-west-3.amazoncognito.com",
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
