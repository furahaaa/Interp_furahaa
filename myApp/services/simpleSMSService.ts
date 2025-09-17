// Service SMS Simple - Solution complète sans AWS/Firebase
// Simulation pour le développement + prêt pour production

interface SMSMessage {
    id: string;
    to: string;
    from: string;
    body: string;
    timestamp: Date;
    status: 'pending' | 'sent' | 'delivered' | 'failed';
    deliveryTime?: Date;
}

interface SMSResult {
    success: boolean;
    message: string;
    messageId?: string;
    error?: any;
    deliveryTime?: Date;
}

interface SMSServiceConfig {
    serviceName: 'simulation' | 'twilio' | 'messagebird' | 'vonage' | 'custom';
    fromNumber: string;
    deliveryDelay: number; // Délai en millisecondes
    successRate: number; // Taux de succès (0-1)
    enableLogging: boolean;
}

export class SimpleSMSService {
    private config: SMSServiceConfig;
    private messageHistory: SMSMessage[] = [];
    private messageCounter = 0;

    constructor() {
        // Configuration par défaut (simulation)
        this.config = {
            serviceName: 'simulation',
            fromNumber: '+33123456789',
            deliveryDelay: 2000, // 2 secondes
            successRate: 0.95, // 95% de succès
            enableLogging: true
        };
    }

    // Envoyer un SMS
    async sendSMS(toNumber: string, messageBody: string): Promise<SMSResult> {
        const messageId = this.generateMessageId();
        const timestamp = new Date();

        // Créer le message
        const smsMessage: SMSMessage = {
            id: messageId,
            to: toNumber,
            from: this.config.fromNumber,
            body: messageBody,
            timestamp: timestamp,
            status: 'pending'
        };

        this.log(`📱 Envoi SMS #${messageId}...`);
        this.log(`📞 De: ${this.config.fromNumber}`);
        this.log(`📞 À: ${toNumber}`);
        this.log(`💬 Message: ${messageBody}`);

        try {
            // Simuler l'envoi
            await this.simulateSending();

            // Déterminer le succès basé sur le taux configuré
            const isSuccess = Math.random() < this.config.successRate;

            if (isSuccess) {
                // Succès
                smsMessage.status = 'sent';
                smsMessage.deliveryTime = new Date();

                this.log(`✅ SMS #${messageId} envoyé avec succès !`);
                this.log(`⏱️ Temps de livraison: ${this.config.deliveryDelay}ms`);

                // Ajouter à l'historique
                this.messageHistory.push(smsMessage);

                return {
                    success: true,
                    message: `SMS envoyé avec succès via ${this.config.serviceName} !`,
                    messageId: messageId,
                    deliveryTime: smsMessage.deliveryTime
                };
            } else {
                // Échec simulé
                smsMessage.status = 'failed';
                this.log(`❌ SMS #${messageId} a échoué (simulation)`);

                return {
                    success: false,
                    message: `Échec simulé de l'envoi SMS (taux de succès: ${this.config.successRate * 100}%)`,
                    error: new Error('Simulated failure')
                };
            }

        } catch (error: any) {
            smsMessage.status = 'failed';
            this.log(`💥 Erreur lors de l'envoi SMS #${messageId}: ${error.message}`);

            return {
                success: false,
                message: `Erreur: ${error.message}`,
                error: error
            };
        }
    }

    // Envoyer un code de vérification
    async sendVerificationCode(phoneNumber: string, code: string): Promise<SMSResult> {
        const message = `Votre code de vérification Interp est: ${code}. Ne le partagez avec personne.`;
        return this.sendSMS(phoneNumber, message);
    }

    // Envoyer un SMS de bienvenue
    async sendWelcomeMessage(phoneNumber: string, userName: string): Promise<SMSResult> {
        const message = `Bienvenue ${userName} sur Interp ! Votre compte a été créé avec succès.`;
        return this.sendSMS(phoneNumber, message);
    }

    // Envoyer un SMS de notification
    async sendNotification(phoneNumber: string, title: string, content: string): Promise<SMSResult> {
        const message = `${title}: ${content}`;
        return this.sendSMS(phoneNumber, message);
    }

    // Envoyer un SMS de rappel
    async sendReminder(phoneNumber: string, reminderText: string, date?: string): Promise<SMSResult> {
        const dateStr = date ? ` le ${date}` : '';
        const message = `Rappel${dateStr}: ${reminderText}`;
        return this.sendSMS(phoneNumber, message);
    }

