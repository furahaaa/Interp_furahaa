import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function Welcome() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header avec titre INTERP et sous-titres */}
            <View style={styles.header}>
                <Text style={styles.mainTitle}>INTERP</Text>
                <Text style={styles.subtitle}>Facilitez vos échanges</Text>
                <Text style={styles.subtitle2}>sans barrière de langue orale ou signée</Text>
            </View>

            {/* Contenu principal */}
            <View style={styles.mainContent}>
                <Text style={styles.headline}>
                    Communiquer et comprendre en ligne aujourd'hui
                </Text>

                {/* Liste des avantages avec checkmarks */}
                <View style={styles.benefitsList}>
                    <View style={styles.benefitItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.benefitText}>Sans barrière des langues</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.benefitText}>Avec ou sans rendez-vous</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.benefitText}>Garantie de confidentialité</Text>
                    </View>
                    <View style={styles.benefitItem}>
                        <Text style={styles.checkmark}>✓</Text>
                        <Text style={styles.benefitText}>Tarif clair et transparent*</Text>
                    </View>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    Lorsque le parcouru l'interprétation ou traduction est respecté par le demandeur, des services non remboursables peuvent s'appliquer en fonction des services choisis
                </Text>
            </View>

            {/* Bouton Continuer */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => router.push('/inscription_tel')}
            >
                <Text style={styles.buttonText}>Continuer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
        ...Platform.select({
            web: {
                maxWidth: 375,
                marginHorizontal: 'auto',
                height: 800,
                maxHeight: 800,
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: {
                    display: 'none',
                },
            }
        })
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    webScrollContent: {
        ...Platform.select({
            web: {
                flexGrow: 1,
                paddingBottom: 40,
            }
        })
    },
    header: {
        alignItems: 'center',
        paddingTop: Platform.select({
            ios: 120,
            android: 100,
            web: 40
        }),
        paddingBottom: 10,
        backgroundColor: 'transparent',
        marginBottom: 80, // Ajouter de l'espace entre le header et le contenu principal
    },
    mainTitle: {
        fontSize: Platform.select({
            ios: 44,
            android: 60, // Beaucoup plus gros sur Android
            web: 44
        }),
        fontWeight: Platform.select({
            ios: '900',
            android: '900',
            web: '900'
        }),
        color: '#14181B',
        fontFamily: Platform.select({
            ios: 'Poppins',
            android: 'sans-serif-black',
            web: 'Arial'
        }),
        marginBottom: 0,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Platform.select({
            ios: 20,
            android: 19,
            web: 18
        }),
        fontWeight: Platform.OS === 'android' ? '500' : '600', // Plus léger sur Android
        color: '#14181B',
        fontFamily: 'Readex-Pro',
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle2: {
        fontSize: Platform.select({
            ios: 15,
            android: 14,
            web: 14
        }),
        fontWeight: Platform.OS === 'android' ? '300' : '400', // Plus léger sur Android
        color: '#14181B',
        fontFamily: 'Readex-Pro',
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: Platform.select({
            ios: 45,
            android: 45,
            web: 35
        }),
        paddingTop: Platform.select({
            ios: 5,
            android: 5,
            web: 10
        }),
        paddingBottom: Platform.select({
            ios: 15,
            android: 15,
            web: 10
        }),
        ...Platform.select({
            web: {
                justifyContent: 'center'
            }
        })
    },
    headline: {
        fontSize: Platform.select({
            ios: 30,
            android: 28,
            web: 26
        }),
        fontWeight: Platform.OS === 'android' ? '700' : '800', // Plus léger sur Android
        color: '#212121',
        fontFamily: 'Outfit',
        lineHeight: Platform.select({
            ios: 41,
            android: 38,
            web: 35
        }),
        marginBottom: Platform.select({
            ios: 25,
            android: 25,
            web: 20
        }),
        textAlign: 'left',
    },
    benefitsList: {
        marginBottom: 20,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    checkmark: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4B39EF',
        marginRight: 12,
        width: 20,
        textAlign: 'center',
    },
    benefitText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#14181B',
        fontFamily: 'Outfit',
        lineHeight: 25.6,
        flex: 1,
    },
    disclaimer: {
        fontSize: 12,
        fontWeight: '400',
        color: '#666666',
        fontFamily: 'SF Pro Display',
        lineHeight: 18,
        textAlign: 'left',
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    continueButton: {
        backgroundColor: '#5925DC',
        borderRadius: 8,
        paddingHorizontal: Platform.select({
            ios: 20,
            android: 20,
            web: 18
        }),
        paddingVertical: Platform.select({
            ios: 16,
            android: 16,
            web: 14
        }),
        marginHorizontal: Platform.select({
            ios: 37,
            android: 37,
            web: 30
        }),
        marginBottom: Platform.select({
            ios: 40,
            android: 40,
            web: 30
        }),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(10, 13, 18, 0.05)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        elevation: Platform.OS === 'android' ? 2 : 0,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: Platform.select({
            ios: 16,
            android: 16,
            web: 15
        }),
        fontWeight: '600',
        fontFamily: 'Inter',
        lineHeight: Platform.select({
            ios: 24,
            android: 24,
            web: 22
        }),
    },

});