import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function PasswordReset() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const currentPasswordRef = useRef<TextInput>(null);
    const newPasswordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const handleSave = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        // Ici vous pouvez ajouter la logique pour changer le mot de passe
        Alert.alert('Succès', 'Mot de passe modifié avec succès');
        router.push('/create_profil');
    };

    const togglePasswordVisibility = (type: 'current' | 'new' | 'confirm') => {
        switch (type) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>
                Mon compte
            </Text>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Svg style={styles.backArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            </TouchableOpacity>

            <Text style={styles.title}>
                Modifier le mot de passe
            </Text>

            <Text style={styles.description}>
                Il doit comporter au moins 8 caractères dont 1 lettre, 1 chiffre et 1 caractère spécial.
            </Text>

            {/* Mot de passe actuel */}
            <View style={styles.inputContainer}>
                <TextInput
                    ref={currentPasswordRef}
                    style={styles.input}
                    placeholder="Mot de passe actuel"
                    placeholderTextColor="#717680"
                    secureTextEntry={!showCurrentPassword}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        newPasswordRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => togglePasswordVisibility('current')}
                >
                    <Text style={styles.eyeIcon}>
                        {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Nouveau mot de passe */}
            <View style={styles.inputContainer}>
                <TextInput
                    ref={newPasswordRef}
                    style={styles.input}
                    placeholder="Nouveau mot de passe"
                    placeholderTextColor="#717680"
                    secureTextEntry={!showNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        confirmPasswordRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => togglePasswordVisibility('new')}
                >
                    <Text style={styles.eyeIcon}>
                        {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Confirmer mot de passe */}
            <View style={styles.inputContainer}>
                <TextInput
                    ref={confirmPasswordRef}
                    style={styles.input}
                    placeholder="Confirmer mot de passe"
                    placeholderTextColor="#717680"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                        Keyboard.dismiss();
                        handleSave();
                    }}
                />
                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => togglePasswordVisibility('confirm')}
                >
                    <Text style={styles.eyeIcon}>
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>
                    Enregistrer
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(89, 37, 220, 1)",
        paddingTop: 80,
        ...(Platform.OS === 'web' && {
            width: 390,
            height: 700,
            alignSelf: "center",
            maxWidth: "100%",
            border: "1px solid #ddd",
            borderRadius: 20,
            overflow: "hidden"
        })
    } as any,
    headerTitle: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 20,
    },
    backButton: {
        position: "absolute",
        top: 80,
        left: 20,
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        width: 24,
        height: 24,
    },
    title: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 21,
        fontWeight: "800",
        marginHorizontal: 35,
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        marginHorizontal: 37,
        marginBottom: 40,
        lineHeight: 21,
    },
    inputContainer: {
        position: "relative",
        marginHorizontal: 34,
        marginBottom: 20,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        color: "#000",
        fontFamily: "Inter",
    },
    eyeButton: {
        position: "absolute",
        right: 10,
        top: 10,
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    eyeIcon: {
        fontSize: 16,
        color: "rgba(87, 99, 108, 1)",
    },
    saveButton: {
        backgroundColor: "rgba(249, 245, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(249, 245, 255, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginHorizontal: 37,
        marginTop: 40,
        alignItems: "center",
    },
    saveButtonText: {
        color: "rgba(105, 65, 198, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
    },
});