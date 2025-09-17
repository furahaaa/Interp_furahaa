// Service SMS de Test - Version sans limitation pour les tests
// Permet l'envoi immédiat de codes sans délai d'attente

interface TestVerificationCode {
    code: string;
    phoneNumber: string;
    timestamp: Date;
    expiresAt: Date;
    attempts: number;
    maxAttempts: number;
    isVerified: boolean;
}

interface TestVerificationResult {
    success: boolean;
    message: string;
    code?: string;
    expiresAt?: Date;
    attemptsLeft?: number;
}

export class SMSTestService {
    private verificationCodes: Map<string, TestVerificationCode> = new Map();
    private messageHistory: any[] = [];

    constructor() {
        console.log('🚀 Service SMS de Test initialisé - Version sans limitation');
    }

    // Générer un code de vérification
    private generateCode(): string {
        const min = 100000; // 6 chiffres
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min).toString();
    }

    // Envoyer un code de vérification (sans limitation de temps)
    async sendVerificationCode(phoneNumber: string): Promise<TestVerificationResult> {
        try {
            console.log(`📱 [TEST] Envoi code de vérification pour: ${phoneNumber}`);

            // Toujours générer un nouveau code (pas de vérification de délai)
            const code = this.generateCode();
            const now = new Date();
            const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

            // Créer l'objet de vérification
            const verificationCode: TestVerificationCode = {
                code,
                phoneNumber,
                timestamp: now,
                expiresAt,
                attempts: 0,
                maxAttempts: 5, // Plus de tentatives pour les tests
                isVerified: false
            };

            // Sauvegarder le code (remplace l'ancien s'il existe)
            this.verificationCodes.set(phoneNumber, verificationCode);

            // Ajouter à l'historique
            this.messageHistory.push({
                phoneNumber,
                code,
                timestamp: now,
                status: 'sent'
            });

            console.log(`✅ [TEST] Code ${code} envoyé avec succès à ${phoneNumber}`);
            console.log(`⏰ [TEST] Expire à: ${expiresAt.toLocaleTimeString()}`);

            return {
                success: true,
                message: `Code de vérification envoyé avec succès ! (TEST)`,
                code: code,
                expiresAt: expiresAt
            };

        } catch (error: any) {
            console.error(`💥 [TEST] Erreur lors de l'envoi du code: ${error.message}`);

            return {
                success: false,
                message: `Erreur de test: ${error.message}`
            };
        }
    }

    // Vérifier un code
    async verifyCode(phoneNumber: string, inputCode: string): Promise<TestVerificationResult> {
        try {
            console.log(`🔍 [TEST] Vérification du code pour: ${phoneNumber}`);

            // Récupérer le code de vérification
            const verificationCode = this.verificationCodes.get(phoneNumber);

            if (!verificationCode) {
                return {
                    success: false,
                    message: 'Aucun code de vérification trouvé. Veuillez en demander un nouveau.'
                };
            }

            // Vérifier l'expiration
            if (verificationCode.expiresAt <= new Date()) {
                this.verificationCodes.delete(phoneNumber);
                return {
                    success: false,
                    message: 'Le code de vérification a expiré. Veuillez en demander un nouveau.'
                };
            }

            // Vérifier le nombre de tentatives
            if (verificationCode.attempts >= verificationCode.maxAttempts) {
                this.verificationCodes.delete(phoneNumber);
                return {
                    success: false,
                    message: 'Nombre maximum de tentatives atteint. Veuillez en demander un nouveau code.'
                };
            }

            // Incrémenter le nombre de tentatives
            verificationCode.attempts++;

            // Vérifier le code
            if (verificationCode.code === inputCode) {
                // Succès !
                verificationCode.isVerified = true;
                this.verificationCodes.delete(phoneNumber); // Nettoyer après succès

                console.log(`✅ [TEST] Code vérifié avec succès pour ${phoneNumber}`);

                return {
                    success: true,
                    message: 'Code vérifié avec succès ! 🎉',
                    attemptsLeft: 0
                };
            } else {
                // Code incorrect
                const attemptsLeft = verificationCode.maxAttempts - verificationCode.attempts;

                console.log(`❌ [TEST] Code incorrect pour ${phoneNumber}. Tentatives restantes: ${attemptsLeft}`);

                return {
                    success: false,
                    message: `Code incorrect. Tentatives restantes: ${attemptsLeft}`,
                    attemptsLeft: attemptsLeft
                };
            }

        } catch (error: any) {
            console.error(`💥 [TEST] Erreur lors de la vérification: ${error.message}`);

            return {
                success: false,
                message: `Erreur de vérification: ${error.message}`
            };
        }
    }

    // Renvoyer un code (sans limitation)
    async resendCode(phoneNumber: string): Promise<TestVerificationResult> {
        console.log(`🔄 [TEST] Renvoi de code pour: ${phoneNumber}`);
        return this.sendVerificationCode(phoneNumber);
    }

    // Obtenir le statut de vérification
    getVerificationStatus(phoneNumber: string): TestVerificationResult | null {
        const verificationCode = this.verificationCodes.get(phoneNumber);

        if (!verificationCode) {
            return null;
        }

        return {
            success: true,
            message: 'Code disponible',
            code: verificationCode.code,
            expiresAt: verificationCode.expiresAt,
            attemptsLeft: verificationCode.maxAttempts - verificationCode.attempts
        };
    }

    // Nettoyer les codes expirés
    cleanupExpiredCodes(): void {
        const now = new Date();
        for (const [phoneNumber, code] of this.verificationCodes.entries()) {
            if (code.expiresAt <= now) {
                this.verificationCodes.delete(phoneNumber);
                console.log(`🧹 [TEST] Code expiré supprimé pour: ${phoneNumber}`);
            }
        }
    }

    // Obtenir les statistiques
    getStats(): { totalCodes: number; activeCodes: number; totalMessages: number } {
        return {
            totalCodes: this.verificationCodes.size,
            activeCodes: this.verificationCodes.size,
            totalMessages: this.messageHistory.length
        };
    }

    // Obtenir l'historique des messages
    getMessageHistory(): any[] {
        return [...this.messageHistory];
    }
}

// Instance unique du service de test
export const smsTestService = new SMSTestService();
