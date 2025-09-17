import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, TextInput, Alert, Keyboard, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VerificationSMS() {
    const [smsCode, setSmsCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [showCodeDisplay, setShowCodeDisplay] = useState(false);
    const [receivedCode, setReceivedCode] = useState<string>('');
    const [codeExpiry, setCodeExpiry] = useState<Date | null>(null);
    const inputRefs = useRef<TextInput[]>([]);

    // États locaux pour la gestion des données
    const [phoneNumber, setPhoneNumber] = useState<string>('+33123456789'); // Valeur par défaut pour les tests
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [smsVerified, setSMSVerified] = useState<boolean>(false);
    const [smsCodeAttempts, setSmsCodeAttempts] = useState<number>(0);

    // Focus automatique sur le premier champ
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Simuler la réception d'un code pour les tests
    useEffect(() => {
        if (phoneNumber && !receivedCode) {
            // Générer un code de test aléatoire
            const testCode = Math.floor(100000 + Math.random() * 900000).toString();
            setReceivedCode(testCode);
            setCodeExpiry(new Date(Date.now() + 5 * 60 * 1000)); // 5 minutes
            console.log('🔑 Code de test généré:', testCode);
        }
    }, [phoneNumber, receivedCode]);

    // Timer pour masquer le message de notification après 30 secondes
    useEffect(() => {
        if (receivedCode) {
            const timer = setTimeout(() => {
                setReceivedCode('');
                setCodeExpiry(null);
                console.log('⏰ Message de notification masqué après 30 secondes');
            }, 30 * 1000); // 30 secondes

            return () => clearTimeout(timer);
        }
    }, [receivedCode]);

    // Gestion de la saisie du code SMS
    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...smsCode];
        newCode[index] = text;
        setSmsCode(newCode);

        // Passe au champ suivant si un chiffre est saisi
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        } else if (text && index === 5) {
            // Dernier chiffre saisi, fermer le clavier
            Keyboard.dismiss();
        }
    };

    // Gestion de la suppression (retour arrière)
    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !smsCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Vérification du code SMS
    const handleVerifyCode = async () => {
        const code = smsCode.join('');

        if (code.length !== 6) {
            setErrorMessage('Veuillez saisir le code à 6 chiffres');
            return;
        }

        if (!phoneNumber) {
            setErrorMessage('Numéro de téléphone non trouvé');
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            // Vérification du code (simulation)
            console.log('🔐 Vérification du code:', code);
            console.log('🔑 Code attendu:', receivedCode);

            // Vérifier si le code correspond au code généré
            if (code === receivedCode) {
                console.log('✅ Code vérifié avec succès !');
                setSuccessMessage('Code vérifié avec succès ! 🎉');
                setSMSVerified(true);
                setSmsCodeAttempts(0);

                // Simulation de la sauvegarde du téléphone vérifié
                try {
                    if (phoneNumber) {
                        const userId = `user_${Date.now()}`;
                        console.log('📱 Téléphone vérifié sauvegardé (simulation) pour:', userId);
                        console.log('📱 Données téléphone:', {
                            userId,
                            phoneNumber: phoneNumber,
                            phoneVerified: true
                        });
                    }
                } catch (error) {
                    console.error('⚠️ Erreur lors de la sauvegarde du téléphone:', error);
                }

                // Redirection après un délai
                setTimeout(() => {
                    router.push('/inscription_first');
                }, 1500);
            } else {
                console.log('❌ Code incorrect');
                setErrorMessage('Code incorrect. Veuillez réessayer.');
                setSmsCodeAttempts(prev => prev + 1);
            }
        } catch (error) {
            console.error('💥 Erreur lors de la vérification:', error);
            setErrorMessage('Erreur lors de la vérification. Réessayez.');
        } finally {
            setIsLoading(false);
        }
    };

    // Renvoi du code SMS
    const handleResendCode = async () => {
        console.log('🚀 Début de handleResendCode');
        console.log('📱 phoneNumber:', phoneNumber);
        console.log('📱 phoneNumber type:', typeof phoneNumber);
        console.log('📱 phoneNumber length:', phoneNumber ? phoneNumber.length : 'null');

        if (!phoneNumber) {
            console.log('❌ phoneNumber est null ou undefined');
            setErrorMessage('Numéro de téléphone non trouvé');
            return;
        }

        console.log('✅ phoneNumber trouvé, début du renvoi');
        setIsLoading(true);
        setErrorMessage(null);

        try {
            console.log('📤 Simulation de renvoi SMS...');

            // Générer un nouveau code de test
            const newTestCode = Math.floor(100000 + Math.random() * 900000).toString();
            setReceivedCode(newTestCode);
            setCodeExpiry(new Date(Date.now() + 5 * 60 * 1000));
            setSmsCode(['', '', '', '', '', '']);

            console.log('✅ Nouveau code de test généré:', newTestCode);
            setSuccessMessage('Nouveau code envoyé !');

            // Focus sur le premier champ
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        } catch (error: any) {
            console.error('💥 Erreur lors du renvoi:', error);
            setErrorMessage(`Erreur lors du renvoi: ${error.message || 'Erreur inconnue'}`);
        } finally {
            console.log('🏁 Fin de handleResendCode, isLoading:', false);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.verificationSMSContainer}>
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
                showsVerticalScrollIndicator={false}
            >
                {/* Flèche de retour */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/inscription_tel')}
                >
                    <Svg style={styles.backArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Saisissez le code à 6 chiffres envoyé par SMS
                </Text>

                {/* Message de notification en haut avec le code */}
                {receivedCode && (
                    <View style={styles.notificationContainer}>
                        <Text style={styles.notificationText}>
                            ✅ Code SMS reçu : {receivedCode}
                        </Text>
                        <Text style={styles.notificationSubtext}>
                            ⏰ Ce message disparaîtra dans 30 secondes
                        </Text>
                    </View>
                )}


                {/* Affichage du numéro de téléphone */}
                {phoneNumber && (
                    <Text style={styles.phoneNumber}>
                        {phoneNumber}
                    </Text>
                )}



                {/* Champs de saisie du code SMS */}
                <View style={styles.verificationcodeinputfield}>
                    <View style={styles.inputwithlabel}>
                        <View style={styles.input}>
                            {smsCode.map((digit, index) => (
                                <View key={index} style={styles.inputField}>
                                    <TextInput
                                        ref={(ref) => {
                                            if (ref) inputRefs.current[index] = ref;
                                        }}
                                        style={styles.textInput}
                                        value={digit}
                                        onChangeText={(text) => handleCodeChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        selectTextOnFocus
                                        editable={!isLoading}
                                        returnKeyType={index === 5 ? "done" : "next"}
                                        onSubmitEditing={() => {
                                            if (index === 5) {
                                                Keyboard.dismiss();
                                            }
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Messages d'erreur et de succès */}
                <View style={styles.messageContainer}>
                    {errorMessage && (
                        <Text style={styles.errorMessage}>
                            {errorMessage}
                        </Text>
                    )}
                    {successMessage && (
                        <Text style={styles.successMessage}>
                            {successMessage}
                        </Text>
                    )}
                </View>

                {/* Liens d'action */}
                <View style={styles.actionLinks}>
                    <Text style={styles.phoneChange}>
                        Vous avez changé de numéro de téléphone portable ?
                    </Text>



                    <TouchableOpacity onPress={handleResendCode} disabled={isLoading}>
                        <Text style={[styles.resendCode, isLoading && styles.resendCodeDisabled]}>
                            Renvoyer le code par SMS
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Bouton Suivant */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleVerifyCode}
                        disabled={isLoading || smsCode.join('').length !== 6}
                    >
                        <Text style={[styles.buttonText, isLoading && styles.buttonTextDisabled]}>
                            {isLoading ? 'Vérification...' : 'Suivant'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    verificationSMSContainer: {
        flex: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
        paddingTop: Platform.OS === 'android' ? 60 : 60,
        paddingHorizontal: 20,
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        padding: 8,
    },
    backArrow: {
        width: 24,
        height: 24,
    },
    title: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: Platform.OS === 'android' ? 24 : 28,
        fontWeight: "700",
        fontFamily: 'Outfit',
        lineHeight: Platform.OS === 'android' ? 32 : 44,
        marginBottom: 20,
        textAlign: 'left',
    },
    subtitle: {
        color: "rgba(255, 193, 7, 1)",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: 'Outfit',
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 40,
        maxWidth: 350,
        paddingHorizontal: 20,
    },
    phoneNumber: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 18,
        fontWeight: "400",
        fontFamily: 'Outfit',
        lineHeight: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    verificationcodeinputfield: {
        marginBottom: 40,
    },
    inputwithlabel: {
        alignItems: 'center',
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: Platform.OS === 'android' ? 2 : 4,
        width: '100%',
        maxWidth: Platform.OS === 'android' ? 380 : 360,
        paddingHorizontal: Platform.OS === 'android' ? 20 : 0,
    },
    inputField: {
        flex: 1,
        height: Platform.OS === 'android' ? 65 : 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Platform.OS === 'android' ? 8 : 16,
        paddingVertical: Platform.OS === 'android' ? 8 : 12,
        maxWidth: Platform.OS === 'android' ? 70 : 65,
        marginHorizontal: Platform.OS === 'android' ? 1 : 2,
    },
    textInput: {
        color: "#000000",
        fontSize: Platform.OS === 'android' ? 26 : 25,
        fontWeight: "800",
        fontFamily: 'Inter',
        lineHeight: Platform.OS === 'android' ? 28 : 32,
        textAlign: "center",
        width: '100%',
        height: '100%',
        includeFontPadding: false,
        textAlignVertical: 'center',
        letterSpacing: 1,
        backgroundColor: 'transparent',
    },
    messageContainer: {
        marginBottom: 40,
    },
    errorMessage: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: 'Outfit',
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    successMessage: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: 'Outfit',
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    actionLinks: {
        alignItems: 'center',
        marginBottom: 40,
    },
    phoneChange: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: 'Outfit',
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    resendCode: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: 'Outfit',
        lineHeight: 24,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    resendCodeDisabled: {
        opacity: 0.5,
    },
    showCodeButton: {
        backgroundColor: '#6c5ce7',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        shadowColor: 'rgba(10, 13, 18, 0.05)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    showCodeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter',
    },
    showCodeButtonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
    showCodeButtonTextDisabled: {
        color: '#999',
    },

    notificationContainer: {
        backgroundColor: '#e8f5e8',
        borderWidth: 1,
        borderColor: '#4caf50',
        borderRadius: 8,
        padding: 12,
        marginVertical: 15,
        marginHorizontal: 20,
    },
    notificationText: {
        fontSize: 16,
        color: '#2e7d32',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '600',
        marginBottom: 5,
    },
    notificationSubtext: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontStyle: 'italic',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    webScrollContainer: {
        ...(Platform.OS === 'web' && {
            maxHeight: 800,
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
                display: 'none',
            },
        }),
    },
    webScrollContent: {
        ...(Platform.OS === 'web' && {
            flexGrow: 1,
            paddingBottom: 40,
        }),
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        minHeight: Platform.OS === 'android' ? 50 : 56,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        width: '100%',
        maxWidth: 350,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "rgba(89, 37, 220, 1)",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'Inter',
        lineHeight: 24,
    },
    buttonTextDisabled: {
        opacity: 0.5,
    },
});