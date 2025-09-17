import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform, TextInput, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import countries, { Country } from '../constants/countries';

export default function InscriptionTel() {
    const isWeb = Platform.OS === 'web';
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === '+33') || countries[0]);
    const [isLoading, setIsLoading] = useState(false);

    // Fonction de formatage automatique du numéro de téléphone
    const formatPhoneNumber = (text: string, countryCode: string): string => {
        // Supprimer tous les caractères non numériques
        const cleaned = text.replace(/\D/g, '');

        // Formatage selon le pays
        if (countryCode === '+33') {
            // Format français : 6 12 34 56 78
            if (cleaned.length <= 1) return cleaned;
            if (cleaned.length <= 3) return `${cleaned.slice(0, 1)} ${cleaned.slice(1)}`;
            if (cleaned.length <= 5) return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3)}`;
            if (cleaned.length <= 7) return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`;
            return `${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
        } else if (countryCode === '+1') {
            // Format américain/canadien : (555) 123-4567
            if (cleaned.length <= 3) return cleaned;
            if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        } else if (countryCode === '+44') {
            // Format britannique : 07123 456789
            if (cleaned.length <= 5) return cleaned;
            return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
        } else if (countryCode === '+49') {
            // Format allemand : 0171 1234567
            if (cleaned.length <= 4) return cleaned;
            return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
        } else {
            // Format générique : groupes de 2-3 chiffres
            if (cleaned.length <= 3) return cleaned;
            if (cleaned.length <= 5) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
            if (cleaned.length <= 7) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`;
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
        }
    };

    // Gestion du changement de numéro avec formatage
    const handlePhoneNumberChange = (text: string) => {
        const formatted = formatPhoneNumber(text, selectedCountry.code);
        setPhoneNumber(formatted);
    };

    // Générer le placeholder selon le pays sélectionné
    const getPhonePlaceholder = (countryCode: string): string => {
        switch (countryCode) {
            case '+33':
                return '6 12 34 56 78';
            case '+1':
                return '(555) 123-4567';
            case '+44':
                return '07123 456789';
            case '+49':
                return '0171 1234567';
            case '+32':
                return '0471 23 45 67';
            case '+41':
                return '076 123 45 67';
            case '+39':
                return '333 123 4567';
            case '+34':
                return '612 345 678';
            default:
                return '123 45 67 89';
        }
    };

    // États locaux pour les messages et le numéro de téléphone
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState<string>('');

    const handleContinue = async () => {
        console.log('🚀 Début de handleContinue');

        // Validation du numéro de téléphone
        console.log('🔍 Validation - phoneNumber:', phoneNumber);
        console.log('🔍 Validation - phoneNumber.trim():', phoneNumber.trim());
        console.log('🔍 Validation - phoneNumber.trim().length:', phoneNumber.trim().length);

        if (!phoneNumber.trim()) {
            console.log('⚠️ Numéro vide détecté, affichage du message d\'erreur...');
            // Utiliser directement le message d'erreur dans l'interface
            setErrorMessage('Veuillez saisir votre numéro de téléphone pour continuer.');
            return;
        }

        // Construction du numéro complet (supprimer les espaces)
        const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
        const fullPhoneNumber = selectedCountry.code + cleanedPhoneNumber;
        console.log('📱 Numéro complet construit:', fullPhoneNumber);

        // Validation du format (validation simple pour les tests)
        if (!cleanedPhoneNumber || fullPhoneNumber.length < 10) {
            console.log('❌ Validation échouée pour:', fullPhoneNumber);
            setErrorMessage('Format de numéro de téléphone invalide');
            return;
        }
        console.log('✅ Validation réussie pour:', fullPhoneNumber);

        setIsLoading(true);
        setErrorMessage(null);

        try {
            console.log('📤 Simulation d\'envoi SMS...');

            // Simulation d'envoi SMS (remplace le service de test)
            setStoredPhoneNumber(fullPhoneNumber);
            setSuccessMessage('SMS envoyé avec succès !');

            console.log('✅ SMS simulé envoyé avec succès');
            console.log('📱 Numéro de téléphone sauvegardé:', fullPhoneNumber);

            // Redirection automatique vers la page de vérification
            setTimeout(() => {
                router.push('/verification_sms');
            }, 1500);

        } catch (error: any) {
            console.error('💥 Erreur lors de la simulation SMS:', error);
            setErrorMessage(`Erreur lors de l'envoi du SMS: ${error.message || 'Erreur inconnue'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[
                    styles.title,
                    isWeb && {
                        fontSize: 24,
                        marginBottom: 50
                    }
                ]}>
                    Saisissez votre numéro de téléphone
                </Text>


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

                {/* Champs de saisie horizontaux */}
                <View style={[
                    styles.inputContainer,
                    isWeb && {
                        marginBottom: 25
                    }
                ]}>
                    {/* Champ pays avec drapeau */}
                    <View style={[
                        styles.countryField,
                        isWeb && {
                            flex: 0.30
                        }
                    ]}>
                        <View style={styles.countryInput}>
                            <View style={styles.countryContent}>
                                <TextInput
                                    style={[
                                        styles.countryTextInput,
                                        isWeb && {
                                            outline: 'none',
                                            border: 'none',
                                            boxShadow: 'none',
                                        } as any
                                    ]}
                                    placeholder="+33"
                                    placeholderTextColor="#717680"
                                    value={selectedCountry.code}
                                    onChangeText={(text) => {
                                        const country = countries.find(c => c.code === text);
                                        if (country) {
                                            setSelectedCountry(country);
                                            // Reformater le numéro selon le nouveau pays
                                            if (phoneNumber) {
                                                const cleaned = phoneNumber.replace(/\D/g, '');
                                                const reformatted = formatPhoneNumber(cleaned, text);
                                                setPhoneNumber(reformatted);
                                            }
                                            // Le placeholder se met à jour automatiquement
                                        } else {
                                            // Si pas trouvé, garder le code saisi mais sans drapeau
                                            setSelectedCountry({ ...selectedCountry, code: text, flag: '🏳️' });
                                        }
                                    }}
                                    keyboardType="phone-pad"
                                    selection={{ start: selectedCountry.code.length, end: selectedCountry.code.length }}
                                />
                                {!isWeb && (
                                    <Text style={styles.countryFlag}>
                                        {selectedCountry.flag}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Champ numéro de téléphone */}
                    <View style={[
                        styles.phoneField,
                        isWeb && {
                            flex: 1.0
                        }
                    ]}>
                        <View style={styles.phoneInput}>
                            <View style={styles.phoneContent}>
                                <TextInput
                                    style={[
                                        styles.phoneTextInput,
                                        isWeb && {
                                            outline: 'none',
                                            border: 'none',
                                            boxShadow: 'none',
                                        } as any
                                    ]}
                                    placeholder={getPhonePlaceholder(selectedCountry.code)}
                                    placeholderTextColor="#717680"
                                    value={phoneNumber}
                                    onChangeText={handlePhoneNumberChange}
                                    keyboardType="phone-pad"
                                    editable={!isLoading}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bouton Continuer */}
                <TouchableOpacity
                    style={[styles.continueButton, isLoading && styles.continueButtonDisabled]}
                    onPress={handleContinue}
                    disabled={isLoading || !phoneNumber.trim()}
                >
                    <Text style={[styles.buttonText, isLoading && styles.buttonTextDisabled]}>
                        {isLoading ? 'Envoi en cours...' : 'Continuer'}
                    </Text>
                </TouchableOpacity>





                <Text style={styles.termsText}>
                    En vous inscrivant, vous acceptez nos{' '}
                    <Text style={styles.linkText}>conditions générales d'utilisation</Text>
                    , reconnaissez notre{' '}
                    <Text style={styles.linkText}>politique de confidentialité</Text>
                    . Nous pouvons envoyer des promotions liées à nos services. Vous pouvez vous désabonner à tout moment dans les paramètres sous votre profil.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
        paddingTop: 80,
        paddingHorizontal: 20,
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
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
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
        flexGrow: 1,
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
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#212121",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 30,
        fontFamily: "Outfit"
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#FF6B35",
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Outfit"
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },
    countryField: {
        flex: 0.40,
        marginRight: 10
    },
    phoneField: {
        flex: 0.95,
        marginLeft: 10
    },
    countryInput: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        height: 56,
        borderWidth: Platform.OS === 'web' ? 0 : 1,
        borderColor: "#D5D7DA",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: Platform.OS === 'web' ? 0 : 2,
        elevation: Platform.OS === 'web' ? 0 : 2
    },
    countryContent: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between",
        ...Platform.select({
            web: {
                justifyContent: "flex-start",
                gap: 8,
            }
        })
    },
    countryText: {
        fontSize: 18,
        color: "#212121",
        fontFamily: "Inter",
        fontWeight: "600"
    },
    countryTextInput: {
        fontSize: 18,
        color: "#212121",
        fontFamily: "Inter",
        fontWeight: "400",
        flex: 1,
        padding: 0,
        margin: 0,
        includeFontPadding: false,
        textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
        ...(Platform.OS === 'web' ? {
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
        } as any : {})
    },
    countryFlag: {
        fontSize: 20,
        marginLeft: 8,
    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        height: 56,
        borderWidth: Platform.OS === 'web' ? 0 : 1,
        borderColor: "#D5D7DA",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: Platform.OS === 'web' ? 0 : 2,
        elevation: Platform.OS === 'web' ? 0 : 2
    },
    phoneContent: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%"
    },
    phoneText: {
        fontSize: 16,
        color: "#717680",
        fontFamily: "Inter",
        fontWeight: "400"
    },
    phoneTextInput: {
        fontSize: 16,
        color: "#212121",
        fontFamily: "Inter",
        fontWeight: "400",
        flex: 1,
        padding: 0,
        margin: 0,
        includeFontPadding: false,
        textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
        ...(Platform.OS === 'web' ? {
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
        } as any : {})
    },
    continueButton: {
        backgroundColor: "#5925DC",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        elevation: 2
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Inter"
    },
    continueButtonDisabled: {
        backgroundColor: "#D5D7DA",
        opacity: 0.7
    },
    buttonTextDisabled: {
        color: "#717680"
    },
    messageContainer: {
        marginBottom: 20,
    },
    errorMessage: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    successMessage: {
        color: "green",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    termsText: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 12,
        color: "#212121",
        textAlign: "center",
        lineHeight: 18,
        fontFamily: "SF Pro Display",
        fontWeight: "400",
        letterSpacing: 0.12
    },
    linkText: {
        textDecorationLine: "underline",
        color: "#212121",
        fontFamily: "SF Pro Display",
        fontSize: 12,
        fontWeight: "400",
        letterSpacing: 0.12
    }
});