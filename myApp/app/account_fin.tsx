import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function AccountFinal() {
    // Redirection automatique après 3 secondes
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/create_account' as any);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleContinuer = () => {
        router.push('/create_account' as any);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.profileCreationText}>
                {`Passons ensemble à créer ton profil.`}
            </Text>
            <Text style={styles.almostThereText}>
                {`On y est presque !`}
            </Text>
            <ImageBackground
                style={styles.celebrationImage}
                source={require('../assets/images/bravo.png')}
            />
            <Text style={styles.appTitle}>
                {`INTERP`}
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContinuer}>
                    <Text style={styles.buttonText}>
                        {`Continuer`}
                    </Text>
                </TouchableOpacity>
            </View>

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
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(89, 37, 220, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...Platform.select({
            web: {
                width: 360,
                height: "100%",
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
                paddingBottom: 100
            }
        })
    },
    profileCreationText: {
        position: "absolute",
        flexShrink: 0,
        top: 490,
        left: 0,
        right: 0,
        height: 22,
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 22,
        ...Platform.select({
            web: {
                top: 400,
                left: 0,
                right: 0
            }
        })
    },
    almostThereText: {
        position: "absolute",
        top: 450,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 28,
        ...Platform.select({
            web: {
                top: 360,
                left: 0,
                right: 0
            }
        })
    },
    celebrationImage: {
        position: "absolute",
        top: 250,
        left: '50%',
        width: 195,
        height: 165,
        transform: [{ translateX: -97.5 }],
        ...Platform.select({
            web: {
                top: 200,
                width: 160,
                height: 135,
                transform: [{ translateX: -80 }]
            }
        })
    },
    appTitle: {
        position: "absolute",
        flexShrink: 0,
        top: 150,
        left: 0,
        right: 0,
        height: 48,
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Poppins",
        fontSize: 44,
        fontWeight: "900",
        ...Platform.select({
            web: {
                top: 120,
                fontSize: 36
            }
        })
    },
    buttonContainer: {
        position: "absolute",
        flexShrink: 0,
        bottom: 80,
        left: 37,
        right: 37,
        display: "flex",
        alignItems: "center",
        columnGap: 0,
        borderRadius: 8,
        ...Platform.select({
            web: {
                bottom: 60,
                left: 20,
                right: 20,
                width: "100%",
                maxWidth: 320
            }
        })
    },
    button: {
        position: "relative",
        width: '100%',
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 8,
        minHeight: 56
    },
    buttonText: {
        position: "relative",
        flexShrink: 0,
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
    progressContainer: {
        position: "absolute",
        flexShrink: 0,
        top: 61,
        left: 99,
        width: 207,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            web: {
                top: 40,
                left: "50%",
                transform: [{ translateX: -160 }],
                width: 320,
                justifyContent: "center"
            }
        })
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: "#D5D9EB",
        borderRadius: 4,
        marginRight: 15,
    },
    progressFill: {
        width: '100%',
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
    }
});