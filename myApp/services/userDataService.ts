import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Only import AWS Amplify if not in Expo Go
let uploadData: any, getUrl: any, remove: any, list: any;

if (!Constants.appOwnership || Constants.appOwnership === 'expo') {
    // Expo Go - use mock functions
    console.log('Using mock storage for Expo Go');
} else {
    // Development build or production - import AWS Amplify
    try {
        const storage = require('aws-amplify/storage');
        uploadData = storage.uploadData;
        getUrl = storage.getUrl;
        remove = storage.remove;
        list = storage.list;
    } catch (error) {
        console.warn('AWS Amplify storage not available:', error);
    }
}

export interface UserData {
    prenom: string;
    nom: string;
    userId: string;
    createdAt: string;
}

export class UserDataService {
    private static readonly FOLDER_NAME = 'user-data';

    // Sauvegarder les données utilisateur dans S3
    static async saveUserData(userData: Omit<UserData, 'createdAt'>): Promise<void> {
        // If in Expo Go or AWS not available, just log and return
        if (!Constants.appOwnership || Constants.appOwnership === 'expo' || !uploadData) {
            console.log('Expo Go: Mock save user data successful');
            return;
        }

        try {
            const dataToSave: UserData = {
                ...userData,
                createdAt: new Date().toISOString()
            };

            const key = `${this.FOLDER_NAME}/${userData.userId}.json`;

            await uploadData({
                key,
                data: JSON.stringify(dataToSave),
                options: {
                    contentType: 'application/json'
                }
            });

            console.log('Données utilisateur sauvegardées avec succès');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
            throw error;
        }
    }

    // Récupérer les données utilisateur depuis S3
    static async getUserData(userId: string): Promise<UserData | null> {
        // If in Expo Go or AWS not available, return mock data
        if (!Constants.appOwnership || Constants.appOwnership === 'expo' || !getUrl) {
            console.log('Expo Go: Returning mock user data');
            return {
                prenom: 'Expo',
                nom: 'Go User',
                userId: userId,
                createdAt: new Date().toISOString()
            };
        }

        try {
            const key = `${this.FOLDER_NAME}/${userId}.json`;

            const url = await getUrl({ key });
            const response = await fetch(url.url);
            const result = await response.text();

            if (result) {
                const userData: UserData = JSON.parse(result);
                return userData;
            }

            return null;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return null;
        }
    }

    // Mettre à jour les données utilisateur
    static async updateUserData(userId: string, updates: Partial<UserData>): Promise<void> {
        // If in Expo Go or AWS not available, just log and return
        if (!Constants.appOwnership || Constants.appOwnership === 'expo' || !uploadData) {
            console.log('Expo Go: Mock update user data successful');
            return;
        }

        try {
            const existingData = await this.getUserData(userId);

            if (!existingData) {
                throw new Error('Données utilisateur non trouvées');
            }

            const updatedData: UserData = {
                ...existingData,
                ...updates
            };

            await this.saveUserData(updatedData);
            console.log('Données utilisateur mises à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données:', error);
            throw error;
        }
    }

    // Supprimer les données utilisateur
    static async deleteUserData(userId: string): Promise<void> {
        // If in Expo Go or AWS not available, just log and return
        if (!Constants.appOwnership || Constants.appOwnership === 'expo' || !remove) {
            console.log('Expo Go: Mock delete user data successful');
            return;
        }

        try {
            const key = `${this.FOLDER_NAME}/${userId}.json`;

            await remove({ key });

            console.log('Données utilisateur supprimées avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
            throw error;
        }
    }

    // Lister tous les utilisateurs (pour l'administration)
    static async listAllUsers(): Promise<string[]> {
        // If in Expo Go or AWS not available, return mock data
        if (!Constants.appOwnership || Constants.appOwnership === 'expo' || !list) {
            console.log('Expo Go: Returning mock user list');
            return ['expo-go-user-1', 'expo-go-user-2'];
        }

        try {
            const result = await list({ prefix: `${this.FOLDER_NAME}/` });

            return result.items.map((item: { key?: string }) => item.key?.replace(`${this.FOLDER_NAME}/`, '').replace('.json', '') || '');
        } catch (error) {
            console.error('Erreur lors de la liste des utilisateurs:', error);
            return [];
        }
    }
}
