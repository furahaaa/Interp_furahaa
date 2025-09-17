import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView, Platform } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

// Données des langues avec drapeaux et pays
const languageData = {
    'Français': { flag: '🇫🇷', country: 'France' },
    'Anglais': { flag: '🇬🇧', country: 'Royaume-Uni' },
    'Portugais': { flag: '🇵🇹', country: 'Portugal' },
    'Espagnol': { flag: '🇪🇸', country: 'Espagne' },
    'Allemand': { flag: '🇩🇪', country: 'Allemagne' },
    'Italien': { flag: '🇮🇹', country: 'Italie' },
    'Néerlandais': { flag: '🇳🇱', country: 'Pays-Bas' },
    'Polonais': { flag: '🇵🇱', country: 'Pologne' },
    'Russe': { flag: '🇷🇺', country: 'Russie' },
    'Japonais': { flag: '🇯🇵', country: 'Japon' },
    'Coréen': { flag: '🇰🇷', country: 'Corée du Sud' },
    'Chinois': { flag: '🇨🇳', country: 'Chine' },
    'Mandarin (Chinois)': { flag: '🇨🇳', country: 'Chine' },
    'Arabe': { flag: '🇸🇦', country: 'Arabie Saoudite' },
    'Hindi': { flag: '🇮🇳', country: 'Inde' },
    'Bengali': { flag: '🇧🇩', country: 'Bangladesh' },
    'Turc': { flag: '🇹🇷', country: 'Turquie' },
    'Persan (Farsi)': { flag: '🇮🇷', country: 'Iran' },
    'Suédois': { flag: '🇸🇪', country: 'Suède' },
    'Norvégien': { flag: '🇳🇴', country: 'Norvège' },
    'Danois': { flag: '🇩🇰', country: 'Danemark' },
    'Finnois': { flag: '🇫🇮', country: 'Finlande' },
    'Islandais': { flag: '🇮🇸', country: 'Islande' },
    'Grec': { flag: '🇬🇷', country: 'Grèce' },
    'Bulgare': { flag: '🇧🇬', country: 'Bulgarie' },
    'Roumain': { flag: '🇷🇴', country: 'Roumanie' },
    'Hongrois': { flag: '🇭🇺', country: 'Hongrie' },
    'Tchèque': { flag: '🇨🇿', country: 'République tchèque' },
    'Slovaque': { flag: '🇸🇰', country: 'Slovaquie' },
    'Slovène': { flag: '🇸🇮', country: 'Slovénie' },
    'Croate': { flag: '🇭🇷', country: 'Croatie' },
    'Serbe': { flag: '🇷🇸', country: 'Serbie' },
    'Bosnien': { flag: '🇧🇦', country: 'Bosnie-Herzégovine' },
    'Macédonien': { flag: '🇲🇰', country: 'Macédoine du Nord' },
    'Albanais': { flag: '🇦🇱', country: 'Albanie' },
    'Monténégrin': { flag: '🇲🇪', country: 'Monténégro' },
    'Ukrainien': { flag: '🇺🇦', country: 'Ukraine' },
    'Biélorusse': { flag: '🇧🇾', country: 'Biélorussie' },
    'Lituanien': { flag: '🇱🇹', country: 'Lituanie' },
    'Letton': { flag: '🇱🇻', country: 'Lettonie' },
    'Estonien': { flag: '🇪🇪', country: 'Estonie' },
    'Vietnamien': { flag: '🇻🇳', country: 'Vietnam' },
    'Thaï': { flag: '🇹🇭', country: 'Thaïlande' },
    'Khmer': { flag: '🇰🇭', country: 'Cambodge' },
    'Lao': { flag: '🇱🇦', country: 'Laos' },
    'Birman': { flag: '🇲🇲', country: 'Myanmar' },
    'Malais': { flag: '🇲🇾', country: 'Malaisie' },
    'Indonésien': { flag: '🇮🇩', country: 'Indonésie' },
    'Filipino (Tagalog)': { flag: '🇵🇭', country: 'Philippines' },
    'Tamoul': { flag: '🇱🇰', country: 'Sri Lanka' },
    'Sinhala': { flag: '🇱🇰', country: 'Sri Lanka' },
    'Népalais': { flag: '🇳🇵', country: 'Népal' },
    'Urdu': { flag: '🇵🇰', country: 'Pakistan' },
    'Pachto': { flag: '🇦🇫', country: 'Afghanistan' },
    'Ouzbek': { flag: '🇺🇿', country: 'Ouzbékistan' },
    'Kazakh': { flag: '🇰🇿', country: 'Kazakhstan' },
    'Kirghiz': { flag: '🇰🇬', country: 'Kirghizistan' },
    'Tadjik': { flag: '🇹🇯', country: 'Tadjikistan' },
    'Turkmène': { flag: '🇹🇲', country: 'Turkménistan' },
    'Hébreu': { flag: '🇮🇱', country: 'Israël' },
    'Arménien': { flag: '🇦🇲', country: 'Arménie' },
    'Azéri': { flag: '🇦🇿', country: 'Azerbaïdjan' },
    'Géorgien': { flag: '🇬🇪', country: 'Géorgie' },
    'Amharique': { flag: '🇪🇹', country: 'Éthiopie' },
    'Swahili': { flag: '🇹🇿', country: 'Tanzanie' },
    'Afrikaans': { flag: '🇿🇦', country: 'Afrique du Sud' },
    'Shona': { flag: '🇿🇼', country: 'Zimbabwe' },
    'Somali': { flag: '🇸🇴', country: 'Somalie' },
    'Malgache': { flag: '🇲🇬', country: 'Madagascar' },
    'Maori': { flag: '🇳🇿', country: 'Nouvelle-Zélande' },
    'Quechua': { flag: '🇵🇪', country: 'Pérou' },
    'Guarani': { flag: '🇵🇾', country: 'Paraguay' },
    'Créole (divers, ex. Haïtien, Mauricien)': { flag: '🇭🇹', country: 'Haïti' },
    'Samoan': { flag: '🇼🇸', country: 'Samoa' },
    'Tongien': { flag: '🇹🇴', country: 'Tonga' },
    'Fidjien': { flag: '🇫🇯', country: 'Fidji' },
    'Marshallais': { flag: '🇲🇭', country: 'Îles Marshall' },
    'Palauan': { flag: '🇵🇼', country: 'Palaos' },
    'Gilbertais': { flag: '🇰🇮', country: 'Kiribati' },
    'Tuvaluan': { flag: '🇹🇻', country: 'Tuvalu' },
    'Nauruan': { flag: '🇳🇷', country: 'Nauru' },
    'Bislama': { flag: '🇻🇺', country: 'Vanuatu' },
    'Tok Pisin': { flag: '🇵🇬', country: 'Papouasie-Nouvelle-Guinée' },
    'Tetum': { flag: '🇹🇱', country: 'Timor oriental' },
    'Maltais': { flag: '🇲🇹', country: 'Malte' },
    'Irlandais (Gaélique)': { flag: '🇮🇪', country: 'Irlande' },
    'Luxembourgeois': { flag: '🇱🇺', country: 'Luxembourg' },
    'Dhivehi': { flag: '🇲🇻', country: 'Maldives' },
    'Dzongkha': { flag: '🇧🇹', country: 'Bhoutan' },
    'Kinyarwanda': { flag: '🇷🇼', country: 'Rwanda' }
};

