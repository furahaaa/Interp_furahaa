import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';

export default function CreateAccount() {
    const [selectedStatus, setSelectedStatus] = useState('Mon besoin');
    const [username, setUsername] = useState('');

    const statusOptions = [
        { id: 'Mon besoin', title: 'Mon besoin', subtitle: 'Pour moi, au quotidien', icon: '⭐' },
        { id: 'Travail', title: 'Travail', subtitle: 'Pour mes relations pros', icon: '💪' },
        { id: 'Voyageur', title: 'Voyageur', subtitle: 'Pour mes séjours temporaires', icon: '🗺️' },
        { id: 'Expartié', title: 'Expartié', subtitle: 'Pour ma nouvelle vie', icon: '💼' },
        { id: 'Migrant', title: 'Migrant', subtitle: 'Changement de pays', icon: '🎒' },
        { id: 'Apprentissage', title: 'Apprentissage', subtitle: 'Étudiants et chercheurs', icon: '📚' },
        { id: 'Administratives', title: 'Administratives', subtitle: 'Relations sociaux', icon: '📋' }
    ];

    const handleStatusSelect = (statusId: string) => {
        setSelectedStatus(statusId);
    };

    const handleSkip = () => {
        console.log('Navigation vers activation_notification (skip)');
        router.replace('/activation_notification');
    };

    const handleFinish = () => {
        console.log('Navigation vers activation_notification');
        router.replace('/activation_notification');
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Section "Ton profil..." */}
                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Ton profil...</Text>

                    <View style={styles.profileCard}>
                        <View style={styles.profileLeft}>
                            <View style={styles.profilePicture}>
                                <Text style={styles.cameraIcon}>📷</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.userName}>David</Text>
                                <Text style={styles.addPhotoText}>Ajoutez votre photo</Text>
                            </View>
                        </View>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Nouveau</Text>
                        </View>
                    </View>
                </View>

                {/* Section "Mon statut est plutôt..." */}
                <View style={styles.statusSection}>
                    <Text style={styles.sectionTitle}>Mon statut est plutôt...</Text>

                    {statusOptions.map((status) => (
                        <TouchableOpacity
                            key={status.id}
                            style={[
                                styles.statusOption,
                                selectedStatus === status.id && styles.statusOptionSelected
                            ]}
                            onPress={() => handleStatusSelect(status.id)}
                        >
                            <View style={styles.statusLeft}>
                                <Text style={styles.statusIcon}>{status.icon}</Text>
                                <View style={styles.statusText}>
                                    <Text style={styles.statusTitle}>{status.title}</Text>
                                    <Text style={styles.statusSubtitle}>{status.subtitle}</Text>
                                </View>
                            </View>

                            <View style={[
                                styles.radioButton,
                                selectedStatus === status.id && styles.radioButtonSelected
                            ]}>
                                {selectedStatus === status.id && (
                                    <View style={styles.radioButtonInner} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Section "Créer ton pseudo" */}
                <View style={styles.usernameSection}>
                    <Text style={styles.sectionTitle}>Créer ton pseudo</Text>

                    <View style={styles.usernameInput}>
                        <Text style={styles.atSymbol}>@</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="pseudo..."
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                </View>

                {/* Espace pour les boutons */}
                <View style={styles.buttonSpacer} />
            </ScrollView>

            {/* Boutons d'action (fixes en bas) */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Ignorer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                    <Text style={styles.finishButtonText}>Terminer</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                width: 360,
                height: "100%",
                alignSelf: "center",
                maxWidth: "100%",
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                flexDirection: "column",
                marginTop: 20,
                marginBottom: 20
            }
        })
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 120, // Espace pour les boutons
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                paddingBottom: 100
            }
        })
    },

    // Section titles
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 16,
        marginTop: 24,
    },

    // Profile section
    profileSection: {
        marginTop: 20,
    },

    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    profileLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },

    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },

    cameraIcon: {
        fontSize: 24,
    },

    profileInfo: {
        flex: 1,
    },

    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },

    addPhotoText: {
        fontSize: 14,
        color: '#6B7280',
    },

    badge: {
        backgroundColor: '#EFF6FF',
        borderWidth: 1,
        borderColor: '#3B82F6',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        marginTop: 8,
        marginLeft: 16,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1D4ED8',
    },

    // Status section
    statusSection: {
        marginTop: 32,
    },

    statusOption: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    statusOptionSelected: {
        borderColor: '#8B5CF6',
    },

    statusLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    statusIcon: {
        fontSize: 24,
        marginRight: 16,
    },

    statusText: {
        flex: 1,
    },

    statusTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },

    statusSubtitle: {
        fontSize: 14,
        color: '#6B7280',
    },

    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },

    radioButtonSelected: {
        borderColor: '#8B5CF6',
    },

    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#8B5CF6',
    },

    // Username section
    usernameSection: {
        marginTop: 32,
    },

    usernameInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    atSymbol: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6B7280',
        marginRight: 12,
    },

    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },

    // Button spacer
    buttonSpacer: {
        height: 20,
    },

    // Buttons
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        ...Platform.select({
            web: {
                position: "relative",
                marginTop: 20,
                paddingHorizontal: 15,
                paddingVertical: 20
            }
        })
    },

    skipButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        flex: 1,
        marginRight: 12,
        alignItems: 'center',
    },

    skipButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },

    finishButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 32,
        flex: 1,
        marginLeft: 12,
        alignItems: 'center',
    },

    finishButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
