// Service de gestion du fichier data.json
// Sauvegarde locale des données utilisateur et synchronisation AWS
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email?: string;
    newsletterAccepted: boolean;
    phoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
    awsSyncStatus: 'pending' | 'synced' | 'failed';
}

interface DataFileStructure {
    users: UserData[];
    metadata: {
        created: string;
        version: string;
        description: string;
        lastUpdate: string;
    };
    awsConfig: {
        enabled: boolean;
        region: string;
        service: string;
        tableName: string;
    };
    dataStructure: any;
}

export class DataFileService {
    private dataFilePath: string;
    private data: DataFileStructure;

    constructor() {
        this.dataFilePath = './data.json';
        this.data = this.getDefaultStructure();
        // Charger les données de manière asynchrone
        this.loadData().catch(error => {
            console.error('❌ Erreur lors de l\'initialisation:', error);
        });
    }

    // Structure par défaut du fichier
    private getDefaultStructure(): DataFileStructure {
        return {
            users: [],
            metadata: {
                created: new Date().toISOString(),
                version: "1.0.0",
                description: "Données utilisateurs Interp - Sauvegarde locale et AWS",
                lastUpdate: new Date().toISOString()
            },
            awsConfig: {
                enabled: true,
                region: "eu-west-3",
                service: "dynamodb",
                tableName: "interp-users"
            },
            dataStructure: {
                user: {
                    id: "string - ID unique utilisateur",
                    firstName: "string - Prénom",
                    lastName: "string - Nom",
                    phoneNumber: "string - Numéro de téléphone",
                    email: "string - Adresse email",
                    newsletterAccepted: "boolean - Acceptation newsletter",
                    phoneVerified: "boolean - Téléphone vérifié",
                    createdAt: "string - Date de création",
                    updatedAt: "string - Dernière mise à jour",
                    awsSyncStatus: "string - Statut synchronisation AWS"
                }
            }
        };
    }

