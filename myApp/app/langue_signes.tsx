import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Svg, Path, Line, Circle } from 'react-native-svg';
import { router } from 'expo-router';

// Composant Checkboxgroupitem
function Checkboxgroupitem() {
    return (
        <View style={styles.checkboxgroupitemContainer}>
            <View style={styles.content}>
                <View style={styles.textandsupportingtext}>
                    <Text style={styles.text}>
                        {`Française`}
                    </Text>
                    <Text style={styles.supportingtext}>
                        {` . `}
                    </Text>
                    <View style={styles.swissCross}>
                        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <Path d="M6 1V11M1 6H11" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                        </Svg>
                    </View>
                    <Text style={styles.supportingtext}>
                        {` Suisse`}
                    </Text>
                    <View style={styles.lsfTag}>
                        <Text style={styles.lsfText}>LSF</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

// Composant pour une langue individuelle
function LanguageItem({ language, onRemove }: { language: any, onRemove: (id: string) => void }) {
    const renderFlag = (flagType: string) => {
        switch (flagType) {
            case 'france':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H8V18H0V0Z" fill="#002395" />
                            <Path d="M8 0H16V18H8V0Z" fill="#FFFFFF" />
                            <Path d="M16 0H24V18H16V0Z" fill="#ED2939" />
                        </Svg>
                    </View>
                );
            case 'usa':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V1.2H0V0Z" fill="#B22234" />
                            <Path d="M0 1.2H24V2.4H0V1.2Z" fill="#FFFFFF" />
                            <Path d="M0 2.4H24V3.6H0V2.4Z" fill="#B22234" />
                            <Path d="M0 3.6H24V4.8H0V3.6Z" fill="#FFFFFF" />
                            <Path d="M0 4.8H24V6H0V4.8Z" fill="#B22234" />
                            <Path d="M0 6H24V7.2H0V6Z" fill="#FFFFFF" />
                            <Path d="M0 7.2H24V8.4H0V7.2Z" fill="#B22234" />
                            <Path d="M0 8.4H24V9.6H0V8.4Z" fill="#FFFFFF" />
                            <Path d="M0 9.6H24V10.8H0V9.6Z" fill="#B22234" />
                            <Path d="M0 10.8H24V12H0V10.8Z" fill="#FFFFFF" />
                            <Path d="M0 12H24V13.2H0V12Z" fill="#B22234" />
                            <Path d="M0 13.2H24V14.4H0V13.2Z" fill="#FFFFFF" />
                            <Path d="M0 14.4H24V15.6H0V14.4Z" fill="#B22234" />
                            <Path d="M0 15.6H24V16.8H0V15.6Z" fill="#FFFFFF" />
                            <Path d="M0 16.8H24V18H0V16.8Z" fill="#B22234" />
                            <Path d="M0 0H9.6V9.6H0V0Z" fill="#3C3B6E" />
                        </Svg>
                    </View>
                );
            default:
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V18H0V0Z" fill="#E5E7EB" />
                            <Path d="M12 6L12 12M9 9H15" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </View>
                );
        }
    };

    return (
        <View style={styles.languageItem}>
            <View style={styles.languageContent}>
                {renderFlag(language.flagType)}
                <View style={styles.languageTextContainer}>
                    <View style={styles.languageMainInfo}>
                        <Text style={styles.languageText}>{language.name}</Text>
                        <View style={styles.countryInfo}>
                            <Text style={styles.languageSubtext}>{language.subtext}</Text>
                        </View>
                    </View>
                    <View style={styles.languageTag}>
                        <Text style={styles.languageTagText}>{language.tag}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(language.id)}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Path d="M12 4L4 12M4 4L12 12" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
                </Svg>
            </TouchableOpacity>
        </View>
    );
}

