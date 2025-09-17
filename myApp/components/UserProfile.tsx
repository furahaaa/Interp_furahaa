import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { UserDataService, UserData } from '../services/userDataService';

interface UserProfileProps {
    userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Charger les données utilisateur au montage du composant
    useEffect(() => {
        loadUserData();
    }, [userId]);

    const loadUserData = async () => {
        setIsLoading(true);
        try {
            const data = await UserDataService.getUserData(userId);
            setUserData(data);
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de charger les données utilisateur');
            console.error('Erreur de chargement:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUser = async () => {
        if (!userData) return;

        try {
            await UserDataService.updateUserData(userId, {
                prenom: userData.prenom + ' (modifié)',
                nom: userData.nom + ' (modifié)'
            });

            Alert.alert('Succès', 'Données mises à jour!');
            loadUserData(); // Recharger les données
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de mettre à jour les données');
        }
    };

    const handleDeleteUser = async () => {
        Alert.alert(
            'Confirmation',
            'Êtes-vous sûr de vouloir supprimer ces données ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await UserDataService.deleteUserData(userId);
                            setUserData(null);
                            Alert.alert('Succès', 'Données supprimées!');
                        } catch (error) {
                            Alert.alert('Erreur', 'Impossible de supprimer les données');
                        }
                    }
                }
            ]
        );
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>Aucune donnée trouvée</Text>
                <TouchableOpacity style={styles.button} onPress={loadUserData}>
                    <Text style={styles.buttonText}>Recharger</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil Utilisateur</Text>

            <View style={styles.dataContainer}>
                <Text style={styles.label}>Prénom:</Text>
                <Text style={styles.value}>{userData.prenom}</Text>
            </View>

            <View style={styles.dataContainer}>
                <Text style={styles.label}>Nom:</Text>
                <Text style={styles.value}>{userData.nom}</Text>
            </View>

            <View style={styles.dataContainer}>
                <Text style={styles.label}>ID Utilisateur:</Text>
                <Text style={styles.value}>{userData.userId}</Text>
            </View>

            <View style={styles.dataContainer}>
                <Text style={styles.label}>Créé le:</Text>
                <Text style={styles.value}>{new Date(userData.createdAt).toLocaleDateString()}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUser}>
                    <Text style={styles.buttonText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
                    <Text style={styles.buttonText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    dataContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    updateButton: {
        backgroundColor: '#34C759',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    },
});
