import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';

export default function LieuPage() {
    const params = useLocalSearchParams<{ city?: string; country?: string }>();
    const [selectedLocation, setSelectedLocation] = useState(params.country || '');
    const [inputValue, setInputValue] = useState(params.city || '');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
    const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
    };

    const handleCountryChange = (text: string) => {
        setSelectedLocation(text);

        // Générer des suggestions de pays basées sur le texte saisi
        if (text.trim().length > 0) {
            const filteredCountrySuggestions = generateCountrySuggestions(text);
            setCountrySuggestions(filteredCountrySuggestions);
            setShowCountrySuggestions(true);
        } else {
            setShowCountrySuggestions(false);
            setCountrySuggestions([]);
        }
    };

    const handleClearCountry = () => {
        setSelectedLocation('');
        setShowCountrySuggestions(false);
        setCountrySuggestions([]);
    };

    const handleSelectCountrySuggestion = (country: string) => {
        setSelectedLocation(country);
        setShowCountrySuggestions(false);
        setCountrySuggestions([]);
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);

        // Générer des suggestions basées sur le texte saisi
        if (text.trim().length > 0) {
            const filteredSuggestions = generateCitySuggestions(text);
            setSuggestions(filteredSuggestions);
            // Afficher les suggestions seulement s'il y a des correspondances
            setShowSuggestions(filteredSuggestions.length > 0);
        } else {
            setShowSuggestions(false);
            setSuggestions([]);
        }
    };

    const handleInputBlur = () => {
        // Cacher les suggestions quand l'utilisateur quitte le champ
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleClearInput = () => {
        setInputValue('');
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleSelectSuggestion = (city: string) => {
        console.log('Ville sélectionnée:', city);
        setInputValue(city);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const generateCitySuggestions = (input: string): string[] => {
        // Liste de villes françaises pour les suggestions
        const frenchCities = [
            'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier',
            'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Étienne', 'Toulon', 'Angers', 'Grenoble',
            'Dijon', 'Nîmes', 'Saint-Denis', 'Villeurbanne', 'Le Havre', 'Sète', 'Mulhouse', 'Saint-Denis',
            'Aix-en-Provence', 'Brest', 'Nîmes', 'Tours', 'Limoges', 'Amiens', 'Perpignan', 'Metz',
            'Besançon', 'Boulogne-Billancourt', 'Orléans', 'Rouen', 'Argenteuil', 'Montreuil', 'Saint-Paul',
            'Roubaix', 'Saint-Denis', 'Avignon', 'Tourcoing', 'Créteil', 'Versailles', 'Saint-Maur-des-Fossés',
            'Pau', 'Poitiers', 'Nanterre', 'Vitry-sur-Seine', 'Créteil', 'Dunkerque', 'Asnières-sur-Seine'
        ];

        const filtered = frenchCities.filter(city =>
            city.toLowerCase().includes(input.toLowerCase())
        );

        return filtered.slice(0, 8); // Limiter à 8 suggestions
    };

    const generateCountrySuggestions = (input: string): string[] => {
        // Liste de pays pour les suggestions
        const countries = [
            'France', 'Suisse', 'Belgique', 'Luxembourg', 'Canada', 'Maroc', 'Algérie', 'Tunisie',
            'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Niger', 'Tchad', 'Cameroun', 'Gabon',
            'République du Congo', 'République démocratique du Congo', 'Rwanda', 'Burundi', 'Tanzanie',
            'Kenya', 'Ouganda', 'Éthiopie', 'Somalie', 'Djibouti', 'Érythrée', 'Soudan', 'Soudan du Sud',
            'Égypte', 'Libye', 'Tchad', 'Niger', 'Mali', 'Burkina Faso', 'Sénégal', 'Gambie',
            'Guinée-Bissau', 'Guinée', 'Sierra Leone', 'Libéria', 'Côte d\'Ivoire', 'Ghana', 'Togo',
            'Bénin', 'Nigeria', 'Cameroun', 'Guinée équatoriale', 'São Tomé-et-Principe', 'Gabon'
        ];

        const filtered = countries.filter(country =>
            country.toLowerCase().includes(input.toLowerCase())
        );

        return filtered.slice(0, 8); // Limiter à 8 suggestions
    };

    const handleContinue = () => {
        if (inputValue.trim()) {
            console.log('Lieu sélectionné:', inputValue);
            router.push('/langue_source');
        }
    };

    const handleBack = () => {
        router.back();
    };

    // plus de bouton de détection: la localisation vient de la page précédente

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
                    {/* Titre */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>C'est bien là où tu habites ?</Text>
                    </View>

                    {/* Sélection de pays */}
                    <View style={styles.countrySelection}>
                        <View style={styles.countryItem}>
                            <View style={styles.countryContent}>
                                <View style={styles.countryIcon}>
                                    <Svg style={styles.icon} width="18" height="20" viewBox="0 0 18 20" fill="none">
                                        <Path d="M16.5 8.3335C16.5 14.1668 9 19.1668 9 19.1668C9 19.1668 1.5 14.1668 1.5 8.3335C1.5 6.34437 2.29018 4.43672 3.6967 3.03019C5.10322 1.62367 7.01088 0.833496 9 0.833496C10.9891 0.833496 12.8968 1.62367 14.3033 3.03019C15.7098 4.43672 16.5 6.34437 16.5 8.3335Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        <Path d="M9 10.8335C10.3807 10.8335 11.5 9.71421 11.5 8.3335C11.5 6.95278 10.3807 5.8335 9 5.8335C7.61929 5.8335 6.5 6.95278 6.5 8.3335C6.5 9.71421 7.61929 10.8335 9 10.8335Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </Svg>
                                </View>
                                <TextInput
                                    style={styles.countryTextInput}
                                    placeholder="Sélectionner le pays..."
                                    value={selectedLocation}
                                    onChangeText={handleCountryChange}
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                />
                                {selectedLocation.length > 0 && (
                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={handleClearCountry}
                                    >
                                        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <Path d="M12 4L4 12M4 4L12 12" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Suggestions de pays */}
                        {showCountrySuggestions && countrySuggestions.length > 0 && (
                            <View style={styles.suggestionsContainer}>
                                <ScrollView style={styles.suggestionsList} showsVerticalScrollIndicator={false}>
                                    {countrySuggestions.map((country, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.suggestionItem}
                                            onPress={() => handleSelectCountrySuggestion(country)}
                                        >
                                            <Text style={styles.suggestionText}>{country}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {/* Champ de saisie de ville */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                            <View style={styles.inputContent}>
                                <View style={styles.locationIcon}>
                                    <Svg style={styles.icon} width="18" height="20" viewBox="0 0 18 20" fill="none">
                                        <Path d="M16.5 8.3335C16.5 14.1668 9 19.1668 9 19.1668C9 19.1668 1.5 14.1668 1.5 8.3335C1.5 6.34437 2.29018 4.43672 3.6967 3.03019C5.10322 1.62367 7.01088 0.833496 9 0.833496C10.9891 0.833496 12.8968 1.62367 14.3033 3.03019C15.7098 4.43672 16.5 6.34437 16.5 8.3335Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        <Path d="M9 10.8335C10.3807 10.8335 11.5 9.71421 11.5 8.3335C11.5 6.95278 10.3807 5.8335 9 5.8335C7.61929 5.8335 6.5 6.95278 6.5 8.3335C6.5 9.71421 7.61929 10.8335 9 10.8335Z" stroke="#717680" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </Svg>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Préciser la ville..."
                                    value={inputValue}
                                    onChangeText={handleInputChange}
                                    onBlur={handleInputBlur}
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                />
                                {inputValue.length > 0 && (
                                    <TouchableOpacity
                                        style={styles.clearButton}
                                        onPress={handleClearInput}
                                    >
                                        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <Path d="M12 4L4 12M4 4L12 12" stroke="#717680" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Suggestions de villes */}
                        {showSuggestions && suggestions.length > 0 && (
                            <View style={styles.suggestionsContainer}>
                                <ScrollView style={styles.suggestionsList} showsVerticalScrollIndicator={false}>
                                    {suggestions.map((city, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.suggestionItem}
                                            onPress={() => handleSelectSuggestion(city)}
                                        >
                                            <Text style={styles.suggestionText}>{city}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Bouton en dehors de la zone blanche */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        !inputValue.trim() && styles.buttonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!inputValue.trim()}
                >
                    <Text style={styles.buttonText}>
                        Continuer
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Espace pour combler le bas */}
            <View style={styles.bottomSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 15,
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
        width: '80%',
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
        ...Platform.select({
            web: {
                width: 390,
            }
        })
    },
    contentWrapper: {
        paddingHorizontal: 35,
        paddingTop: 20,
        paddingBottom: 40,
        flex: 1,
    },
    titleContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit-Medium",
        fontWeight: "500",
        lineHeight: 44,
    },
    countrySelection: {
        marginBottom: 15,
    },
    countryItem: {
        width: "100%",
        backgroundColor: "rgba(244, 243, 255, 1)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 8
    },
    countryContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    countryIcon: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    countryTextInput: {
        flex: 1,
        color: "rgba(74, 31, 184, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
        padding: 0,
        margin: 0,
        includeFontPadding: false,
        textAlignVertical: Platform.OS === 'android' ? 'center' : 'auto',
    },
    // Styles de checkbox supprimés car non utilisés
    inputContainer: {
        marginBottom: 15,
    },
    inputField: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 16,
        minHeight: 56,
    },
    inputContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    locationIcon: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: 18,
        height: 20
    },
    textInput: {
        flex: 1,
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
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        left: 35,
        right: 35,
        zIndex: 10,
    },
    button: {
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderWidth: 1,
        borderColor: "rgba(127, 86, 217, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    buttonDisabled: {
        backgroundColor: "rgba(89, 37, 220, 0.6)",
        opacity: 0.7,
    },
    buttonText: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    },
    bottomSpacer: {
        backgroundColor: "#FFFFFF",
        height: 40,
        ...(Platform.OS === 'android' && {
            height: 40,
        }),
    },
    clearButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(213, 215, 218, 1)',
        borderRadius: 8,
        marginTop: 8,
        maxHeight: 200,
    },
    suggestionsList: {
        paddingVertical: 8,
    },
    suggestionItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(240, 240, 240, 1)',
        backgroundColor: 'white',
        minHeight: 44,
        justifyContent: 'center',
    },
    suggestionText: {
        fontSize: 16,
        color: 'rgba(33, 33, 33, 1)',
        fontFamily: 'Inter',
        fontWeight: '400',
    },
});