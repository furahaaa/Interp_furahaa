import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = screenWidth > 500;

export default function LangueSource() {
    const [selectedLanguages, setSelectedLanguages] = useState([
        { id: 1, name: 'Français', country: 'Suisse', flag: 'swiss', removable: false },
        { id: 2, name: 'Allemand', country: 'Allemagne', flag: 'german', removable: true }
    ]);

    const handleBack = () => {
        router.back();
    };

    const removeLanguage = (id: number) => {
        setSelectedLanguages(prev => prev.filter(lang => lang.id !== id));
    };

    const addLanguage = () => {
        if (selectedLanguages.length >= 3) return;

        const newId = Math.max(...selectedLanguages.map(lang => lang.id)) + 1;
        setSelectedLanguages(prev => [...prev, {
            id: newId,
            name: 'Nouvelle langue',
            country: '',
            flag: 'default',
            removable: true
        }]);
    };

    const renderFlag = (flagType: string) => {
        switch (flagType) {
            case 'swiss':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagBackground} width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <Path d="M0 0H17V16H0V0Z" fill="#D80027" />
                        </Svg>
                        <Svg style={styles.flagCross} width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <Path d="M4.5 0H5.5V4H9V5H5.5V9H4.5V5H1V4H4.5V0Z" fill="#F0F0F0" />
                        </Svg>
                    </View>
                );
            case 'german':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.germanFlag} width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <Path d="M0 0H17V5.33H0V0Z" fill="#000000" />
                            <Path d="M0 5.33H17V10.67H0V5.33Z" fill="#DD0000" />
                            <Path d="M0 10.67H17V16H0V10.67Z" fill="#FFCE00" />
                        </Svg>
                    </View>
                );
            default:
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.defaultFlag} width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <Path d="M0 0H17V16H0V0Z" fill="#E5E7EB" />
                            <Path d="M8.5 6.5L8.5 9.5M6.5 8H10.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            {/* Header avec flèche et barre de progression */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={handleBack}>
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

            {/* Contenu principal avec ScrollView */}
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentWrapper}>
                    {/* Titre */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {`Langue de source préférée`}
                        </Text>
                    </View>

                    {/* Liste des langues sélectionnées */}
                    <View style={styles.languagesList}>
                        {selectedLanguages.map((language) => (
                            <View key={language.id} style={styles.languageCard}>
                                <View style={styles.languageInfo}>
                                    {renderFlag(language.flag)}
                                    <View style={styles.languageText}>
                                        <Text style={styles.languageName}>
                                            {language.name}
                                        </Text>
                                        {language.country && (
                                            <Text style={styles.languageCountry}>
                                                {language.country}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                {language.removable && (
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => removeLanguage(language.id)}
                                    >
                                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <Path d="M15 5L5 15M5 5L15 15" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>

                    {/* Bouton d'ajout de langue */}
                    <TouchableOpacity
                        style={[
                            styles.addLanguageButton,
                            selectedLanguages.length >= 3 && styles.addLanguageButtonDisabled
                        ]}
                        onPress={addLanguage}
                        disabled={selectedLanguages.length >= 3}
                    >
                        <View style={styles.addLanguageContent}>
                            <View style={styles.plusIcon}>
                                <Svg style={[
                                    styles.plusIconSvg,
                                    selectedLanguages.length >= 3 && styles.plusIconDisabled
                                ]} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <Path d="M9.99935 6.6665V13.3332M6.66602 9.99984H13.3327M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </View>
                            <Text style={[
                                styles.addLanguageText,
                                selectedLanguages.length >= 3 && styles.addLanguageTextDisabled
                            ]}>
                                {`Ajouter une autre langue`}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Bouton Continuer */}
                    <View style={styles.buttonContainer}>
                        <Text style={styles.description}>
                            {`Tu peux modifier ou ajouter des autres langues plus tard.`}
                        </Text>

                        <TouchableOpacity style={styles.button} onPress={() => router.push('/langue_signes')}>
                            <Text style={styles.buttonText}>
                                {`Continuer`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 15,
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 10,
        ...(Platform.OS === 'web' && {
            width: "100%",
            paddingTop: 20,
            paddingBottom: 10,
            paddingHorizontal: 0
        })
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
        width: '70%',
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
    scrollContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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
    contentWrapper: {
        paddingHorizontal: 35,
        paddingTop: 20,
        paddingBottom: 20,
        ...(Platform.OS === 'web' && {
            paddingHorizontal: 0,
            paddingTop: 15,
            paddingBottom: 20,
            width: "100%"
        })
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        lineHeight: 44,
        ...(isWeb && {
            textAlign: "center"
        })
    },
    languagesList: {
        marginBottom: 35,
        paddingRight: 10,
    },
    languageCard: {
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 85,
        ...(isWeb && {
            backgroundColor: "#FFFFFF",
            borderWidth: 1,
            borderColor: "rgba(213, 215, 218, 1)",
            shadowColor: "transparent",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            elevation: 0,
            width: '90%',
            alignSelf: 'center',
        })
    },
    languageInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    flagContainer: {
        width: 17,
        height: 16,
        marginRight: 16,
        borderRadius: 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagBackground: {
        position: 'absolute',
        width: 17,
        height: 16,
    },
    flagCross: {
        position: "absolute",
        width: 9,
        height: 9,
    },
    germanFlag: {
        width: 17,
        height: 16,
    },
    defaultFlag: {
        width: 17,
        height: 16,
    },
    languageText: {
        flex: 1,
    },
    languageName: {
        fontSize: 16,
        color: "rgba(37, 43, 55, 1)",
        fontFamily: "Inter",
        fontWeight: "600",
        lineHeight: 24,
        marginBottom: 2,
    },
    languageCountry: {
        fontSize: 16,
        color: "rgba(83, 88, 98, 1)",
        fontFamily: "Inter",
        fontWeight: "400",
        lineHeight: 24,
    },
    removeButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(234, 236, 245, 1)",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    addLanguageButton: {
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 8,
        padding: 16,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderStyle: 'dashed',
        minHeight: 56,
        paddingVertical: 16,
        ...(Platform.OS === 'web' && {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "rgba(213, 215, 218, 0.5)",
            borderStyle: 'dashed',
        })
    },
    addLanguageButtonDisabled: {
        opacity: 0.5,
        backgroundColor: "rgba(234, 236, 245, 0.7)",
        borderColor: "rgba(213, 215, 218, 0.7)",
    },
    addLanguageContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIconSvg: {
        width: 20,
        height: 20,
    },
    plusIconDisabled: {
        opacity: 0.5,
    },
    addLanguageText: {
        fontSize: 16,
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontWeight: "400",
        lineHeight: 24,
    },
    addLanguageTextDisabled: {
        color: "rgba(113, 118, 128, 0.7)",
    },
    description: {
        textAlign: "center",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 21,
        marginBottom: 25,
        marginTop: 0
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: "rgba(89, 37, 220, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 8,
        width: '90%',
        minHeight: 56,
    },
    buttonText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    }
});
