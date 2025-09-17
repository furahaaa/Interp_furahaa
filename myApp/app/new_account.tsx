import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = screenWidth > 500;

export default function NewAccount() {
    const [selectedOption, setSelectedOption] = useState('interpreter');

    const handleContinue = () => {
        if (selectedOption) {
            router.push('/inscription_mail');
        } else {
            Alert.alert('Sélection requise', 'Veuillez sélectionner une option avant de continuer.');
        }
    };

    return (
        <View style={styles.container}>
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
                    <View style={styles.headerProgressContainer}>
                        <View style={styles.headerProgressBar}>
                            <View style={styles.headerProgressFill} />
                        </View>
                        <View style={styles.headerProgressCheck}>
                            <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>

            {/* Titre principal */}
            <Text style={styles.title}>
                {`On commence 🤝`}
            </Text>

            {/* Image décorative */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/interprete_logo.png')}
                    style={styles.decorativeImage}
                    resizeMode="contain"
                />
            </View>

            {/* Première option - Rechercher un interprète */}
            <TouchableOpacity
                style={[
                    styles.optionContainer,
                    selectedOption === 'interpreter' && styles.optionSelected
                ]}
                onPress={() => setSelectedOption('interpreter')}
            >
                <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>
                        {`Je recherche un interprète`}
                    </Text>
                    <Text style={styles.optionDescription}>
                        {`Réservez facilement un interprète ou un relais en langue des signes ou en langue parlée, selon vos besoins.`}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Deuxième option - Créer un compte professionnel */}
            <TouchableOpacity
                style={[
                    styles.optionContainer,
                    selectedOption === 'professional' && styles.optionSelected
                ]}
                onPress={() => setSelectedOption('professional')}
            >
                <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>
                        {`Créer mon compte professionnel pour proposer mes services`}
                    </Text>
                    <Text style={styles.optionDescription}>
                        {`Devenez interprète, relais communautaire ou assistant. Rejoignez la plateforme et recevez des demandes en direct.`}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Bouton Passer */}
            <TouchableOpacity
                style={[
                    styles.button,
                    !selectedOption && styles.buttonDisabled
                ]}
                onPress={handleContinue}
                disabled={!selectedOption}
            >
                <Text style={[
                    styles.buttonText,
                    !selectedOption && styles.buttonTextDisabled
                ]}>
                    {`Passer`}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 15,
        ...(isWeb && {
            width: 390,
            height: 800,
            alignSelf: "center",
            maxWidth: "100%",
            border: "1px solid #ddd",
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            paddingBottom: 120
        })
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        ...(isWeb && {
            width: "100%",
            maxWidth: 350,
            paddingTop: 35,
            paddingBottom: 20
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
    headerProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 20,
    },
    headerProgressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#D5D9EB",
        borderRadius: 4,
        marginRight: 15,
    },
    headerProgressFill: {
        width: '40%',
        height: 8,
        backgroundColor: "#32D583",
        borderRadius: 4,
    },
    headerProgressCheck: {
        width: 20,
        height: 20,
        backgroundColor: "#32D583",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#212121",
        textAlign: "center",
        marginBottom: 5,
        fontFamily: "Outfit",
        ...(isWeb && {
            marginBottom: 10,
            marginTop: -5
        })
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "transparent",
        ...(isWeb && {
            marginBottom: 20,
            paddingTop: 0,
            paddingBottom: 10,
            marginTop: -5
        })
    },
    optionSelected: {
        borderColor: "#000000",
        backgroundColor: "#F8F9FA"
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#D5D7DA",
        marginRight: 15,
        marginTop: 5
    },
    radioCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#32D583",
        margin: 2
    },
    optionContent: {
        flex: 1
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#212121",
        marginBottom: 8,
        fontFamily: "Outfit"
    },
    optionDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: "#717680",
        lineHeight: 24,
        fontFamily: "Inter"
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 20
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#D5D9EB",
        borderRadius: 4,
        marginRight: 15
    },
    progressFill: {
        width: 46,
        height: 8,
        backgroundColor: "#32D583",
        borderRadius: 4
    },
    progressCheck: {
        width: 20,
        height: 20,
        backgroundColor: "#32D583",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#5925DC",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginHorizontal: 15,
        ...(isWeb && {
            width: "100%",
            maxWidth: 350,
            marginHorizontal: 0,
            position: "absolute",
            bottom: -10,
            left: 20,
            right: 20
        })
    },
    buttonDisabled: {
        backgroundColor: "#D5D9EB",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Inter"
    },
    buttonTextDisabled: {
        color: "#717680",
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        ...(isWeb && {
            marginTop: -5,
            marginBottom: 0
        })
    },
    decorativeImage: {
        width: 280,
        height: 200,
        opacity: 0.9,
        alignSelf: 'center'
    }
});
