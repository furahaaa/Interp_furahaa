
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform, Keyboard } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { router } from 'expo-router';

export default function VerificationEmail() {
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef<TextInput[]>([]);

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto-focus next input
        if (text && index < 3) {
            // Focus next input
            inputRefs.current[index + 1]?.focus();
        } else if (text && index === 3) {
            // Code complet, fermer le clavier
            Keyboard.dismiss();
        }
    };

    const handleVerifyCode = () => {
        const fullCode = code.join('');
        if (fullCode.length !== 4) {
            Alert.alert('Erreur', 'Veuillez saisir le code à 4 chiffres');
            return;
        }

        // Ici vous pouvez ajouter la logique de vérification
        Alert.alert('Succès', 'Code vérifié avec succès');
        router.push('/activation_location');
    };

    const handleResendCode = () => {
        Alert.alert('Code renvoyé', 'Un nouveau code a été envoyé à votre email');
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
                        Vérifiez votre adresse e-mail
                    </Text>
                    <Text style={styles.subtitle}>
                        Saisissez le code à 4 chiffres envoyés par e-mail à l'adresse suivante :{' '}
                        <Text style={styles.emailText}>hello@example.com</Text>
                        {' '}Vérifiez dans votre boite des emails.
                    </Text>
                </View>

                <View style={styles.formSection}>
                    {/* Champs de saisie du code */}
                    <View style={styles.codeContainer}>
                        <View style={styles.codeInputs}>
                            {[0, 1, 2, 3].map((index) => (
                                <View key={index} style={styles.codeInputWrapper}>
                                    <TextInput
                                        ref={(ref) => {
                                            if (ref) inputRefs.current[index] = ref;
                                        }}
                                        style={styles.codeInput}
                                        value={code[index]}
                                        onChangeText={(text) => handleCodeChange(text, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        textAlign="center"
                                        placeholder="0"
                                        placeholderTextColor="rgba(213, 215, 218, 1)"
                                        returnKeyType={index === 3 ? "done" : "next"}
                                        onSubmitEditing={() => {
                                            if (index < 3) {
                                                inputRefs.current[index + 1]?.focus();
                                            } else {
                                                Keyboard.dismiss();
                                            }
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
                        <Text style={styles.resendText}>
                            Renvoyer le code par email
                        </Text>
                    </TouchableOpacity>

                    {/* Bouton Suivant */}
                    <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>
                                Suivant
                            </Text>
                        </View>
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
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 22,
        fontWeight: "800",
        lineHeight: 32,
        marginBottom: 16,
    } as any,
    subtitle: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 21,
        opacity: 0.9,
    } as any,
    emailText: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.17,
        lineHeight: 21
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
    codeContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    } as any,
    codeInputs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 8,
        justifyContent: "center",
    } as any,
    codeInputWrapper: {
        width: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 10,
        borderRadius: 8
    } as any,
    codeInput: {
        height: 75,
        width: 64,
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
        justifyContent: "center",
        padding: 8,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        fontSize: 48,
        fontWeight: "500",
        letterSpacing: -0.96,
        lineHeight: 60,
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        textAlign: "center",
    } as any,
    resendButton: {
        alignSelf: "center",
        padding: 8,
        marginBottom: 20,
    } as any,
    resendText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Outfit",
        fontSize: 17,
        fontWeight: "400",
        letterSpacing: 0.17,
        lineHeight: 17
    } as any,
    button: {
        width: "100%",
        backgroundColor: "rgba(249, 245, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(249, 245, 255, 1)",
        borderRadius: 8,
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        marginTop: 20,
    } as any,
    buttonContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as any,
    buttonText: {
        textAlign: "center",
        color: "rgba(105, 65, 198, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 24
    } as any,
});