    // Simuler l'envoi avec délai
    private async simulateSending(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, this.config.deliveryDelay);
        });
    }

    // Générer un ID unique pour le message
    private generateMessageId(): string {
        this.messageCounter++;
        const timestamp = Date.now();
        return `SMS_${timestamp}_${this.messageCounter}`;
    }

    // Logger les messages
    private log(message: string): void {
        if (this.config.enableLogging) {
            console.log(`[SimpleSMS] ${message}`);
        }
    }

    // Obtenir l'historique des messages
    getMessageHistory(): SMSMessage[] {
        return [...this.messageHistory];
    }

    // Obtenir les statistiques
    getStats(): {
        total: number;
        sent: number;
        failed: number;
        successRate: number;
    } {
        const total = this.messageHistory.length;
        const sent = this.messageHistory.filter(m => m.status === 'sent').length;
        const failed = this.messageHistory.filter(m => m.status === 'failed').length;
        const successRate = total > 0 ? sent / total : 0;

        return { total, sent, failed, successRate };
    }

    // Effacer l'historique
    clearHistory(): void {
        this.messageHistory = [];
        this.messageCounter = 0;
        this.log('🗑️ Historique des messages effacé');
    }

    // Mettre à jour la configuration
    updateConfig(newConfig: Partial<SMSServiceConfig>): void {
        this.config = { ...this.config, ...newConfig };
        this.log(`⚙️ Configuration mise à jour: ${JSON.stringify(newConfig)}`);
    }

    // Connecter à un vrai service SMS (pour plus tard)
    connectToRealService(serviceName: 'twilio' | 'messagebird' | 'vonage' | 'custom', config: any): void {
        this.config.serviceName = serviceName;
        this.log(`🔗 Connecté au service: ${serviceName}`);
        this.log(`📋 Configuration: ${JSON.stringify(config)}`);

        // Ici vous pourriez initialiser la vraie connexion
        // this.realService = new RealService(config);
    }

    // Vérifier la configuration
    checkConfig(): boolean {
        return this.config.serviceName === 'simulation' ||
            Boolean(this.config.fromNumber && this.config.fromNumber !== '+33123456789');
    }

    // Obtenir la configuration actuelle
    getConfig(): SMSServiceConfig {
        return { ...this.config };
    }

    // Valider un numéro de téléphone
    validatePhoneNumber(phoneNumber: string): boolean {
        // Format international: +33XXXXXXXXX
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
    }

    // Formater un numéro de téléphone
    formatPhoneNumber(phoneNumber: string): string {
        // Supprimer tous les caractères non numériques sauf le +
        const cleaned = phoneNumber.replace(/[^\d+]/g, '');

        // Si pas de +, ajouter +33 (France par défaut)
        if (!cleaned.startsWith('+')) {
            return `+33${cleaned.replace(/^0/, '')}`;
        }

        return cleaned;
    }

    // Vérifier la longueur du message
    checkMessageLength(message: string): { isValid: boolean; length: number; maxLength: number } {
        const maxLength = 160; // Limite SMS standard
        const length = message.length;

        return {
            isValid: length <= maxLength,
            length: length,
            maxLength: maxLength
        };
    }

    // Obtenir le coût estimé (simulation)
    getEstimatedCost(phoneNumber: string, messageLength: number): number {
        // Simulation de coût basée sur la destination
        const baseCost = 0.05; // 5 centimes par SMS

        if (phoneNumber.startsWith('+33')) {
            return baseCost; // France
        } else if (phoneNumber.startsWith('+1')) {
            return baseCost * 2; // Amérique du Nord
        } else {
            return baseCost * 1.5; // International
        }
    }

    // Obtenir les statistiques détaillées
    getDetailedStats(): {
        total: number;
        sent: number;
        failed: number;
        successRate: number;
        averageDeliveryTime: number;
        costEstimate: number;
        byService: Record<string, number>;
    } {
        const basicStats = this.getStats();
        const messages = this.getMessageHistory();

        // Calculer le temps de livraison moyen
        const deliveredMessages = messages.filter(m => m.deliveryTime);
        const averageDeliveryTime = deliveredMessages.length > 0
            ? deliveredMessages.reduce((sum, m) => {
                const deliveryTime = m.deliveryTime!.getTime() - m.timestamp.getTime();
                return sum + deliveryTime;
            }, 0) / deliveredMessages.length
            : 0;

        // Calculer le coût estimé total
        const costEstimate = messages.reduce((sum, m) => {
            return sum + this.getEstimatedCost(m.to, m.body.length);
        }, 0);

        // Statistiques par service
        const byService: Record<string, number> = {};
        messages.forEach(m => {
            const service = m.status;
            byService[service] = (byService[service] || 0) + 1;
        });

        return {
            ...basicStats,
            averageDeliveryTime,
            costEstimate,
            byService
        };
    }
}

// Instance singleton
export const simpleSMSService = new SimpleSMSService();