export default function LangueSignes() {
    const [languages, setLanguages] = useState([
        { id: '1', name: 'Langue des signes française', subtext: 'France', tag: 'LSF', flagType: 'france' },
        { id: '2', name: 'American Sign Language', subtext: 'USA', tag: 'ASL', flagType: 'usa' }
    ]);

    const removeLanguage = (id: string) => {
        setLanguages(languages.filter(lang => lang.id !== id));
    };

    const handleBack = () => {
        router.back();
    };

    const handlePasser = () => {
        // Navigation vers la page account_fin
        router.push('/account_fin');
    };

    const addLanguage = () => {
        if (languages.length >= 3) return;

        const newId = (Math.max(...languages.map(lang => parseInt(lang.id))) + 1).toString();
        const newLanguage = {
            id: newId,
            name: 'Nouvelle langue des signes',
            subtext: 'Pays',
            tag: 'LS',
            flagType: 'default'
        };
        setLanguages(prev => [...prev, newLanguage]);
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

            {/* Contenu principal */}
            <View style={styles.mainContent}>
                <View style={styles.contentWrapper}>
                    {/* Image GIF */}
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            source={require('../assets/images/giphy.gif')}
                            style={styles.gifImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Titre */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {`Utiliser la langue des signes`}
                        </Text>
                    </View>

                    {/* Liste des langues avec drag & drop */}
                    <View style={styles.languagesList}>
                        <ScrollView>
                            {languages.map((language) => (
                                <LanguageItem
                                    key={language.id}
                                    language={language}
                                    onRemove={removeLanguage}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>

            {/* Bouton d'ajout de langue des signes */}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.addLanguageButton,
                        languages.length >= 3 && styles.addLanguageButtonDisabled
                    ]}
                    onPress={addLanguage}
                    disabled={languages.length >= 3}
                >
                    <View style={styles.addLanguageContent}>
                        <View style={styles.plusIcon}>
                            <Svg style={[
                                styles.plusIconSvg,
                                languages.length >= 3 && styles.plusIconDisabled
                            ]} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <Path d="M9.99935 6.6665V13.3332M6.66602 9.99984H13.3327M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                        <Text style={[
                            styles.addLanguageText,
                            languages.length >= 3 && styles.addLanguageTextDisabled
                        ]}>
                            {`Ajouter la langue des signes`}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Description */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    {`Tu peux modifier ou ajouter des langues plus tard.`}
                </Text>
            </View>

            {/* Bouton Continuer */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePasser}>
                    <Text style={styles.buttonText}>
                        {`Continuer`}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        ...Platform.select({
            web: {
                width: 360,
                height: 700,
                alignSelf: "center",
                maxWidth: "100%",
                border: "1px solid #ddd",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 15,
                paddingBottom: 100,
                backgroundColor: "#FFFFFF"
            }
        })
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 320,
                paddingTop: 30,
                paddingBottom: 10
            }
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
        width: '90%',
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
        flex: 1,
    },
    contentWrapper: {
        paddingHorizontal: 35,
        paddingTop: 20,
        paddingBottom: 40,
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -50,
    },
    gifImage: {
        width: 200,
        height: 200,
        ...Platform.select({
            web: {
                width: 120,
                height: 120,
            }
        })
    },
    titleContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontWeight: "800",
        lineHeight: 32,
        textAlign: 'center',
    },
    addLanguageButton: {
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderStyle: 'dashed',
        width: '90%',
        minHeight: 56,
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 350
            }
        })
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
    addLanguageText: {
        fontSize: 16,
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontWeight: "400",
        lineHeight: 24
    },
    addLanguageButtonDisabled: {
        opacity: 0.5,
        backgroundColor: "rgba(234, 236, 245, 0.7)",
        borderColor: "rgba(213, 215, 218, 0.7)",
    },
    addLanguageTextDisabled: {
        color: "rgba(113, 118, 128, 0.7)",
    },
    plusIconDisabled: {
        opacity: 0.5,
    },
    description: {
        textAlign: "center",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 21,
        marginTop: 0,
        marginBottom: 20
    },

    addButtonContainer: {
        position: 'absolute',
        bottom: 180,
        left: 15,
        right: 15,
        alignItems: 'center',
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 320,
                left: "50%",
                transform: [{ translateX: -160 }],
                bottom: 160,
                alignItems: "center"
            }
        })
    },
    descriptionContainer: {
        position: 'absolute',
        bottom: 100,
        left: 15,
        right: 15,
        alignItems: 'center',
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 320,
                left: "50%",
                transform: [{ translateX: -160 }],
                bottom: 70
            }
        })
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        left: 15,
        right: 15,
        alignItems: 'center',
        ...Platform.select({
            web: {
                width: "100%",
                maxWidth: 320,
                left: "50%",
                transform: [{ translateX: -160 }],
                bottom: 25
            }
        })
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
    },
    checkboxgroupitemContainer: {
        position: "relative",
        flexShrink: 0,
        width: 343,
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        alignItems: "flex-start",
        columnGap: 4,
        padding: 16,
        borderRadius: 8
    },
    content: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "flex-start",
        columnGap: 16
    },
    textandsupportingtext: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 2
    },
    text: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(37, 43, 55, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
    supportingtext: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(83, 88, 98, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24
    },
    swissCross: {
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lsfTag: {
        backgroundColor: "rgba(234, 236, 245, 1)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 12,
    },
    lsfText: {
        fontSize: 12,
        color: "rgba(89, 37, 220, 1)",
        fontFamily: "Inter",
        fontWeight: "600",
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(245, 245, 245, 1)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(213, 215, 218, 1)',
        ...Platform.select({
            web: {
                padding: 5,
                marginBottom: 6
            }
        })
    },
    languageContent: {
        flex: 1,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagContainer: {
        width: 24,
        height: 18,
        marginRight: 12,
        borderRadius: 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagSvg: {
        width: 24,
        height: 18,
    },
    languageTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    languageMainInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    countryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    languageText: {
        fontSize: 16,
        color: 'rgba(37, 43, 55, 1)',
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 24,
    },
    languageSubtext: {
        fontSize: 14,
        color: 'rgba(83, 88, 98, 1)',
        fontFamily: 'Inter',
        fontWeight: '400',
        lineHeight: 20,
        marginLeft: 4,
    },
    languageTag: {
        backgroundColor: 'rgba(234, 236, 245, 1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    languageTagText: {
        fontSize: 12,
        color: 'rgba(89, 37, 220, 1)',
        fontFamily: 'Inter',
        fontWeight: '600',
    },
    removeButton: {
        padding: 8,
    },
    languagesList: {
        marginBottom: 20,
        maxHeight: 250,
    },
});