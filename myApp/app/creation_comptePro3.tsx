import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

export default function CréationducomptePro() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('interprete');

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
    };

    const handleConfirm = () => {
        router.push('/creation_comptePro4');
    };

    return (
        <View style={styles.créationducompteProContainer}>
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>
            </View>

            {/* Title below the back button */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Avec Intrep, vous êtes plutôt...
                </Text>
            </View>

            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
            >
                {/* Option 1: Interprete */}
                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        selectedOption === 'interprete' && styles.selectedCard
                    ]}
                    onPress={() => handleOptionSelect('interprete')}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.emojiIcon}>⭐️</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>Interprete</Text>
                            <Text style={styles.optionDescription}>Parlant la langue locale</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.checkbox,
                        selectedOption === 'interprete' && styles.selectedCheckbox
                    ]}>
                        {selectedOption === 'interprete' && (
                            <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        )}
                    </View>
                </TouchableOpacity>
                {/* Option 2: Traduction */}
                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        selectedOption === 'traduction' && styles.selectedCard
                    ]}
                    onPress={() => handleOptionSelect('traduction')}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.emojiIcon}>🏛️</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>Traduction</Text>
                            <Text style={styles.optionDescription}>Séjour temporaire</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.checkbox,
                        selectedOption === 'traduction' && styles.selectedCheckbox
                    ]}>
                        {selectedOption === 'traduction' && (
                            <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        )}
                    </View>
                </TouchableOpacity>
                {/* Option 3: Assistant */}
                <TouchableOpacity
                    style={[
                        styles.optionCard,
                        selectedOption === 'assistant' && styles.selectedCard
                    ]}
                    onPress={() => handleOptionSelect('assistant')}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.emojiIcon}>🧳️</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.optionTitle}>Assistant</Text>
                            <Text style={styles.optionDescription}>Raisons temporaires</Text>
                        </View>
                    </View>
                    <View style={[
                        styles.checkbox,
                        selectedOption === 'assistant' && styles.selectedCheckbox
                    ]}>
                        {selectedOption === 'assistant' && (
                            <Svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                                <Path d="M10.6673 1.5L4.25065 7.91667L1.33398 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        )}
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Ignorer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
                    <Text style={styles.primaryButtonText}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    créationducompteProContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "500",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        textAlign: "center",
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
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
    optionCard: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(189, 180, 254, 1)",
        marginBottom: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectedCard: {
        backgroundColor: "rgba(244, 243, 255, 1)",
        borderColor: "rgba(189, 180, 254, 1)",
    },
    cardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    emojiIcon: {
        fontSize: 24,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "rgba(74, 31, 184, 1)",
        fontFamily: "Inter",
        marginBottom: 2,
    },
    optionDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: "rgba(105, 56, 239, 1)",
        fontFamily: "Inter",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(189, 180, 254, 1)",
        justifyContent: "center",
        alignItems: "center",
    },
    selectedCheckbox: {
        backgroundColor: "rgba(105, 56, 239, 1)",
        borderColor: "rgba(127, 86, 217, 1)",
    },
    buttonContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 90,
        gap: 12,
        backgroundColor: "rgba(255, 255, 255, 1)",
    },
    primaryButton: {
        flex: 1,
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButtonText: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Inter",
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
    },
    secondaryButtonText: {
        color: "rgba(65, 70, 81, 1)",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "Inter",
    }
});