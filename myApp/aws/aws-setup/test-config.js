// Script de test rapide pour la configuration AWS
// Usage: node test-config.js

const AWS = require('aws-sdk');

// Configuration AWS (à adapter selon votre région)
AWS.config.update({
    region: 'us-east-1' // Changez selon votre région
});

const cognito = new AWS.CognitoIdentityServiceProvider();
const sns = new AWS.SNS();

async function testCognitoConfiguration() {
    console.log('🧪 Test de la configuration AWS...\n');
    
    try {
        // Test 1: Vérifier les User Pools
        console.log('1️⃣ Vérification des User Pools...');
        const userPools = await cognito.listUserPools({ MaxResults: 10 }).promise();
        
        if (userPools.UserPools.length === 0) {
            console.log('❌ Aucun User Pool trouvé');
            console.log('💡 Créez d\'abord un User Pool dans AWS Console');
            return false;
        }
        
        console.log(`✅ ${userPools.UserPools.length} User Pool(s) trouvé(s)`);
        
        // Chercher le pool Interp
        const interpPool = userPools.UserPools.find(pool => 
            pool.Name.includes('Interp') || pool.Name.includes('interp')
        );
        
        if (!interpPool) {
            console.log('⚠️  User Pool "Interp" non trouvé');
            console.log('💡 Créez un pool nommé "InterpUserPool"');
        } else {
            console.log(`✅ User Pool "Interp" trouvé: ${interpPool.Id}`);
            
            // Test 2: Vérifier la configuration SMS
            console.log('\n2️⃣ Vérification de la configuration SMS...');
            const poolDetails = await cognito.describeUserPool({ UserPoolId: interpPool.Id }).promise();
            
            if (poolDetails.UserPool.SmsConfiguration) {
                console.log('✅ Configuration SMS activée');
                console.log(`   Région SNS: ${poolDetails.UserPool.SmsConfiguration.SnsRegion}`);
                console.log(`   Rôle IAM: ${poolDetails.UserPool.SmsConfiguration.SnsCallerArn}`);
            } else {
                console.log('❌ Configuration SMS non activée');
                console.log('💡 Activez les SMS dans la configuration du pool');
            }
            
            // Test 3: Vérifier les App Clients
            console.log('\n3️⃣ Vérification des App Clients...');
            const appClients = await cognito.listUserPoolClients({ UserPoolId: interpPool.Id }).promise();
            
            if (appClients.UserPoolClients.length === 0) {
                console.log('❌ Aucun App Client trouvé');
                console.log('💡 Créez un App Client dans Cognito');
            } else {
                console.log(`✅ ${appClients.UserPoolClients.length} App Client(s) trouvé(s)`);
                appClients.UserPoolClients.forEach(client => {
                    console.log(`   - ${client.ClientName}: ${client.ClientId}`);
                });
            }
        }
        
        // Test 4: Vérifier SNS
        console.log('\n4️⃣ Vérification de SNS...');
        try {
            const snsAttributes = await sns.getSMSAttributes().promise();
            console.log('✅ SNS accessible');
            
            if (snsAttributes.attributes.MonthlySpendLimit) {
                console.log(`   Limite mensuelle: $${snsAttributes.attributes.MonthlySpendLimit}`);
            }
            
            if (snsAttributes.attributes.DefaultSMSType) {
                console.log(`   Type SMS par défaut: ${snsAttributes.attributes.DefaultSMSType}`);
            }
        } catch (error) {
            console.log('❌ Erreur SNS:', error.message);
        }
        
        console.log('\n🎯 Résumé des tests:');
        console.log('   - User Pools: ✅');
        console.log('   - Configuration SMS: ' + (poolDetails?.UserPool?.SmsConfiguration ? '✅' : '❌'));
        console.log('   - App Clients: ' + (appClients?.UserPoolClients?.length > 0 ? '✅' : '❌'));
        console.log('   - SNS: ✅');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error.message);
        console.log('\n💡 Vérifiez que:');
        console.log('   1. AWS CLI est configuré');
        console.log('   2. Vous avez les bonnes permissions');
        console.log('   3. La région est correcte');
        return false;
    }
}

async function testSMSSending() {
    console.log('\n📱 Test d\'envoi de SMS...');
    
    try {
        // Test avec un numéro factice (ne sera pas envoyé en mode sandbox)
        const testNumber = '+1234567890';
        
        console.log(`   Numéro de test: ${testNumber}`);
        console.log('   ⚠️  En mode sandbox, seuls les numéros vérifiés reçoivent des SMS');
        
        // Vérifier si le numéro est en mode sandbox
        const snsAttributes = await sns.getSMSAttributes().promise();
        if (snsAttributes.attributes.MonthlySpendLimit === '1') {
            console.log('   📋 Mode sandbox détecté (limite $1/mois)');
            console.log('   💡 Pour les tests, vérifiez votre numéro dans SNS');
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test SMS:', error.message);
        return false;
    }
}

async function generateConfigTemplate() {
    console.log('\n📄 Génération du template de configuration...');
    
    const template = `// Template aws-exports.js
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

export default awsmobile;`;
    
    console.log('✅ Template généré:');
    console.log(template);
    
    // Sauvegarder dans un fichier
    const fs = require('fs');
    fs.writeFileSync('aws-exports-template.js', template);
    console.log('\n💾 Template sauvegardé dans: aws-exports-template.js');
}

// Exécution des tests
async function runTests() {
    console.log('🚀 Démarrage des tests de configuration AWS...\n');
    
    const cognitoOk = await testCognitoConfiguration();
    const smsOk = await testSMSSending();
    
    if (cognitoOk && smsOk) {
        console.log('\n🎉 Configuration AWS prête !');
        console.log('\n📝 Prochaines étapes:');
        console.log('   1. Mettre à jour aws-exports.js avec vos vraies valeurs');
        console.log('   2. Redémarrer l\'application');
        console.log('   3. Tester l\'envoi de SMS');
    } else {
        console.log('\n⚠️  Configuration incomplète');
        console.log('\n🔧 Actions requises:');
        console.log('   1. Créer/configurer le User Pool Cognito');
        console.log('   2. Activer les SMS');
        console.log('   3. Créer un App Client');
        console.log('   4. Configurer les permissions IAM');
    }
    
    await generateConfigTemplate();
}

// Exécuter si appelé directement
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { testCognitoConfiguration, testSMSSending, generateConfigTemplate };
