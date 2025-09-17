import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, Keyboard } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function CreatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const handleSavePassword = () => {
        if (!password || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        // Ici vous pouvez ajouter la logique pour sauvegarder le mot de passe
        Alert.alert('Succès', 'Mot de passe créé avec succès');
        router.push('/verification_email');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Svg style={styles.backArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </TouchableOpacity>

                <View style={styles.headerSection}>
                    <Text style={styles.title}>
                        Créez votre mot de passe
                    </Text>
                    <Text style={styles.subtitle}>
                        Connectez un mot de passe sécurisé pour vous connecter à votre compte sur des appareils différents.
                    </Text>
                </View>

                <View style={styles.formSection}>
                    {/* Champ mot de passe */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                            <TextInput
                                ref={passwordInputRef}
                                style={styles.input}
                                placeholder="Mot de passe"
                                placeholderTextColor="rgba(113, 118, 128, 1)"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    confirmPasswordInputRef.current?.focus();
                                }}
                                blurOnSubmit={false}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.eyeIconText}>👁</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Champ confirmation mot de passe */}
                    <View style={styles.confirmInputContainer}>
                        <View style={styles.inputField}>
                            <TextInput
                                ref={confirmPasswordInputRef}
                                style={styles.input}
                                placeholder="Confirmer mot de passe"
                                placeholderTextColor="rgba(113, 118, 128, 1)"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                returnKeyType="done"
                                onSubmitEditing={() => {
                                    Keyboard.dismiss();
                                    handleSavePassword();
                                }}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Text style={styles.eyeIconText}>👁</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bouton Enregistrer */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                        <Text style={styles.saveButtonText}>
                            Enregistrer
                        </Text>
                    </TouchableOpacity>

                    {/* Bouton Compte Pro */}
                    <TouchableOpacity
                        style={styles.proAccountButton}
                        onPress={() => router.push('/creation_comptePro')}
                    >
                        <Text style={styles.proAccountText}>
                            [Si Compte Pro →]
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "rgba(89, 37, 220, 1)",
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 40,
        width: "100%",
    } as any,
    headerSection: {
        marginTop: 60,
        marginBottom: 40,
    } as any,
    formSection: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 20,
    } as any,
    title: {
        textAlign: 'left',
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 22,
        fontWeight: "800",
        lineHeight: 32,
        marginBottom: 16,
    } as any,
    subtitle: {
        textAlign: 'left',
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 21,
        opacity: 0.9,
    } as any,
    backButton: {
        alignSelf: 'flex-start',
        padding: 8,
        marginBottom: 20,
    } as any,
    backArrow: {
        width: 24,
        height: 24,
    } as any,
    inputContainer: {
        width: "100%",
    } as any,
    confirmInputContainer: {
        width: "100%",
    } as any,
    inputField: {
        borderStyle: "solid",
        backgroundColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        display: "flex",
        alignItems: "center",
        columnGap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        flexDirection: "row",
        minHeight: 48,
    } as any,
    input: {
        flex: 1,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
    } as any,
    eyeIcon: {
        width: 25,
        height: 19,
        justifyContent: "center",
        alignItems: "center",
    } as any,
    eyeIconText: {
        textAlign: "center",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: Platform.OS === 'web' ? 'system-ui' : 'SF Pro Display',
        fontSize: 16,
        fontWeight: "400",
    } as any,
    saveButton: {
        width: "100%",
        borderStyle: "solid",
        backgroundColor: "rgba(249, 245, 255, 1)",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "rgba(249, 245, 255, 1)",
        borderRadius: 8,
        minHeight: 48,
        marginTop: 20,
    } as any,
    saveButtonText: {
        textAlign: "center",
        color: "rgba(105, 65, 198, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    } as any,
    proAccountButton: {
        width: "100%",
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    } as any,
    proAccountText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24,
    } as any,
});