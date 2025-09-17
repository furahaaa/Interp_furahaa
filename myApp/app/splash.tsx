import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Svg, Path, Mask, G } from 'react-native-svg';
import { router } from 'expo-router';

export default function Splash() {
    useEffect(() => {
        // Rediriger vers la page welcome après 1 seconde
        const timer = setTimeout(() => {
            router.push('/welcome');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.splashContainer}>
            <Text style={styles.iNTERP}>
                {`INTERP`}
            </Text>
            <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.versionBeta53}>
                {`Version Beta 5.3`}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
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
                justifyContent: "center",
                padding: 20
            }
        })
    },
    logo: {
        width: 250,
        height: 280,
        marginVertical: 30,
        ...Platform.select({
            web: {
                width: 200,
                height: 220,
                marginVertical: 20
            }
        })
    },
    versionBeta53: {
        textAlign: "center",
        color: "#57636C",
        fontFamily: "Readex Pro",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 20
    },
    iNTERP: {
        textAlign: "center",
        color: "#000000",
        fontFamily: "Poppins",
        fontSize: 60,
        fontWeight: "900",
        marginBottom: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 6,
        letterSpacing: 2,
        ...Platform.select({
            web: {
                fontSize: 48,
                marginBottom: 30
            }
        })
    }
});