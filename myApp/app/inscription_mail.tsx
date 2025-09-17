import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';
import { router } from 'expo-router';

export default function Inscriptionmail() {
    const isWeb = Platform.OS === 'web';
    const [email, setEmail] = useState('');
    const [showValidation, setShowValidation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // État local pour les données utilisateur
    const [userData, setUserData] = useState({
        firstName: 'Test',
        lastName: 'Utilisateur',
        newsletterAccepted: false
    });

    // Validation de l'email (seulement quand affichée)
    const isValidEmail = email.includes('@') && email.trim().length > 0;

    // Vérifier si on peut continuer
    const canContinue = isValidEmail && (userData?.firstName || 'Test') && (userData?.lastName || 'Utilisateur');

    // Debug: afficher l'état des conditions
    useEffect(() => {
        console.log('🔍 Debug canContinue:', {
            isValidEmail,
            firstName: userData?.firstName || 'Test',
            lastName: userData?.lastName || 'Utilisateur',
            canContinue
        });
    }, [isValidEmail, userData, canContinue]);

    // Afficher la validation quand l'utilisateur quitte le champ
    const handleInputBlur = () => {
        setShowValidation(true);
    };

    // Sauvegarder les données complètes (prénom, nom, email)
    const handleSaveAndContinue = async () => {
        if (!canContinue) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
            return;
        }

        setIsLoading(true);
        try {
            // Utiliser userData ou les valeurs par défaut
            const currentUserData = userData || {
                firstName: 'Test',
                lastName: 'Utilisateur',
                newsletterAccepted: false
            };

            // Mettre à jour le store avec l'email
            const updatedUserData = {
                ...currentUserData,
                email: email.trim()
            };
            setUserData(updatedUserData);

            // Simulation de la sauvegarde des données utilisateur
            const userId = `user_${Date.now()}`; // Génération d'un ID unique simulé

            console.log('✅ Utilisateur sauvegardé (simulation) avec ID:', userId);
            console.log('📝 Données utilisateur sauvegardées:', {
                userId,
                firstName: updatedUserData.firstName,
                lastName: updatedUserData.lastName,
                email: updatedUserData.email,
                newsletterAccepted: updatedUserData.newsletterAccepted
            });

            // Sauvegarder dans AWS (simulation)
            console.log('📝 Données utilisateur à sauvegarder dans AWS:', {
                userId,
                firstName: updatedUserData.firstName,
                lastName: updatedUserData.lastName,
                email: updatedUserData.email,
                newsletterAccepted: updatedUserData.newsletterAccepted
            });

            // TODO: Implémenter la vraie sauvegarde AWS ici
            // await awsService.saveUserData(updatedUserData);

            // Redirection vers l'écran suivant
            router.push('/create_password');

        } catch (error) {
            console.error('💥 Erreur lors de la sauvegarde:', error);
            Alert.alert('Erreur', 'Impossible de sauvegarder les données. Réessayez.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={[
            styles.container,
            isWeb && {
                width: 390,
                minHeight: 700,
                alignSelf: "center",
                maxWidth: "100%",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 20,
                overflow: "hidden",
                marginVertical: 20,
                marginHorizontal: "auto"
            }
        ]}>
            {/* Header avec flèche et barre de progression */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => router.push('/inscription_first')}
                    >
                        <Svg style={styles.backArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(0, 0, 0, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                <Text style={styles.title}>
                    Ajoutez votre adresse e-mail
                </Text>

                {/* Sous-titre */}
                <Text style={styles.subtitle}>
                    Pour faciliter la récupération de votre compte Interp.
                </Text>

                {/* Champ de saisie email */}
                <View style={styles.inputContainer}>
                    <View style={[
                        styles.inputField,
                        showValidation && {
                            borderColor: email.trim().length === 0 ? "rgba(239, 68, 68, 1)" :
                                isValidEmail ? "rgba(50, 213, 131, 1)" : "rgba(239, 68, 68, 1)"
                        }
                    ]}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="hello@interp.com"
                            placeholderTextColor="rgba(113, 118, 128, 1)"
                            value={email}
                            onChangeText={setEmail}
                            onBlur={handleInputBlur}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    {showValidation && (
                        <Text style={[
                            styles.validationText,
                            { color: isValidEmail ? "rgba(50, 213, 131, 1)" : "rgba(239, 68, 68, 1)" }
                        ]}>
                            {email.trim().length === 0 ? "✗ Veuillez saisir un email" :
                                isValidEmail ? "✓ Email valide" : "✗ Email invalide"}
                        </Text>
                    )}
                </View>


            </View>

            {/* Bouton Suivant en bas de page */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (!canContinue || isLoading) && styles.buttonDisabled
                    ]}
                    onPress={handleSaveAndContinue}
                    disabled={!canContinue || isLoading}
                >
                    <Text style={[styles.buttonText, (!canContinue || isLoading) && styles.buttonTextDisabled]}>
                        {isLoading ? 'Sauvegarde...' : 'Suivant'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 15
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        backgroundColor: "#D5D9EB",
        borderRadius: 4,
        marginRight: 15,
    },
    progressFill: {
        width: '60%',
        height: 8,
        backgroundColor: "#32D583",
        borderRadius: 4,
    },
    progressCheck: {
        width: 20,
        height: 20,
        backgroundColor: "#32D583",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#14181B",
        fontFamily: "Outfit",
        lineHeight: 32,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "400",
        color: "#14181B",
        fontFamily: "Outfit",
        letterSpacing: 0.17,
        lineHeight: 21,
        marginBottom: 40,
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
        paddingVertical: 24,
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },

    inputText: {
        fontSize: 16,
        fontWeight: "400",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        lineHeight: 24,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 70,
        left: 15,
        right: 15,
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#5925DC",
        borderWidth: 1,
        borderColor: "#7F56D9",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
        width: '90%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        fontFamily: "Inter",
        lineHeight: 24,
    },
    buttonTextDisabled: {
        color: "rgba(255, 255, 255, 0.6)",
    },
    buttonDisabled: {
        backgroundColor: "#5925DC",
        opacity: 0.6,
    },
    validationText: {
        fontSize: 14,
        fontFamily: "Inter",
        fontWeight: "500",
        marginTop: 8,
        textAlign: "center",
    },
}); 