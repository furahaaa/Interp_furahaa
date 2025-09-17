import React from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';

interface LocationActivationModalProps {
    onActivateLocation?: () => void;
    onSkip?: () => void;
}

export default function LocationActivationModal({ onActivateLocation, onSkip }: LocationActivationModalProps) {
    const handleActivateLocation = async () => {
        try {
            // Demande de permission (iOS/Android) via expo-location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission refusée',
                    'La localisation n\'a pas été activée. Vous pourrez l\'activer plus tard dans les paramètres.',
                    [
                        {
                            text: 'Continuer',
                            onPress: () => {
                                onActivateLocation?.();
                                router.push('/lieu');
                            },
                        },
                    ]
                );
                return;
            }

            // Récupère la position actuelle
            const position = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = position.coords;

            // Inverse geocoding pour récupérer ville/pays
            const places = await Location.reverseGeocodeAsync({ latitude, longitude });
            const first = places && places.length > 0 ? places[0] : undefined;
            const city = first?.city || first?.district || '';
            const country = first?.country || '';

            onActivateLocation?.();
            router.push({ pathname: '/lieu', params: { city, country } });
        } catch (err) {
            console.warn('Erreur lors de la demande de permission:', err);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de l\'activation de la localisation.',
                [
                    {
                        text: 'Continuer',
                        onPress: () => {
                            onActivateLocation?.();
                            router.push('/lieu');
                        },
                    },
                ]
            );
        }
    };

    const handleSkip = () => {
        onSkip?.();
        router.push('/lieu');
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <View style={styles.content}>
                    <ImageBackground
                        style={styles.image}
                        source={require('../assets/images/localisation.png')}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Activer la localisation
                        </Text>
                        <Text style={styles.description}>
                            Autoriser Interp à utiliser votre localisation pour rendre l'expérience possible.
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleActivateLocation}>
                        <Text style={styles.primaryButtonText}>
                            Activer
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} onPress={handleSkip}>
                        <Text style={styles.secondaryButtonText}>
                            Plus tard
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(16, 24, 40, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 20,
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
    modal: {
        width: "100%",
        maxWidth: 390,
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.03)",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowRadius: 8,
        elevation: 5,
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
        borderRadius: 12
    },
    content: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 24
    },
    image: {
        width: "100%",
        height: 200,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        marginBottom: 16
    },
    textContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        textAlign: "center",
        color: "rgba(24, 29, 39, 1)",
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 30,
        marginBottom: 8
    },
    description: {
        textAlign: "center",
        color: "rgba(83, 88, 98, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "column",
        gap: 12
    },
    primaryButton: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(89, 37, 220, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        elevation: 2,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "rgba(127, 86, 217, 1)",
        borderRadius: 8
    },
    primaryButtonText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    },
    secondaryButton: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        elevation: 2,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8
    },
    secondaryButtonText: {
        textAlign: "center",
        color: "rgba(65, 70, 81, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    }
});