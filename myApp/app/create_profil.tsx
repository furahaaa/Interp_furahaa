import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function CreateProfile() {
    const [selectedLanguages, setSelectedLanguages] = useState({
        french: true,
        german: false
    });

    const handleLanguageToggle = (language: 'french' | 'german') => {
        setSelectedLanguages(prev => ({
            ...prev,
            [language]: !prev[language]
        }));
    };

    const handleContinue = () => {
        // Ici vous pouvez ajouter la logique pour continuer
        router.push('/activation_location');
    };

    const handleAddLanguage = () => {
        // Ici vous pouvez ajouter la logique pour ajouter une langue
        console.log('Ajouter une langue');
    };

    return (
        <View style={styles.container}>
            {/* Header avec flèche et barre de progression */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
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
                <View style={styles.contentWrapper}>
                    {/* Titre */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{"Super David ! 🙌"}</Text>
                        <Text style={styles.subtitle}>{"Et aussi..."}</Text>
                    </View>

                    {/* Langue française */}
                    <View style={styles.languageGroup}>
                        <TouchableOpacity
                            style={[styles.languageItem, selectedLanguages.french && styles.selectedLanguage]}
                            onPress={() => handleLanguageToggle('french')}
                        >
                            <View style={styles.languageContent}>
                                <View style={styles.languageIcon}>
                                    <View style={styles.iconContainer}>
                                        <Svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                                            <Path d="M3.84199 11.5752L2.83366 19.1668L7.00033 16.6668L11.167 19.1668L10.1587 11.5668M12.8337 6.66683C12.8337 9.88849 10.222 12.5002 7.00033 12.5002C3.77866 12.5002 1.16699 9.88849 1.16699 6.66683C1.16699 3.44517 3.77866 0.833496 7.00033 0.833496C10.222 0.833496 12.8337 3.44517 12.8337 6.66683Z" stroke="#4A1FB8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    </View>
                                </View>
                                <View style={styles.languageText}>
                                    <Text style={styles.languageName}>
                                        Français
                                    </Text>
                                    <Text style={styles.languageDescription}>
                                        Votre langue native
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.checkbox, selectedLanguages.french && styles.checkedCheckbox]}>
                                {selectedLanguages.french && (
                                    <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <Path d="M10.6663 1.5L4.24967 7.91667L1.33301 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </Svg>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Langue allemande */}
                    <View style={styles.languageGroup}>
                        <TouchableOpacity
                            style={[styles.languageItem, selectedLanguages.german && styles.selectedLanguage]}
                            onPress={() => handleLanguageToggle('german')}
                        >
                            <View style={styles.languageContent}>
                                <View style={styles.languageIcon}>
                                    <View style={styles.iconContainer}>
                                        <Svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                                            <Path d="M3.84199 11.5752L2.83366 19.1668L7.00033 16.6668L11.167 19.1668L10.1587 11.5668M12.8337 6.66683C12.8337 9.88849 10.222 12.5002 7.00033 12.5002C3.77866 12.5002 1.16699 9.88849 1.16699 6.66683C1.16699 3.44517 3.77866 0.833496 7.00033 0.833496C10.222 0.833496 12.8337 3.44517 12.8337 6.66683Z" stroke="#4A1FB8" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    </View>
                                </View>
                                <View style={styles.languageText}>
                                    <Text style={styles.languageName}>
                                        Allemand
                                    </Text>
                                    <Text style={styles.languageDescription}>
                                        Votre langue maitrisée
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.checkbox, selectedLanguages.german && styles.checkedCheckbox]}>
                                {selectedLanguages.german && (
                                    <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                        <Path d="M10.6663 1.5L4.24967 7.91667L1.33301 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </Svg>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Bouton ajouter langue */}
                    <TouchableOpacity style={styles.addLanguageButton} onPress={handleAddLanguage}>
                        <View style={styles.addLanguageContent}>
                            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <Path d="M10.0003 6.66675V13.3334M6.66699 10.0001H13.3337M18.3337 10.0001C18.3337 14.6025 14.6027 18.3334 10.0003 18.3334C5.39795 18.3334 1.66699 14.6025 1.66699 10.0001C1.66699 5.39771 5.39795 1.66675 10.0003 1.66675C14.6027 1.66675 18.3337 5.39771 18.3337 10.0001Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                            <Text style={styles.addLanguageText}>
                                Ajouter une autre langue
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.infoText}>
                        Vous pouvez modifier ou ajouter des autres langues plus tard.
                    </Text>

                    {/* Bouton continuer */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={handleContinue}
                        >
                            <Text style={styles.continueButtonText}>
                                Continuer
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
        ...Platform.select({
            web: {
                width: 390,
                height: 700,
                alignSelf: "center",
                maxWidth: "100%",
                border: "1px solid #ddd",
                borderRadius: 20,
                overflow: "hidden"
            }
        })
    },
    header: {
        paddingTop: Platform.select({
            ios: 60,
            android: 60,
            web: 30
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
        width: 60,
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
        flex: 1,
        shadowColor: "rgba(75, 57, 239, 0.15)",
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowRadius: 20,
    },
    contentWrapper: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: Platform.OS === 'web' ? 20 : 20,
    },
    titleContainer: {
        marginBottom: 40,
    },
    title: {
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 28,
        fontWeight: "800",
        lineHeight: 32,
        marginBottom: 8,
    },
    subtitle: {
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 32,
    },
    languageGroup: {
        marginBottom: 24,
    },
    languageItem: {
        width: "100%",
        borderWidth: 1,
        borderColor: "rgba(189, 180, 254, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    selectedLanguage: {
        backgroundColor: "rgba(244, 243, 255, 1)",
        borderBottomWidth: 3,
    },
    languageContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    languageIcon: {
        width: 32,
        height: 32,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(235, 233, 254, 1)",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -4,
        marginTop: -4,
    },
    languageText: {
        flex: 1,
        gap: 2
    },
    languageName: {
        textAlign: "left",
        color: "rgba(74, 31, 184, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24
    },
    languageDescription: {
        textAlign: "left",
        color: "rgba(105, 56, 239, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24
    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: "rgba(235, 233, 254, 1)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    checkedCheckbox: {
        backgroundColor: "rgba(105, 56, 239, 1)",
    },
    addLanguageButton: {
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 20,
    },
    addLanguageContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    addLanguageText: {
        flex: 1,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24
    },
    infoText: {
        textAlign: "center",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 21,
        marginBottom: 40,
    },
    buttonContainer: {
        top: 60,
        paddingHorizontal: 37,
        paddingBottom: 20,
        ...Platform.select({
            web: {
                top: -20,
            }
        })
    },
    continueButton: {
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: "center",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },
    continueButtonText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
});