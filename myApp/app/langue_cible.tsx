import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Platform } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { router } from 'expo-router';

// Données des langues avec drapeaux et pays
const languageData = {
    'Français': { flagType: 'france', country: 'France' },
    'Anglais': { flagType: 'uk', country: 'Royaume-Uni' },
    'Portugais': { flagType: 'portugal', country: 'Portugal' },
    'Espagnol': { flagType: 'spain', country: 'Espagne' },
    'Allemand': { flagType: 'germany', country: 'Allemagne' },
    'Italien': { flagType: 'italy', country: 'Italie' },
    'Néerlandais': { flagType: 'default', country: 'Pays-Bas' },
    'Polonais': { flagType: 'default', country: 'Pologne' },
    'Russe': { flagType: 'default', country: 'Russie' },
    'Japonais': { flagType: 'default', country: 'Japon' },
    'Coréen': { flagType: 'default', country: 'Corée du Sud' },
    'Chinois': { flagType: 'default', country: 'Chine' },
    'Mandarin (Chinois)': { flagType: 'default', country: 'Chine' },
    'Arabe': { flagType: 'default', country: 'Arabie Saoudite' },
    'Hindi': { flagType: 'default', country: 'Inde' },
    'Bengali': { flagType: 'default', country: 'Bangladesh' },
    'Turc': { flagType: 'default', country: 'Turquie' },
    'Persan (Farsi)': { flagType: 'default', country: 'Iran' },
    'Suédois': { flagType: 'default', country: 'Suède' },
    'Norvégien': { flagType: 'default', country: 'Norvège' },
    'Danois': { flagType: 'default', country: 'Danemark' },
    'Finnois': { flagType: 'default', country: 'Finlande' },
    'Islandais': { flagType: 'default', country: 'Islande' },
    'Grec': { flagType: 'default', country: 'Grèce' },
    'Bulgare': { flagType: 'default', country: 'Bulgarie' },
    'Roumain': { flagType: 'default', country: 'Roumanie' },
    'Hongrois': { flagType: 'default', country: 'Hongrie' },
    'Tchèque': { flagType: 'default', country: 'République tchèque' },
    'Slovaque': { flagType: 'default', country: 'Slovaquie' },
    'Slovène': { flagType: 'default', country: 'Slovénie' },
    'Croate': { flagType: 'default', country: 'Croatie' },
    'Serbe': { flagType: 'default', country: 'Serbie' },
    'Bosnien': { flagType: 'default', country: 'Bosnie-Herzégovine' },
    'Macédonien': { flagType: 'default', country: 'Macédoine du Nord' },
    'Albanais': { flagType: 'default', country: 'Albanie' },
    'Monténégrin': { flagType: 'default', country: 'Monténégro' },
    'Ukrainien': { flagType: 'default', country: 'Ukraine' },
    'Biélorusse': { flagType: 'default', country: 'Biélorussie' },
    'Lituanien': { flagType: 'default', country: 'Lituanie' },
    'Letton': { flagType: 'default', country: 'Lettonie' },
    'Estonien': { flagType: 'default', country: 'Estonie' },
    'Vietnamien': { flagType: 'default', country: 'Vietnam' },
    'Thaï': { flagType: 'default', country: 'Thaïlande' },
    'Khmer': { flagType: 'default', country: 'Cambodge' },
    'Lao': { flagType: 'default', country: 'Laos' },
    'Birman': { flagType: 'default', country: 'Myanmar' },
    'Malais': { flagType: 'default', country: 'Malaisie' },
    'Indonésien': { flagType: 'default', country: 'Indonésie' },
    'Filipino (Tagalog)': { flagType: 'default', country: 'Philippines' },
    'Tamoul': { flagType: 'default', country: 'Sri Lanka' },
    'Sinhala': { flagType: 'default', country: 'Sri Lanka' },
    'Népalais': { flagType: 'default', country: 'Népal' },
    'Urdu': { flagType: 'default', country: 'Pakistan' },
    'Pachto': { flagType: 'default', country: 'Afghanistan' },
    'Dari': { flagType: 'default', country: 'Afghanistan' },
    'Ouzbek': { flagType: 'default', country: 'Ouzbékistan' },
    'Kazakh': { flagType: 'default', country: 'Kazakhstan' },
    'Kirghiz': { flagType: 'default', country: 'Kirghizistan' },
    'Tadjik': { flagType: 'default', country: 'Tadjikistan' },
    'Turkmène': { flagType: 'default', country: 'Turkménistan' },
    'Mongol': { flagType: 'default', country: 'Mongolie' },
    'Hébreu': { flagType: 'default', country: 'Israël' },
    'Arménien': { flagType: 'default', country: 'Arménie' },
    'Azéri': { flagType: 'default', country: 'Azerbaïdjan' },
    'Géorgien': { flagType: 'default', country: 'Géorgie' },
    'Amharique': { flagType: 'default', country: 'Éthiopie' },
    'Swahili': { flagType: 'default', country: 'Tanzanie' },
    'Hausa': { flagType: 'default', country: 'Nigeria' },
    'Yoruba': { flagType: 'default', country: 'Nigeria' },
    'Igbo': { flagType: 'default', country: 'Nigeria' },
    'Zulu': { flagType: 'default', country: 'Afrique du Sud' },
    'Afrikaans': { flagType: 'default', country: 'Afrique du Sud' },
    'Xhosa': { flagType: 'default', country: 'Afrique du Sud' },
    'Shona': { flagType: 'default', country: 'Zimbabwe' },
    'Sotho': { flagType: 'default', country: 'Lesotho' },
    'Somali': { flagType: 'default', country: 'Somalie' },
    'Tigrigna': { flagType: 'default', country: 'Érythrée' },
    'Malgache': { flagType: 'default', country: 'Madagascar' },
    'Maori': { flagType: 'default', country: 'Nouvelle-Zélande' },
    'Hawaïen': { flagType: 'usa', country: 'Hawaï' },
    'Inuktitut': { flagType: 'default', country: 'Canada' },
    'Quechua': { flagType: 'default', country: 'Pérou' },
    'Guarani': { flagType: 'default', country: 'Paraguay' },
    'Aymara': { flagType: 'default', country: 'Bolivie' },
    'Mapudungun': { flagType: 'default', country: 'Chili' },
    'Créole (divers, ex. Haïtien, Mauricien)': { flagType: 'default', country: 'Haïti' },
    'Papiamento': { flagType: 'default', country: 'Aruba' },
    'Samoan': { flagType: 'default', country: 'Samoa' },
    'Tongien': { flagType: 'default', country: 'Tonga' },
    'Fidjien': { flagType: 'default', country: 'Fidji' },
    'Marshallais': { flagType: 'default', country: 'Îles Marshall' },
    'Palauan': { flagType: 'default', country: 'Palaos' },
    'Chuukese': { flagType: 'default', country: 'Micronésie' },
    'Gilbertais': { flagType: 'default', country: 'Kiribati' },
    'Tuvaluan': { flagType: 'default', country: 'Tuvalu' },
    'Nauruan': { flagType: 'default', country: 'Nauru' },
    'Bislama': { flagType: 'default', country: 'Vanuatu' },
    'Tok Pisin': { flagType: 'default', country: 'Papouasie-Nouvelle-Guinée' },
    'Tetum': { flagType: 'default', country: 'Timor oriental' },
    'Maltais': { flagType: 'default', country: 'Malte' },
    'Irlandais (Gaélique)': { flagType: 'default', country: 'Irlande' },
    'Gallois': { flagType: 'uk', country: 'Pays de Galles' },
    'Écossais': { flagType: 'uk', country: 'Écosse' },
    'Basque': { flagType: 'spain', country: 'Pays basque' },
    'Catalan': { flagType: 'spain', country: 'Catalogne' },
    'Galicien': { flagType: 'spain', country: 'Galice' },
    'Luxembourgeois': { flagType: 'default', country: 'Luxembourg' },
    'Dhivehi': { flagType: 'default', country: 'Maldives' },
    'Dzongkha': { flagType: 'default', country: 'Bhoutan' },
    'Kinyarwanda': { flagType: 'default', country: 'Rwanda' }
};

