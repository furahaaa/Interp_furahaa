import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

export default function CréationducomptePro() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard_interp');
        }, 3000); // 3 secondes

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.créationducompteProContainer}>
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.iNTERP}>INTERP</Text>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    <Image
                        style={styles.highfivecelebrationwithcheckandconfetti}
                        source={require('../assets/images/bravo.png')}
                        resizeMode="contain"
                    />

                    <Text style={styles.mercipourvotredemande}>
                        Merci pour votre demande
                    </Text>

                    <Text style={styles.messageText}>
                        Nous avons bien reçu votre demande d'inscription à notre liste d'attente. D'ici quelques jours, vous recevrez un nouveau message vous précisant le statut de votre demande 😉
                        {'\n\n'}A très bientôt
                        {'\n\n'}
                        <Text style={styles.teamSignature}>L'équipe Interp.</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>)
}

const styles = StyleSheet.create({
    créationducompteProContainer: {
        flex: 1,
        backgroundColor: "rgba(105, 56, 239, 1)",
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    iNTERP: {
        fontSize: 44,
        fontWeight: "900",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Poppins",
        textAlign: "center",
        flex: 1,
    },
    _myVar: {
        fontSize: 20,
        fontWeight: "400",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "SF Pro Display",
    },
    mainContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    myVar: {
        fontSize: 16,
        fontWeight: "400",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "SF Pro Display",
        marginBottom: 20,
    },
    highfivecelebrationwithcheckandconfetti: {
        width: 195,
        height: 165,
        marginBottom: 50,
    },
    mercipourvotredemande: {
        fontSize: 22,
        fontWeight: "500",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        textAlign: "center",
        marginBottom: 40,
    },
    messageText: {
        fontSize: 17,
        fontWeight: "400",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        textAlign: "left",
        letterSpacing: 0.17,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    teamSignature: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.17,
        lineHeight: 22,
    }
});