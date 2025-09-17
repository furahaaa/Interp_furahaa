import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function CreationComptePro() {
    const [completedSteps, setCompletedSteps] = useState([true, true, true, false, false]); // 3 premières étapes complétées

    const handleBack = () => {
        router.back();
    };

    const handleValidate = () => {
        // Logique de validation
        router.push('/creation_comptePro3');
    };

    const handleStepPress = (index: number) => {
        if (index === 1) { // "Complétez vos informations"
            router.push('/creation_comptePro2');
        } else {
            toggleStep(index);
        }
    };

    const toggleStep = (index: number) => {
        const newCompletedSteps = [...completedSteps];
        newCompletedSteps[index] = !newCompletedSteps[index];
        setCompletedSteps(newCompletedSteps);
    };

    return (
        <View style={styles.container}>
            {/* Contenu principal avec scroll entier */}
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
            >
                {/* Header avec flèche */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M19 12H5M12 19l-7-7 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                    </TouchableOpacity>
                </View>

                {/* Logo INTERP Pro */}
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>INTERP</Text>
                        <View style={styles.proBadge}>
                            <Text style={styles.proBadgeText}>Pro</Text>
                        </View>
                    </View>
                </View>

                {/* Message de bienvenue */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Heureux de nous joindre,</Text>
                    <Text style={styles.userName}>David 👏</Text>
                    <Text style={styles.description}>
                        Voici la liste des choses que vous devez faire avant de pouvoir rendre des services aux autres.
                    </Text>
                </View>

                {/* Section étapes obligatoires */}
                <View style={styles.stepsSection}>
                    <Text style={styles.stepsTitle}>Étapes obligatoires</Text>

                    {/* Liste des étapes */}
                    <View style={styles.stepsList}>
                        {[
                            "Ajoutez votre photo de profil",
                            "Complétez vos informations",
                            "Indiquez vos compétences",
                            "Ajoutez le paiement sécurisé",
                            "Apprenez les règles sur Interp"
                        ].map((step, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.stepItem}
                                onPress={() => handleStepPress(index)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    completedSteps[index] ? styles.checkboxCompleted : styles.checkboxPending
                                ]}>
                                    {completedSteps[index] && (
                                        <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <Path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                    )}
                                </View>
                                <Text style={styles.stepText}>{step}</Text>
                                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <Path d="M6 12L10 8L6 4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </Svg>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Bouton Valider dans le scroll */}
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.validateButton}
                        onPress={handleValidate}
                    >
                        <Text style={styles.validateButtonText}>
                            Valider
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(249, 250, 251, 1)",
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    header: {
        paddingHorizontal: 0,
        paddingVertical: 20,
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    backButton: {
        padding: 8,
    },
    logoSection: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        color: "black",
        marginRight: 8,
    },
    proBadge: {
        backgroundColor: "rgba(59, 130, 246, 1)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    proBadgeText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        ...(Platform.OS === 'web' && {
            minHeight: 800,
        }),
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
    welcomeSection: {
        marginBottom: 30,
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "700",
        color: "black",
        marginBottom: 8,
    },
    userName: {
        fontSize: 28,
        fontWeight: "700",
        color: "black",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: "rgba(75, 85, 99, 1)",
        lineHeight: 24,
    },
    stepsSection: {
        marginBottom: 10,
    },
    stepsTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
        marginBottom: 20,
    },
    stepsList: {
        gap: 16,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxCompleted: {
        backgroundColor: "rgba(34, 197, 94, 1)",
    },
    checkboxPending: {
        backgroundColor: "rgba(209, 213, 219, 1)",
    },
    stepText: {
        flex: 1,
        fontSize: 16,
        color: "black",
        fontWeight: "500",
    },
    buttonSection: {
        marginTop: 20,
        marginBottom: 10,
    },
    validateButton: {
        backgroundColor: "rgba(139, 92, 246, 1)",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    validateButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});