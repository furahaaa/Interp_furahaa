// Trigger Lambda pour la validation des numéros de téléphone
// À déployer dans AWS Lambda et configurer dans Cognito

exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    try {
        // Validation du numéro de téléphone
        if (event.request.userAttributes.phone_number) {
            const phoneNumber = event.request.userAttributes.phone_number;
            
            // Vérifier le format international
            const phoneRegex = /^\+[1-9]\d{1,14}$/;
            if (!phoneRegex.test(phoneNumber)) {
                throw new Error('Format de numéro de téléphone invalide. Utilisez le format international (+33...)');
            }
            
            // Vérifier la longueur
            if (phoneNumber.length < 8 || phoneNumber.length > 15) {
                throw new Error('Numéro de téléphone trop court ou trop long');
            }
            
            // Vérifier le pays (optionnel)
            const countryCode = phoneNumber.substring(0, 3);
            const validCountryCodes = ['+33', '+1', '+44', '+49', '+39', '+34', '+31', '+32'];
            
            if (!validCountryCodes.includes(countryCode)) {
                console.warn(`Code pays non standard: ${countryCode}`);
            }
        }
        
        // Configuration de la réponse
        event.response.autoConfirmUser = false;
        event.response.autoVerifyPhone = false;
        
        console.log('Validation réussie');
        return event;
        
    } catch (error) {
        console.error('Erreur de validation:', error.message);
        throw new Error(error.message);
    }
};