export default function SelecLang() {
    const [searchText, setSearchText] = useState('');
    const [selectedRecentLanguage, setSelectedRecentLanguage] = useState('Français');

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
            case 'uk':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V18H0V0Z" fill="#012169" />
                            <Path d="M0 0L24 18M24 0L0 18" stroke="#FFFFFF" strokeWidth="2" />
                            <Path d="M0 0L24 18M24 0L0 18" stroke="#C8102E" strokeWidth="1" />
                            <Path d="M12 0V18M0 9H24" stroke="#FFFFFF" strokeWidth="2" />
                            <Path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="1" />
                        </Svg>
                    </View>
                );
            case 'portugal':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V18H0V0Z" fill="#046A38" />
                            <Path d="M0 0H12V18H0V0Z" fill="#DA020E" />
                            <Circle cx="6" cy="9" r="3" fill="#FFD900" />
                            <Path d="M6 6L6 12M4 9H8" stroke="#046A38" strokeWidth="0.5" strokeLinecap="round" />
                        </Svg>
                    </View>
                );
            case 'spain':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V6H0V0Z" fill="#C60B1E" />
                            <Path d="M0 6H24V12H0V6Z" fill="#FFC400" />
                            <Path d="M0 12H24V18H0V12Z" fill="#C60B1E" />
                        </Svg>
                    </View>
                );
            case 'germany':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V6H0V0Z" fill="#000000" />
                            <Path d="M0 6H24V12H0V6Z" fill="#DD0000" />
                            <Path d="M0 12H24V18H0V12Z" fill="#FFCE00" />
                        </Svg>
                    </View>
                );
            case 'italy':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H8V18H0V0Z" fill="#009246" />
                            <Path d="M8 0H16V18H8V0Z" fill="#FFFFFF" />
                            <Path d="M16 0H24V18H16V0Z" fill="#CE2B37" />
                        </Svg>
                    </View>
                );
            case 'usa':
                return (
                    <View style={styles.flagContainer}>
                        <Svg style={styles.flagSvg} width="24" height="18" viewBox="0 0 24 18" fill="none">
                            <Path d="M0 0H24V18H0V0Z" fill="#B22234" />
                            <Path d="M0 0H12V9.5H0V0Z" fill="#3C3B6E" />
                            <Path d="M0 1H12M0 3H12M0 5H12M0 7H12" stroke="#FFFFFF" strokeWidth="0.5" />
                            <Path d="M1 0H12M3 0H12M5 0H12M7 0H12M9 0H12M11 0H12" stroke="#FFFFFF" strokeWidth="0.5" />
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

    const [selectedLanguageFromList, setSelectedLanguageFromList] = useState('');
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(-1);
    const [recentLanguages, setRecentLanguages] = useState(['Français', 'Anglais', 'Portugais']);
    const [filteredLanguages, setFilteredLanguages] = useState([
        'Afrikaans', 'Albanais', 'Allemand', 'Amharique', 'Anglais', 'Arabe', 'Arménien', 'Azéri', 'Bengali', 'Biélorusse', 'Birman', 'Bislama', 'Bosnien', 'Bulgare', 'Catalan', 'Coréen', 'Créole (divers, ex. Haïtien, Mauricien)', 'Croate', 'Danois', 'Dhivehi', 'Dzongkha', 'Espagnol', 'Estonien', 'Fidjien', 'Filipino (Tagalog)', 'Finnois', 'Français', 'Gilbertais', 'Grec', 'Guarani', 'Hindi', 'Hongrois', 'Indonésien', 'Irlandais (Gaélique)', 'Islandais', 'Italien', 'Japonais', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Kirghiz', 'Lao', 'Letton', 'Lituanien', 'Luxembourgeois', 'Macédonien', 'Malais', 'Malgache', 'Maltais', 'Mandarin (Chinois)', 'Maori', 'Marshallais', 'Monténégrin', 'Nauruan', 'Néerlandais', 'Népalais', 'Norvégien', 'Ouzbek', 'Pachto', 'Palauan', 'Persan (Farsi)', 'Polonais', 'Portugais', 'Quechua', 'Roumain', 'Russe', 'Samoan', 'Serbe', 'Shona', 'Sinhala', 'Slovaque', 'Slovène', 'Somali', 'Sotho', 'Suédois', 'Swahili', 'Tadjik', 'Tamoul', 'Tchèque', 'Tetum', 'Thaï', 'Tigrigna', 'Tok Pisin', 'Tongien', 'Turc', 'Turkmène', 'Tuvaluan', 'Ukrainien', 'Urdu', 'Vietnamien'
    ]);

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredLanguages([
                'Afrikaans', 'Albanais', 'Allemand', 'Amharique', 'Anglais', 'Arabe', 'Arménien', 'Azéri', 'Bengali', 'Biélorusse', 'Birman', 'Bislama', 'Bosnien', 'Bulgare', 'Catalan', 'Coréen', 'Créole (divers, ex. Haïtien, Mauricien)', 'Croate', 'Danois', 'Dhivehi', 'Dzongkha', 'Espagnol', 'Estonien', 'Fidjien', 'Filipino (Tagalog)', 'Finnois', 'Français', 'Gilbertais', 'Grec', 'Guarani', 'Hindi', 'Hongrois', 'Indonésien', 'Irlandais (Gaélique)', 'Islandais', 'Italien', 'Japonais', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Kirghiz', 'Lao', 'Letton', 'Lituanien', 'Luxembourgeois', 'Macédonien', 'Malais', 'Malgache', 'Maltais', 'Mandarin (Chinois)', 'Maori', 'Marshallais', 'Monténégrin', 'Nauruan', 'Néerlandais', 'Népalais', 'Norvégien', 'Ouzbek', 'Pachto', 'Palauan', 'Persan (Farsi)', 'Polonais', 'Portugais', 'Quechua', 'Roumain', 'Russe', 'Samoan', 'Serbe', 'Shona', 'Sinhala', 'Slovaque', 'Slovène', 'Somali', 'Sotho', 'Suédois', 'Swahili', 'Tadjik', 'Tamoul', 'Tchèque', 'Tetum', 'Thaï', 'Tigrigna', 'Tok Pisin', 'Tongien', 'Turc', 'Turkmène', 'Tuvaluan', 'Ukrainien', 'Urdu', 'Vietnamien'
            ]);
        } else {
            const filtered = [
                'Afrikaans', 'Albanais', 'Allemand', 'Amharique', 'Anglais', 'Arabe', 'Arménien', 'Azéri', 'Bengali', 'Biélorusse', 'Birman', 'Bislama', 'Bosnien', 'Bulgare', 'Catalan', 'Coréen', 'Créole (divers, ex. Haïtien, Mauricien)', 'Croate', 'Danois', 'Dhivehi', 'Dzongkha', 'Espagnol', 'Estonien', 'Fidjien', 'Filipino (Tagalog)', 'Finnois', 'Français', 'Gilbertais', 'Grec', 'Guarani', 'Hindi', 'Hongrois', 'Indonésien', 'Irlandais (Gaélique)', 'Islandais', 'Italien', 'Japonais', 'Kazakh', 'Khmer', 'Kinyarwanda', 'Kirghiz', 'Lao', 'Letton', 'Lituanien', 'Luxembourgeois', 'Macédonien', 'Malais', 'Malgache', 'Maltais', 'Mandarin (Chinois)', 'Maori', 'Marshallais', 'Monténégrin', 'Nauruan', 'Néerlandais', 'Népalais', 'Norvégien', 'Ouzbek', 'Pachto', 'Palauan', 'Persan (Farsi)', 'Polonais', 'Portugais', 'Quechua', 'Roumain', 'Russe', 'Samoan', 'Serbe', 'Shona', 'Sinhala', 'Slovaque', 'Slovène', 'Somali', 'Sotho', 'Suédois', 'Swahili', 'Tadjik', 'Tamoul', 'Tchèque', 'Tetum', 'Thaï', 'Tigrigna', 'Tok Pisin', 'Tongien', 'Turc', 'Turkmène', 'Tuvaluan', 'Ukrainien', 'Urdu', 'Vietnamien'
            ].filter(language =>
                language.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredLanguages(filtered);
        }
    };

    const handleRecentLanguageSelect = (language: string) => {
        setSelectedRecentLanguage(language);

        // Simulation de la sauvegarde de la langue sélectionnée
        console.log(`Langue sélectionnée: ${language}`);
    };

    const handleLanguageSelect = (language: string, index: number) => {
        setSelectedLanguageFromList(language);
        setSelectedLanguageIndex(index);
        setSelectedRecentLanguage(language); // Sélectionner dans les boutons récents

        // Ajouter à la liste des langues récentes (max 3)
        setRecentLanguages(prev => {
            // Retirer la langue si elle existe déjà
            const filtered = prev.filter(lang => lang !== language);
            // Ajouter la langue en première position
            const updated = [language, ...filtered];
            // Garder seulement les 3 premières
            return updated.slice(0, 3);
        });

        // Simulation de la sauvegarde de la langue sélectionnée
        console.log(`Langue sélectionnée dans la liste: ${language}`);
    };

    const handleDeleteAll = () => {
        setRecentLanguages([]);
        setSelectedRecentLanguage('');

        // Simulation de la suppression des langues récentes
        console.log('Toutes les langues récentes ont été supprimées');
    };

    return (
        <View style={styles.backgroundContainer}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
                <View style={styles.selecLangContainer}>
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => router.back()}>
                            <Text style={styles.arrowIcon}>
                                {`←`}
                            </Text>
                        </Pressable>
                        <Text style={styles.targetLanguageTitle}>
                            {`Langue cible`}
                        </Text>
                        <Pressable onPress={handleDeleteAll}>
                            <Text style={styles.deleteAllButton}>
                                {`Tout supprimer`}
                            </Text>
                        </Pressable>
                    </View>
                    <Text style={styles.recentLanguagesLabel}>
                        {`Langue sélectionnée récente`}
                    </Text>
                    <View style={styles.recentLanguagesContainer}>
                        {recentLanguages.map((language, index) => {
                            const buttonStyles = [
                                index === 0 ? styles.rectangle747 :
                                    index === 1 ? styles.rectangle748 : styles.rectangle749
                            ];
                            const textStyles = [
                                index === 0 ? styles.portugueseButton :
                                    index === 1 ? styles.englishButton : styles.polishButton
                            ];

                            return (
                                <Pressable
                                    key={language}
                                    style={[
                                        ...buttonStyles,
                                        selectedRecentLanguage === language && styles.selectedButton
                                    ]}
                                    onPress={() => handleRecentLanguageSelect(language)}
                                >
                                    <Text style={[
                                        ...textStyles,
                                        selectedRecentLanguage === language && styles.selectedButtonText
                                    ]}>
                                        {language}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <View style={styles.rectangle744} />

                    <View style={styles.searchContainer}>
                        <View style={styles.rectangle55}>
                            <Text style={styles.searchIcon}>
                                {`🔍`}
                            </Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Chercher une langue cible..."
                                placeholderTextColor="rgba(87, 99, 108, 1)"
                                value={searchText}
                                onChangeText={handleSearch}
                            />
                        </View>
                    </View>

                    <View style={styles.languagesList}>
                        {filteredLanguages.map((language, index) => {
                            const languageInfo = languageData[language as keyof typeof languageData];
                            return (
                                <Pressable
                                    key={index}
                                    style={styles.languageItem}
                                    onPress={() => handleLanguageSelect(language, index)}
                                >
                                    <View style={[
                                        styles.radioButton,
                                        selectedLanguageIndex === index && styles.selectedRadioButton
                                    ]} />
                                    <View style={styles.languageInfoContainer}>
                                        <View style={styles.languageHeader}>
                                            {renderFlag(languageInfo?.flagType || 'default')}
                                            <Text style={styles.languageText}>{language}</Text>
                                        </View>
                                        {languageInfo?.country && (
                                            <Text style={styles.countryText}>{languageInfo.country}</Text>
                                        )}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>


                    <Text style={styles.scrollDownIcon}>
                        {`􀁣`}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        ...Platform.select({
            web: {
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }
        })
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        ...Platform.select({
            web: {
                width: 360,
                height: "100%",
                maxWidth: "100%",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                marginTop: 20,
                marginBottom: 20,
            }
        })
    },
    scrollContent: {
        flexGrow: 1
    },
    selecLangContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        paddingTop: 50,
        paddingHorizontal: 25,
        ...Platform.select({
            web: {
                paddingTop: 30,
                paddingHorizontal: 20,
            }
        })
    },
    rectangle744: {
        width: "100%",
        height: 1,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(213, 217, 235, 1)",
        marginTop: 5,
        marginBottom: 20
    },

    rectangle55: {
        width: "100%",
        height: 45,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 217, 235, 1)",
        borderRadius: 12,
        marginBottom: 10
    },
    searchIcon: {
        position: "absolute",
        left: 15,
        top: 12,
        fontSize: 16,
        color: "rgba(87, 99, 108, 1)"
    },
    searchInput: {
        flex: 1,
        paddingLeft: 50,
        paddingRight: 15,
        height: 45,
        fontSize: 16,
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Inter",
        backgroundColor: "transparent",
        borderWidth: 0
    },
    scrollDownIcon: {
        position: "absolute",
        flexShrink: 0,
        top: 1207,
        width: 24,
        height: 24,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "SF Pro Display",
        fontSize: 20,
        fontWeight: 400
    },
    languagesList: {
        marginTop: 5,
        marginBottom: 20,
        flexDirection: "column",
        gap: 28,
        ...Platform.select({
            web: {
                marginBottom: 15,
                gap: 20,
            }
        })
    },
    languageItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 8
    },
    languageInfoContainer: {
        flex: 1,
        flexDirection: "column"
    },
    languageHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    flagContainer: {
        width: 24,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        borderRadius: 2,
        overflow: 'hidden',
    },
    flagSvg: {
        width: 24,
        height: 18,
    },
    countryText: {
        fontSize: 12,
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Inter",
        marginTop: 2,
        marginLeft: 28
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D8EA",
        backgroundColor: "white"
    },
    languageText: {
        textAlign: "left",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 28
    },
    deleteAllButton: {
        fontSize: 14,
        fontWeight: "500",
        color: "rgba(122, 39, 26, 1)",
        fontFamily: "Inter",
        textAlign: "right"
    },
    recentLanguagesLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Outfit",
        marginBottom: 10
    },
    targetLanguageTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Inter",
        flex: 1,
        textAlign: "center"
    },
    arrowIcon: {
        fontSize: 28,
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "SF Pro Display",
        fontWeight: "900"
    },
    rectangle747: {
        width: 125,
        height: 39,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(20, 24, 27, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        ...Platform.select({
            web: {
                width: 100,
                marginRight: 8,
            }
        })
    },
    portugueseButton: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24
    },
    rectangle748: {
        width: 92,
        height: 39,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(20, 24, 27, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        ...Platform.select({
            web: {
                width: 80,
                marginRight: 8,
            }
        })
    },
    englishButton: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24
    },
    rectangle749: {
        width: 98,
        height: 39,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(20, 24, 27, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
            web: {
                width: 85,
            }
        })
    },
    polishButton: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24
    },
    selectedButton: {
        backgroundColor: "rgba(20, 24, 27, 1)",
    },
    selectedButtonText: {
        color: "rgba(255, 255, 255, 1)",
    },
    selectedRadioButton: {
        backgroundColor: "rgba(20, 24, 27, 1)",
        borderWidth: 2,
        borderColor: "rgba(20, 24, 27, 1)"
    },
    recentLanguagesContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 20,
        flexWrap: "wrap"
    },
    searchContainer: {
        marginBottom: 20,
        ...Platform.select({
            web: {
                marginBottom: 15,
            }
        })
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 0,
        ...Platform.select({
            web: {
                marginBottom: 15,
            }
        })
    }
});
