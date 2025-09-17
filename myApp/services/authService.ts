import { Platform } from 'react-native';

export interface PhoneVerificationResult {
    success: boolean;
    message: string;
    verificationId?: string;
}

export interface SMSVerificationResult {
    success: boolean;
    message: string;
}

class AuthService {
    /**
     * Service d'authentification simplifié (sans Firebase)
     * Utilise le service SMS local pour la vérification
     */

    /**
     * Envoie un SMS de validation (simulation)
     */
    async sendPhoneVerification(phoneNumber: string): Promise<PhoneVerificationResult> {
        try {
            // Formatage du numéro de téléphone
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

            console.log('📱 Envoi SMS simulé pour:', formattedPhone);

            // Simulation d'envoi SMS (remplacé par votre service SMS)
            const verificationId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            console.log('✅ SMS simulé envoyé avec succès');

            return {
                success: true,
                message: 'Code SMS simulé envoyé avec succès',
                verificationId: verificationId,
            };
        } catch (error: any) {
            console.error('❌ Erreur lors de l\'envoi SMS simulé:', error);

            return {
                success: false,
                message: 'Erreur lors de l\'envoi du SMS. Réessayez.',
            };
        }
    }

    /**
     * Vérifie le code SMS reçu (simulation)
     */
    async verifySMSCode(verificationId: string, code: string): Promise<SMSVerificationResult> {
        try {
            console.log('🔐 Vérification code simulé:', code);

            // Simulation de vérification (remplacé par votre logique)
            if (code.length === 6 && /^\d{6}$/.test(code)) {
                console.log('✅ Code simulé vérifié avec succès');

                return {
                    success: true,
                    message: 'Numéro de téléphone vérifié avec succès (simulation)',
                };
            } else {
                return {
                    success: false,
                    message: 'Code incorrect. Vérifiez et réessayez.',
                };
            }
        } catch (error: any) {
            console.error('❌ Erreur lors de la vérification simulée:', error);

            return {
                success: false,
                message: 'Erreur lors de la vérification. Réessayez.',
            };
        }
    }

    /**
     * Renvoie un nouveau code SMS (simulation)
     */
    async resendSMSCode(phoneNumber: string): Promise<PhoneVerificationResult> {
        try {
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

            console.log('🔄 Renvoi SMS simulé pour:', formattedPhone);

            // Renvoyer un nouveau SMS simulé
            return await this.sendPhoneVerification(formattedPhone);

        } catch (error: any) {
            console.error('❌ Erreur lors du renvoi SMS simulé:', error);

            return {
                success: false,
                message: 'Erreur lors du renvoi. Réessayez plus tard.',
            };
        }
    }

    /**
     * Vérifie si un numéro de téléphone est valide
     */
    isValidPhoneNumber(phoneNumber: string): boolean {
        // Supprime tous les caractères non numériques sauf le +
        const cleaned = phoneNumber.replace(/[^\d+]/g, '');

        // Vérifie le format international
        const phoneRegex = /^\+[1-9]\d{1,14}$/;

        return phoneRegex.test(cleaned);
    }

    /**
     * Formate un numéro de téléphone pour l'affichage
     */
    formatPhoneNumber(phoneNumber: string): string {
        const cleaned = phoneNumber.replace(/[^\d+]/g, '');

        if (cleaned.startsWith('+33')) {
            // Format français
            return cleaned.replace(/^\+33/, '0').replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
        } else if (cleaned.startsWith('+1')) {
            // Format US/Canada
            return cleaned.replace(/^\+1/, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }

        return cleaned;
    }

    /**
     * Déconnecte l'utilisateur (simulation)
     */
    async signOut(): Promise<void> {
        try {
            console.log('✅ Utilisateur déconnecté (simulation)');
        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion simulée:', error);
        }
    }

    /**
     * Récupère l'utilisateur actuel (simulation)
     */
    getCurrentUser() {
        console.log('👤 Récupération utilisateur simulée');
        return null; // Pas d'utilisateur Firebase
    }

    /**
     * Écoute les changements d'état d'authentification (simulation)
     */
    onAuthStateChanged(callback: (user: any) => void) {
        console.log('🔍 Écoute d\'état d\'authentification simulée');
        // Pas de callback Firebase
        return () => { }; // Fonction de nettoyage vide
    }
}

export default new AuthService();
