import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function ActivationNotification() {
    console.log('🔄 ActivationNotification component loaded');
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        // Afficher le modal après un court délai pour éviter les problèmes de rendu
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleActivateNotifications = () => {
        console.log('Notifications activées');
        setShowModal(false);
    };

    const handleNotNow = () => {
        console.log('Notifications ignorées');
        setShowModal(false);
    };

    const handleNext = () => {
        console.log('Navigation vers DashboardInterp');
        router.replace('/dashboard_interp');
    };

    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Où habitez-vous ?
                </Text>
                <Text style={styles.subtitle}>
                    Sélectionnez votre langue
                </Text>
                <Text style={styles.description}>
                    Votre pays de résidence principale et le pays où vous avez l'habitude de vous faire parler.
                </Text>

                {/* Section Pays */}
                <View style={styles.countrySection}>
                    <View style={styles.countryOption}>
                        {renderFlag('france')}
                        <Text style={styles.countryText}>France</Text>
                        <View style={styles.radioButtonSelected}>
                            <View style={styles.radioButtonInner} />
                        </View>
                    </View>

                    <View style={styles.countryOption}>
                        {renderFlag('uk')}
                        <Text style={styles.countryText}>Royaume-Uni</Text>
                        <View style={styles.radioButton}>
                        </View>
                    </View>
                </View>

                {/* Bouton Suivant */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <View style={styles.nextButtonBase}>
                        <Text style={styles.nextButtonText}>
                            Suivant
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Modal de notification */}
                {showModal && (
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalBody}>
                                <View style={styles.bellContainer}>
                                    <ImageBackground
                                        style={styles.bellIcon}
                                        source={require('../assets/images/cloche.png')}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.modalText}>
                                    <Text style={styles.modalTitle}>
                                        Ne manquez pas les réponses
                                    </Text>
                                    <Text style={styles.modalDescription}>
                                        Activez vos notifications pour recevoir les messages et autres informations importantes pour vos actions futurs.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.modalActions}>
                                <TouchableOpacity style={styles.primaryButton} onPress={handleActivateNotifications}>
                                    <View style={styles.buttonBase}>
                                        <Text style={styles.buttonText}>
                                            Activer les notifications
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.secondaryButton} onPress={handleNotNow}>
                                    <View style={styles.secondaryButtonBase}>
                                        <Text style={styles.secondaryButtonText}>
                                            Pas maintenant
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        width: "100%",
        height: "100%",
        ...Platform.select({
            web: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        })
    },
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        minHeight: "100%",
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
                backgroundColor: "#FFFFFF"
            }
        })
    },
    title: {
        marginTop: 111,
        marginHorizontal: 35,
        height: 32,
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 24,
        fontWeight: "500",
        lineHeight: 32,
        ...Platform.select({
            web: {
                marginTop: 60,
                textAlign: "center"
            }
        })
    },
    subtitle: {
        marginTop: 50,
        marginHorizontal: 35,
        height: 32,
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 24,
        fontWeight: "500",
        lineHeight: 32,
        ...Platform.select({
            web: {
                textAlign: "center"
            }
        })
    },
    description: {
        marginTop: 20,
        marginHorizontal: 35,
        width: 315,
        height: 30,
        textAlign: "left",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Outfit",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: 0.14,
        lineHeight: 16.8,
        ...Platform.select({
            web: {
                textAlign: "center",
                width: "100%",
                maxWidth: 300
            }
        })
    },
    countrySection: {
        marginTop: 50,
        paddingHorizontal: 35,
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        alignSelf: "stretch",
        ...Platform.select({
            web: {
                paddingHorizontal: 20
            }
        })
    },
    countryOption: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 16
    },
    flagContainer: {
        width: 32,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        borderRadius: 2,
        overflow: 'hidden',
    },
    flagSvg: {
        width: 24,
        height: 18,
    },
    countryText: {
        textAlign: "left",
        color: "rgba(24, 29, 39, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 24,
        flex: 1
    },
    radioButtonSelected: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(89, 37, 220, 1)",
        backgroundColor: "rgba(89, 37, 220, 1)",
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 1)"
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(213, 215, 218, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)"
    },

    modal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(16, 24, 40, 0.7)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16
    },
    modalContent: {
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.03)",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 8,
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        borderRadius: 16,
        maxWidth: 320,
        width: "100%"
    },
    modalBody: {
        position: "relative",
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 16
    },
    bellContainer: {
        position: "relative",
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        marginBottom: 8
    },
    bellIcon: {
        width: 60,
        height: 60,
        alignSelf: "center"
    },
    modalText: {
        position: "relative",
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: 8
    },
    modalTitle: {
        position: "relative",
        alignSelf: "stretch",
        textAlign: "center",
        color: "rgba(24, 29, 39, 1)",
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 26,
        marginBottom: 2
    },
    modalDescription: {
        position: "relative",
        alignSelf: "stretch",
        textAlign: "center",
        color: "rgba(83, 88, 98, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 22,
        paddingHorizontal: 8
    },
    modalActions: {
        position: "relative",
        alignSelf: "stretch",
        flexDirection: "column",
        alignItems: "stretch"
    },
    primaryButton: {
        position: "relative",
        alignSelf: "stretch"
    },
    buttonBase: {
        position: "relative",
        flexGrow: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 12
    },
    buttonText: {
        position: "relative",
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
    secondaryButton: {
        position: "relative",
        alignSelf: "stretch"
    },
    secondaryButtonBase: {
        position: "relative",
        flexGrow: 1,
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8
    },
    secondaryButtonText: {
        position: "relative",
        textAlign: "center",
        color: "rgba(65, 70, 81, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
    nextButton: {
        position: "relative",
        alignSelf: "stretch",
        marginTop: 40,
        marginHorizontal: 35,
        ...Platform.select({
            web: {
                marginHorizontal: 20,
                marginBottom: 20
            }
        })
    },
    nextButtonBase: {
        position: "relative",
        flexGrow: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12
    },
    nextButtonText: {
        position: "relative",
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 24
    }
});
