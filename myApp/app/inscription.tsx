import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';
import { router } from 'expo-router';

export default function Inscription() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [conditionsAccepted, setConditionsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [newsletterAccepted, setNewsletterAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Vérifier si toutes les conditions sont acceptées
    const allConditionsAccepted = conditionsAccepted && privacyAccepted;
    const canContinue = firstName.trim() && lastName.trim() && allConditionsAccepted;

    // Sauvegarder les données utilisateur
    const handleContinue = async () => {
        if (!canContinue) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs et accepter les conditions');
            return;
        }

        setIsLoading(true);
        try {
            // Sauvegarder les données localement (simulation)
            console.log('📝 Données utilisateur sauvegardées:', {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                newsletterAccepted
            });

            // TODO: Sauvegarder dans AWS (à implémenter selon votre configuration AWS)
            console.log('📝 Données utilisateur à sauvegarder dans AWS:', {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                newsletterAccepted
            });

            // Redirection vers l'écran suivant
            router.push('/inscription_first');
        } catch (error) {
            console.error('💥 Erreur lors de la sauvegarde:', error);
            Alert.alert('Erreur', 'Impossible de sauvegarder les données. Réessayez.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header avec flèche et barre de progression */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => router.push('/(tabs)')}
                    >
                        <Svg style={styles.backArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>

                    {/* Barre de progression */}
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                        </View>
                        <View style={styles.progressCheck}>
                            <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>

            {/* Contenu principal */}
            <View style={styles.mainContent}>
                {/* Titre */}
                <View style={styles.titleContainer}>
                    <Text style={styles.greeting}>{"Bonjour 👋"}</Text>
                    <Text style={styles.title}>{"Comment appellez-vous ?"}</Text>
                </View>

                {/* Champs de saisie */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputField}>
                        <Text style={styles.inputLabel}>{"Prénom"}</Text>
                        <TextInput
                            style={styles.textInput}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="Entrez votre prénom"
                            placeholderTextColor="#717680"
                        />
                    </View>
                    <View style={styles.inputField}>
                        <Text style={styles.inputLabel}>{"Nom"}</Text>
                        <TextInput
                            style={styles.textInput}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Entrez votre nom"
                            placeholderTextColor="#717680"
                        />
                    </View>
                </View>

                {/* Checkboxes */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setConditionsAccepted(!conditionsAccepted)}
                    >
                        <View style={[styles.checkbox, conditionsAccepted && styles.checkboxChecked]}>
                            {conditionsAccepted && (
                                <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            )}
                        </View>
                        <Text style={styles.checkboxText}>{"J'accepte "}<Text style={styles.linkText}>{"les conditions d'utilisation."}</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setPrivacyAccepted(!privacyAccepted)}
                    >
                        <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
                            {privacyAccepted && (
                                <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            )}
                        </View>
                        <Text style={styles.checkboxText}>{"J'ai pris connaissance de la "}<Text style={styles.linkText}>{"politique de confidentialité"}</Text><Text style={styles.checkboxText}>{"."}</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setNewsletterAccepted(!newsletterAccepted)}
                    >
                        <View style={[styles.checkbox, newsletterAccepted && styles.checkboxChecked]}>
                            {newsletterAccepted && (
                                <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                    <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            )}
                        </View>
                        <Text style={styles.checkboxText}>{"Je veux recevoir les actualités, nouveautés et astuces de Signoow."}</Text>
                    </TouchableOpacity>
                </View>

                {/* Bouton */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, !canContinue && styles.buttonDisabled]}
                        onPress={handleContinue}
                        disabled={!canContinue || isLoading}
                    >
                        <Text style={[styles.buttonText, !canContinue && styles.buttonTextDisabled]}>
                            {isLoading ? 'Sauvegarde...' : 'Continuer'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Espace pour combler le bas */}
            <View style={styles.bottomSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
    },
    header: {
        paddingTop: Platform.select({
            ios: 60,
            android: 60,
            web: 60
        }),
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
    },
    backArrow: {
        width: 24,
        height: 24,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 20,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "rgba(62, 28, 150, 1)",
        borderRadius: 2,
        marginRight: 10,
    },
    progressFill: {
        width: 15,
        height: 8,
        backgroundColor: "#32D583",
        borderRadius: 4,
    },
    progressCheck: {
        width: 20,
        height: 20,
        backgroundColor: "rgba(62, 28, 150, 1)",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },


    mainContent: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 35,
        paddingTop: 40,
        flex: 1,
        shadowColor: "rgba(75, 57, 239, 0.15)",
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowRadius: 20,
    },
    titleContainer: {
        marginBottom: 40,
    },
    greeting: {
        fontSize: 28,
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit-ExtraBold",
        fontWeight: "800",
        lineHeight: 44,
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        lineHeight: 44,
    },
    inputContainer: {
        marginBottom: 40,
    },
    inputField: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginBottom: 16,
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },
    inputLabel: {
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: 8,
    },
    textInput: {
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        padding: 0,
        margin: 0,
    },
    checkboxContainer: {
        marginBottom: 40,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 1)",
        marginRight: 12,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderColor: "rgba(89, 37, 220, 1)",
    },
    checkboxText: {
        flex: 1,
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.16,
        lineHeight: 19.2,
    },
    linkText: {
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.16,
        lineHeight: 19.2,
        textDecorationLine: "underline",
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderWidth: 1,
        borderColor: "rgba(127, 86, 217, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },
    buttonText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    },
    buttonDisabled: {
        backgroundColor: "rgba(213, 215, 218, 1)",
        borderColor: "rgba(213, 215, 218, 1)",
        opacity: 0.6,
    },
    buttonTextDisabled: {
        color: "rgba(113, 118, 128, 1)",
    },
    bottomSpacer: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        height: 100,
        ...(Platform.OS === 'android' && {
            height: 50,
        }),
    },
}); 