const DashboardInterp = () => {
    const [selectedType, setSelectedType] = useState<'interprétation' | 'translation'>('interprétation');
    const [selectedTargetLanguage, setSelectedTargetLanguage] = useState<string>('');

    const loadSelectedLanguage = () => {
        // Simulation du chargement de la langue sélectionnée
        // En production, ceci pourrait être récupéré depuis un service ou un store
        console.log('Chargement de la langue sélectionnée...');
        // Pour l'instant, on garde la valeur par défaut vide
        setSelectedTargetLanguage('');
    };

    useFocusEffect(
        React.useCallback(() => {
            loadSelectedLanguage();
        }, [])
    );

    const handleTypeSelection = (type: 'interprétation' | 'translation') => {
        setSelectedType(type);
        if (type === 'interprétation') {
            router.push('/dashboard_interp_video');
        }
    };

    const handleTargetLanguagePress = () => {
        router.push('/langue_cible');
    };

    const getImageSource = () => {
        if (selectedType === 'interprétation') {
            return require("../assets/images/interprete_1.png");
        } else {
            return require("../assets/images/interprete_2.png");
        }
    };

    return (
        <View style={styles.backgroundContainer}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={Platform.OS === 'web' ? styles.webScrollContent : undefined}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>Bonjour Arthur 👋</Text>
                    <Text style={styles.welcomeText}>Heureux de te voir rejoindre Interp</Text>
                </View>

                {/* Type Selector */}
                <View style={styles.typeSelector}>
                    <Pressable
                        style={[
                            styles.typeButton,
                            selectedType === 'interprétation' && styles.selectedTypeButton
                        ]}
                        onPress={() => handleTypeSelection('interprétation')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            selectedType === 'interprétation' && styles.selectedTypeButtonTextInterp
                        ]}>
                            Interprétation
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.typeButton,
                            selectedType === 'translation' && styles.selectedTypeButton
                        ]}
                        onPress={() => handleTypeSelection('translation')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            selectedType === 'translation' && styles.selectedTypeButtonTextTrans
                        ]}>
                            Translation
                        </Text>
                    </Pressable>
                </View>

                {/* Main Illustration */}
                <View style={styles.illustrationContainer}>
                    <Image
                        style={styles.illustration}
                        source={getImageSource()}
                        resizeMode="contain"
                    />
                </View>

                {/* Language Selection Section */}
                <View style={styles.languageSection}>
                    <Text style={styles.sectionTitle}>
                        {selectedType === 'interprétation'
                            ? 'Simplifiez votre communication'
                            : 'Traduisez tout simplement'
                        }
                    </Text>

                    <View style={styles.languageSelector}>
                        <View style={styles.sourceLanguage}>
                            <View style={styles.languageInfo}>
                                <Text style={styles.languageName}>Française</Text>
                                <View style={styles.languageRow}>
                                    <View style={styles.flagContainer}>
                                        <View style={styles.frenchFlag}>
                                            <View style={styles.flagStripe1} />
                                            <View style={styles.flagStripe2} />
                                            <View style={styles.flagStripe3} />
                                        </View>
                                    </View>
                                    <Text style={styles.countryName}>France</Text>
                                </View>
                            </View>
                            <View style={styles.lsfTag}>
                                <Text style={styles.lsfText}>LSF</Text>
                            </View>
                        </View>

                        <Pressable style={[
                            styles.targetLanguage,
                            selectedTargetLanguage && styles.targetLanguageSelected
                        ]} onPress={handleTargetLanguagePress}>
                            {selectedTargetLanguage ? (
                                <>
                                    <View style={styles.selectedLanguageHeader}>
                                        <Text style={styles.selectedLanguageFlag}>
                                            {languageData[selectedTargetLanguage as keyof typeof languageData]?.flag || '🌍'}
                                        </Text>
                                        <Text style={styles.selectedLanguageName}>{selectedTargetLanguage}</Text>
                                    </View>
                                    <Text style={styles.selectedLanguageCountry}>
                                        {languageData[selectedTargetLanguage as keyof typeof languageData]?.country || 'Pays'}
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.targetLabel}>Langue cible ? Rechercher</Text>
                                </>
                            )}
                        </Pressable>
                    </View>

                    <Text style={styles.description}>
                        Trouvez facilement et rapidement un interprète professionnel pour vos besoins.
                    </Text>
                </View>

                {/* Opportunities Section */}
                <View style={styles.opportunitiesSection}>
                    <Text style={styles.opportunitiesTitle}>Opportunités pour vous ✨</Text>

                    {/* Professional Card */}
                    <View style={styles.opportunityCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.leftSpacer} />
                            <View style={styles.chatBubbleIcon}>
                                <Text style={styles.bubbleIcon}>💬</Text>
                            </View>
                            <View style={styles.professionalTag}>
                                <Text style={styles.tagText}>Professionnel</Text>
                            </View>
                        </View>
                        <Text style={styles.cardTitle}>Maîtrisez plusieurs langues ?</Text>
                        <Text style={styles.cardDescription}>
                            Rejoignez notre réseau d'interprètes professionnels et valorisez vos compétences.
                        </Text>
                        <Pressable style={styles.professionalButton}>
                            <Text style={styles.buttonText}>Devenir InterpPro</Text>
                        </Pressable>
                    </View>

                    {/* Community Card */}
                    <View style={[styles.opportunityCard, styles.communityCard]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.leftSpacer} />
                            <View style={styles.communityIcon}>
                                <Image
                                    style={styles.communityLogo}
                                    source={require("../assets/images/communautaire_logo.png")}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.communityTag}>
                                <Text style={styles.tagText}>Communauté</Text>
                            </View>
                        </View>
                        <Text style={styles.communityCardTitle}>Aidez les autres ?</Text>
                        <Text style={styles.cardDescription}>
                            Utilisez vos talents pour aider votre communauté et valoriser vos compétences.
                        </Text>
                        <Pressable style={styles.communityButton}>
                            <Text style={styles.buttonText}>Devenir communautaire</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                style={styles.navIcon}
                                source={require("../assets/images/accueil.png")}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Accueil</Text>
                    </View>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                style={styles.navIcon}
                                source={require("../assets/images/messages.png")}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Messages</Text>
                    </View>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                style={[styles.navIcon, styles.accountIconAdjustment]}
                                source={require("../assets/images/comptes.png")}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Compte</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }
        })
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    webScrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        ...Platform.select({
            web: {
                paddingTop: 40,
                textAlign: "center",
            }
        })
    },
    greeting: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
        ...Platform.select({
            web: {
                textAlign: "center",
            }
        })
    },
    welcomeText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        ...Platform.select({
            web: {
                textAlign: "center",
            }
        })
    },
    typeSelector: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        padding: 5,
        ...Platform.select({
            web: {
                marginHorizontal: 15,
            }
        })
    },
    typeButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    selectedTypeButton: {
        backgroundColor: '#333',
    },
    typeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    selectedTypeButtonText: {
        color: '#FCD664',
    },
    selectedTypeButtonTextInterp: {
        color: '#FCD664',
    },
    selectedTypeButtonTextTrans: {
        color: '#6AF7D7',
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: 30,
        ...Platform.select({
            web: {
                marginBottom: 20,
            }
        })
    },
    illustration: {
        width: 350,
        height: 300,
        ...Platform.select({
            web: {
                width: 280,
                height: 240,
            }
        })
    },
    languageSection: {
        paddingHorizontal: 20,
        marginBottom: 40,
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 30,
            }
        })
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    languageSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sourceLanguage: {
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 12,
        padding: 16,
        marginRight: 8,
    },
    languageInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    flagContainer: {
        marginRight: 8,
    },
    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    frenchFlag: {
        width: 16,
        height: 16,
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
    },
    flagStripe1: {
        flex: 1,
        backgroundColor: '#002395',
    },
    flagStripe2: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flagStripe3: {
        flex: 1,
        backgroundColor: '#ed2939',
    },
    languageTextContainer: {
        flex: 1,
    },
    languageName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    countryName: {
        fontSize: 14,
        color: '#666',
    },
    lsfTag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    lsfText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    targetLanguage: {
        width: '48%',
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginLeft: 8,
    },
    targetLanguageSelected: {
        borderColor: '#000000',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    targetLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    searchText: {
        fontSize: 14,
        color: '#999',
    },
    selectedLanguageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    selectedLanguageFlag: {
        fontSize: 20,
    },
    selectedLanguageName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    selectedLanguageCountry: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
    opportunitiesSection: {
        paddingHorizontal: 20,
        marginBottom: 40,
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 30,
            }
        })
    },
    opportunitiesTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    opportunityCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    communityCard: {
        backgroundColor: 'rgba(236, 253, 243, 1)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    leftSpacer: {
        width: 80,
    },
    chatBubbleIcon: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -18 }, { translateY: -18 }],
        flexDirection: 'row',
        alignItems: 'center',
    },
    communityIcon: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -40 }, { translateY: -18 }],
        flexDirection: 'row',
        alignItems: 'center',
    },
    peopleIcon: {
        fontSize: 36,
    },
    communityLogo: {
        width: 80,
        height: 60,
    },
    bubbleIcon: {
        fontSize: 36,
        marginRight: 6,
    },
    dotsIcon: {
        fontSize: 22,
        color: '#666',
    },
    professionalTag: {
        backgroundColor: '#e3f2fd',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    communityTag: {
        backgroundColor: '#e8f5e8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1976d2',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 12,
        textAlign: 'center',
    },
    communityCardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginTop: 40,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 20,
    },
    professionalButton: {
        backgroundColor: '#1976d2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    communityButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 40,
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 20,
                position: "relative",
            }
        })
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },

    navText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    navIconContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    navIcon: {
        width: 40,
        height: 40,
    },
    accountIconAdjustment: {
        marginLeft: -8,
    },
});

export default DashboardInterp;