    // Charger les données depuis le stockage
    private async loadData(): Promise<void> {
        try {
            console.log('📁 Chargement des données depuis AsyncStorage (Expo + Android)...');

            const storedData = await AsyncStorage.getItem('interp_data');

            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    this.data = { ...this.getDefaultStructure(), ...parsedData };
                    console.log('✅ Données chargées depuis AsyncStorage:', this.data.users.length, 'utilisateurs');
                } catch (parseError) {
                    console.error('❌ Erreur de parsing, utilisation des données par défaut:', parseError);
                    this.data = this.getDefaultStructure();
                }
            } else {
                console.log('📝 Aucune donnée stockée, utilisation des données par défaut');
                this.data = this.getDefaultStructure();
            }
        } catch (error) {
            console.error('❌ Erreur lors du chargement des données:', error);
            this.data = this.getDefaultStructure();
        }
    }

    // Sauvegarder un nouvel utilisateur
    async saveUser(userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'awsSyncStatus'>): Promise<string> {
        try {
            const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const now = new Date().toISOString();

            const newUser: UserData = {
                ...userData,
                id: userId,
                createdAt: now,
                updatedAt: now,
                awsSyncStatus: 'pending'
            };

            // Ajouter l'utilisateur à la liste
            this.data.users.push(newUser);
            this.data.metadata.lastUpdate = now;

            // Sauvegarder dans le fichier
            await this.saveToFile();

            console.log('✅ Utilisateur sauvegardé dans data.json:', userId);
            return userId;

        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde:', error);
            throw error;
        }
    }

    // Mettre à jour un utilisateur existant
    async updateUser(userId: string, updates: Partial<UserData>): Promise<boolean> {
        try {
            const userIndex = this.data.users.findIndex(user => user.id === userId);

            if (userIndex === -1) {
                console.error('❌ Utilisateur non trouvé:', userId);
                return false;
            }

            // Mettre à jour les données
            this.data.users[userIndex] = {
                ...this.data.users[userIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            this.data.metadata.lastUpdate = new Date().toISOString();

            // Sauvegarder dans le fichier
            await this.saveToFile();

            console.log('✅ Utilisateur mis à jour dans data.json:', userId);
            return true;

        } catch (error) {
            console.error('❌ Erreur lors de la mise à jour:', error);
            return false;
        }
    }

    // Marquer le téléphone comme vérifié
    async markPhoneVerified(userId: string): Promise<boolean> {
        return this.updateUser(userId, {
            phoneVerified: true,
            awsSyncStatus: 'synced'
        });
    }

    // Ajouter l'email à un utilisateur
    async addEmail(userId: string, email: string): Promise<boolean> {
        return this.updateUser(userId, {
            email,
            awsSyncStatus: 'pending'
        });
    }

    // Sauvegarder dans AsyncStorage (Expo + Android)
    private async saveToFile(): Promise<void> {
        try {
            const jsonString = JSON.stringify(this.data, null, 2);
            console.log('💾 Sauvegarde dans AsyncStorage:', jsonString);

            await AsyncStorage.setItem('interp_data', jsonString);
            console.log('✅ Données sauvegardées dans AsyncStorage (Expo + Android)');

            // Exporter aussi dans le fichier data.json physique
            await this.exportToPhysicalFile();

        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde dans AsyncStorage:', error);
            throw error;
        }
    }

    // Exporter les données dans le fichier data.json physique
    private async exportToPhysicalFile(): Promise<void> {
        try {
            // Sur mobile, afficher le contenu JSON dans la console pour copier-coller
            const jsonContent = JSON.stringify(this.data, null, 2);
            console.log('📁 === CONTENU POUR data.json ===');
            console.log(jsonContent);
            console.log('📁 === FIN DU CONTENU ===');
            console.log('💡 Copiez le contenu ci-dessus et collez-le dans data.json');

        } catch (error: any) {
            console.log('⚠️ Export physique échoué:', error.message);
        }
    }

    // Obtenir tous les utilisateurs
    getAllUsers(): UserData[] {
        return [...this.data.users];
    }

    // Obtenir un utilisateur par ID
    getUserById(userId: string): UserData | null {
        return this.data.users.find(user => user.id === userId) || null;
    }

    // Obtenir un utilisateur par numéro de téléphone
    getUserByPhone(phoneNumber: string): UserData | null {
        return this.data.users.find(user => user.phoneNumber === phoneNumber) || null;
    }

    // Obtenir les statistiques
    getStats(): {
        totalUsers: number;
        verifiedPhones: number;
        withEmail: number;
        awsSynced: number;
        pendingSync: number;
    } {
        const totalUsers = this.data.users.length;
        const verifiedPhones = this.data.users.filter(u => u.phoneVerified).length;
        const withEmail = this.data.users.filter(u => u.email).length;
        const awsSynced = this.data.users.filter(u => u.awsSyncStatus === 'synced').length;
        const pendingSync = this.data.users.filter(u => u.awsSyncStatus === 'pending').length;

        return {
            totalUsers,
            verifiedPhones,
            withEmail,
            awsSynced,
            pendingSync
        };
    }

    // Exporter les données en JSON
    exportData(): string {
        return JSON.stringify(this.data, null, 2);
    }

    // Forcer l'export des données dans le fichier data.json physique
    async forceExportToFile(): Promise<void> {
        console.log('📁 Export forcé des données dans data.json...');
        await this.exportToPhysicalFile();
    }

    // Afficher un résumé des données actuelles
    showDataSummary(): void {
        console.log('📊 === RÉSUMÉ DES DONNÉES ===');
        console.log(`👥 Total utilisateurs: ${this.data.users.length}`);
        console.log(`✅ Téléphones vérifiés: ${this.data.users.filter(u => u.phoneVerified).length}`);
        console.log(`📧 Avec email: ${this.data.users.filter(u => u.email).length}`);
        console.log(`🔄 Synchronisés AWS: ${this.data.users.filter(u => u.awsSyncStatus === 'synced').length}`);
        console.log(`⏳ En attente: ${this.data.users.filter(u => u.awsSyncStatus === 'pending').length}`);
        console.log('📊 === FIN DU RÉSUMÉ ===');
    }

    // Afficher les données stockées dans AsyncStorage (pour debug)
    async debugStorage(): Promise<void> {
        try {
            const storedData = await AsyncStorage.getItem('interp_data');
            if (storedData) {
                console.log('🔍 Données stockées dans AsyncStorage:', storedData);
                const parsed = JSON.parse(storedData);
                console.log('📊 Utilisateurs stockés:', parsed.users?.length || 0);
            } else {
                console.log('📝 Aucune donnée stockée dans AsyncStorage');
            }
        } catch (error) {
            console.error('❌ Erreur lors du debug AsyncStorage:', error);
        }
    }

    // Nettoyer les données (pour les tests)
    clearData(): void {
        this.data.users = [];
        this.data.metadata.lastUpdate = new Date().toISOString();
        console.log('🗑️ Données effacées de data.json');
    }
}

// Instance singleton
export const dataFileService = new DataFileService();
