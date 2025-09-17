import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, Alert, ScrollView } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';
import { router } from 'expo-router';
import { UserDataService } from '../services/userDataService';

export default function Inscription() {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [newsAccepted, setNewsAccepted] = useState(false);

    // Charger les données sauvegardées au montage du composant
    useEffect(() => {
        // Pour l'instant, on initialise avec des valeurs par défaut
        // TODO: Implémenter la récupération des données depuis le stockage local
        console.log('📱 Initialisation du composant inscription_first');
    }, []);

    // Vérifier si toutes les conditions sont remplies
    const canContinue = prenom.trim() && nom.trim() && termsAccepted && privacyAccepted;

    const handleContinue = async () => {
        if (!prenom.trim() || !nom.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        if (!termsAccepted || !privacyAccepted) {
            Alert.alert('Erreur', 'Veuillez accepter les conditions d\'utilisation et la politique de confidentialité');
            return;
        }

        // Validation des données saisies
        if (!prenom.trim() || !nom.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);
        try {
            // Sauvegarder les données utilisateur
            console.log('📝 Sauvegarde des données prénom/nom:', { prenom, nom, newsAccepted });

            // Navigation directe pour le web, alerte pour mobile
            if (Platform.OS === 'web') {
                router.push('/inscription_mail');
            } else {
                Alert.alert('Succès', 'Données sauvegardées avec succès!', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/inscription_mail')
                    }
                ]);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la navigation');
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header avec flèche et barre de progression */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => router.push('/verification_sms')}
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
                <View style={styles.contentWrapper}>
                    {/* Titre */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.greeting}>{"Bonjour 👋"}</Text>
                        <Text style={styles.title}>{"Comment appellez-vous ?"}</Text>

                    </View>

                    {/* Champs de saisie */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Prénom"
                                placeholderTextColor="rgba(113, 118, 128, 1)"
                                value={prenom}
                                onChangeText={setPrenom}
                            />
                        </View>
                        <View style={styles.inputField}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nom"
                                placeholderTextColor="rgba(113, 118, 128, 1)"
                                value={nom}
                                onChangeText={setNom}
                            />
                        </View>
                    </View>

                    {/* Checkboxes */}
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkboxRow}>
                            <TouchableOpacity
                                style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
                                onPress={() => setTermsAccepted(!termsAccepted)}
                            >
                                {termsAccepted && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{"J'accepte "}<Text style={styles.linkText}>{"les conditions d'utilisation."}</Text></Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <TouchableOpacity
                                style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}
                                onPress={() => setPrivacyAccepted(!privacyAccepted)}
                            >
                                {privacyAccepted && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{"J'ai pris connaissance de la "}<Text style={styles.linkText}>{"politique de confidentialité"}</Text><Text style={styles.checkboxText}>{"."}</Text></Text>
                        </View>
                        <View style={styles.checkboxRow}>
                            <TouchableOpacity
                                style={[styles.checkbox, newsAccepted && styles.checkboxChecked]}
                                onPress={() => setNewsAccepted(!newsAccepted)}
                            >
                                {newsAccepted && (
                                    <Text style={styles.checkmark}>✓</Text>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.checkboxText}>{"Je veux recevoir les actualités, nouveautés et astuces de Signoow."}</Text>
                        </View>
                    </View>

                    {/* Bouton */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, (!canContinue || isLoading) && styles.buttonDisabled]}
                            onPress={handleContinue}
                            disabled={!canContinue || isLoading}
                        >
                            <Text style={[styles.buttonText, (!canContinue || isLoading) && styles.buttonTextDisabled]}>
                                {isLoading ? "Sauvegarde..." : "Continuer"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        ...Platform.select({
            web: {
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
            }
        })
    },
    scrollContent: {
        paddingTop: Platform.OS === 'android' ? 60 : 60,
        paddingHorizontal: 20,
        paddingBottom: 40,
        flexGrow: 1,
    },
    webScrollContent: {
        ...Platform.select({
            web: {
                flexGrow: 1,
                paddingBottom: 40,
            }
        })
    },
    header: {
        paddingBottom: 15,
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 350,
                paddingTop: 5,
                paddingBottom: 2
            }
        })
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
        backgroundColor: "#D5D9EB",
        borderRadius: 4,
        marginRight: 15,
    },
    progressFill: {
        width: '20%',
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
        backgroundColor: "transparent",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        flex: 1,
        shadowColor: "rgba(75, 57, 239, 0.15)",
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowRadius: 20,
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 350,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "transparent",
                shadowColor: "transparent",
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowRadius: 0,
                overflow: "hidden"
            }
        })
    },
    contentWrapper: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 40,
        flex: 1,
        ...Platform.select({
            web: {
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 30
            }
        })
    },
    titleContainer: {
        marginBottom: 10,
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
        marginBottom: 10,
    },
    inputField: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 16,
        marginBottom: 14,
        minHeight: 56,
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },
    inputText: {
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
    },
    textInput: {
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        padding: 0,
        margin: 0,
        includeFontPadding: false,
        textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
    },
    checkboxContainer: {
        marginBottom: 15,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#D5D7DA",
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: "#5925DC",
        borderColor: "#5925DC",
    },
    checkmark: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    checkboxText: {
        flex: 1,
        color: "#14181B",
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.16,
        lineHeight: 19.2,
    },
    linkText: {
        color: "#14181B",
        fontFamily: "Outfit-Regular",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: 0.16,
        lineHeight: 19.2,
        textDecorationLine: "underline",
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 20,
        paddingHorizontal: 15,
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
        alignSelf: 'center',
    },
    buttonDisabled: {
        backgroundColor: "#5925DC",
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    },
    buttonTextDisabled: {
        color: "rgba(255, 255, 255, 0.6)",
    },
    bottomSpacer: {
        backgroundColor: "#FFFFFF",
        height: 40,
    },
}); 