import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CodeDisplayProps {
    code: string;
    phoneNumber: string;
    expiresAt: Date;
    onClose: () => void;
}

export default function CodeDisplay({ code, phoneNumber, expiresAt, onClose }: CodeDisplayProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.title}>📱 Code SMS Reçu</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.phoneLabel}>Numéro de téléphone :</Text>
                    <Text style={styles.phoneNumber}>{phoneNumber}</Text>

                    <View style={styles.codeContainer}>
                        <Text style={styles.codeLabel}>Votre code de vérification :</Text>
                        <Text style={styles.code}>{code}</Text>
                    </View>

                    <View style={styles.expiryContainer}>
                        <Text style={styles.expiryLabel}>⏰ Expire à :</Text>
                        <Text style={styles.expiryTime}>{formatTime(expiresAt)}</Text>
                    </View>

                    <Text style={styles.note}>
                        ⚠️ Ce code est affiché pour les tests uniquement.{'\n'}
                        En production, il sera envoyé par SMS.
                    </Text>
                </View>

                <TouchableOpacity onPress={onClose} style={styles.okButton}>
                    <Text style={styles.okButtonText}>OK, J'ai Noté le Code</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        margin: 20,
        maxWidth: 400,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 24,
    },
    phoneLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    codeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    codeLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    code: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2196f3',
        letterSpacing: 4,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#e3f2fd',
    },
    expiryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    expiryLabel: {
        fontSize: 14,
        color: '#666',
        marginRight: 8,
    },
    expiryTime: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff6b35',
    },
    note: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        lineHeight: 16,
        fontStyle: 'italic',
    },
    okButton: {
        backgroundColor: '#2196f3',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
