import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

interface SelectedFile {
    id: string;
    name: string;
    uri: string;
    size: number;
}

export default function CréationducomptePro() {
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

    const handleDocumentPicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                const newFile: SelectedFile = {
                    id: Date.now().toString(),
                    name: result.assets[0].name,
                    uri: result.assets[0].uri,
                    size: result.assets[0].size || 0,
                };
                setSelectedFiles(prev => [...prev, newFile]);
                Alert.alert('Succès', 'Fichier ajouté avec succès !');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de sélectionner le fichier');
            console.error('Erreur DocumentPicker:', error);
        }
    };

    const removeFile = (fileId: string) => {
        setSelectedFiles(prev => prev.filter(file => file.id !== fileId));
    };

    return (
        <View style={styles.créationducompteProContainer}>
            <View style={styles.rectangle715} />
            {/* Bouton de retour */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M15 18L9 12L15 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </TouchableOpacity>
            <ScrollView
                style={[styles.scrollContainer, Platform.OS === 'web' && styles.webScrollContainer]}
                contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.webScrollContent]}
                showsVerticalScrollIndicator={true}
            >
                <Text style={styles._trouvezàuneintreprétationsansattente}>
                    {`Création du compte pro`}
                </Text>
                {/* Visualwind:: can be replaced with <_inputfield type={"default"} leadingicon={"false"} label={"false"} hinttext={"false"} helpicon={"false"} destructive={"false"} state={"placeholder"} /> */}
                <View style={styles._inputfield}>
                    {/* Visualwind:: can be replaced with <__Inputfieldbase type={"default"} destructive={"false"} /> */}
                    <View style={styles.__Inputfieldbase}>
                        <View style={styles.__inputwithlabel}>
                            <View style={styles.__input}>
                                <TextInput
                                    style={styles.__textInput}
                                    placeholder="Adresse entreprise"
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Visualwind:: can be replaced with <__inputfield type={"default"} leadingicon={"false"} label={"false"} hinttext={"false"} helpicon={"false"} destructive={"false"} state={"placeholder"} /> */}
                <View style={styles.__inputfield}>
                    {/* Visualwind:: can be replaced with <___Inputfieldbase type={"default"} destructive={"false"} /> */}
                    <View style={styles.___Inputfieldbase}>
                        <View style={styles.___inputwithlabel}>
                            <View style={styles.___input}>
                                <TextInput
                                    style={styles.___textInput}
                                    placeholder="Adresse entreprise"
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Visualwind:: can be replaced with <___inputfield type={"default"} leadingicon={"false"} label={"false"} hinttext={"false"} helpicon={"false"} destructive={"false"} state={"placeholder"} /> */}
                <View style={styles.___inputfield}>
                    {/* Visualwind:: can be replaced with <____Inputfieldbase type={"default"} destructive={"false"} /> */}
                    <View style={styles.____Inputfieldbase}>
                        <View style={styles.____inputwithlabel}>
                            <View style={styles.____input}>
                                <TextInput
                                    style={styles.____textInput}
                                    placeholder="Numéro d'immatriculation de votre activité"
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                    multiline={true}
                                    numberOfLines={2}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Section Téléchargez vos certifications */}
                <Text style={styles.trouvezàuneintreprétationsansattente}>
                    {`Téléchargez vos certifications`}
                </Text>

                {/* Texte informatif pour les certifications */}
                <Text style={styles.certificationInfoText}>
                    Nom de l'établissement d'études, formation ou dernière entreprise
                </Text>

                {/* Bouton de téléchargement */}
                <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPicker}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={styles.uploadIcon}>
                        <Path
                            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                            stroke="rgba(46, 144, 250, 1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M14 2V8H20"
                            stroke="rgba(46, 144, 250, 1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M16 13H8"
                            stroke="rgba(46, 144, 250, 1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M16 17H8"
                            stroke="rgba(46, 144, 250, 1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M10 9H9H8"
                            stroke="rgba(46, 144, 250, 1)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                    <Text style={styles.uploadButtonText}>Télécharger un fichier</Text>
                </TouchableOpacity>

                {/* Liste des fichiers sélectionnés */}
                {selectedFiles.length > 0 && (
                    <View style={styles.filesContainer}>
                        <Text style={styles.filesTitle}>Fichiers sélectionnés :</Text>
                        {selectedFiles.map((file) => (
                            <View key={file.id} style={styles.fileItem}>
                                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <Path
                                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                                        stroke="rgba(46, 144, 250, 1)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {file.name}
                                </Text>
                                <TouchableOpacity onPress={() => removeFile(file.id)}>
                                    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <Path
                                            d="M18 6L6 18"
                                            stroke="rgba(255, 59, 48, 1)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <Path
                                            d="M6 6L18 18"
                                            stroke="rgba(255, 59, 48, 1)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Champ Adresse domicile après téléchargement */}
                <View style={styles.adresseDomicileField}>
                    <View style={styles.adresseDomicileInputfieldbase}>
                        <View style={styles.adresseDomicileInputwithlabel}>
                            <View style={styles.adresseDomicileInput}>
                                <TextInput
                                    style={styles.adresseDomicileTextInput}
                                    placeholder="Adresse domicile"
                                    placeholderTextColor="rgba(113, 118, 128, 1)"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    créationducompteProContainer: {
        flex: 1,
        backgroundColor: "rgba(249, 250, 251, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        rowGap: 0,
        ...(Platform.OS === 'web' && {
            maxWidth: 375,
            marginHorizontal: 'auto',
            height: 800,
        }),
    },
    rectangle715: {
        position: "absolute",
        flexShrink: 0,
        width: "100%",
        height: 80,
        backgroundColor: "rgba(46, 144, 250, 1)"
    },
    trouvezàuneintreprétationsansattente: {
        flexShrink: 0,
        marginHorizontal: 30,
        marginTop: 40,
        height: 32,
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 32
    },
    group11042: {
        position: "absolute",
        flexShrink: 0,
        top: 57,
        height: 36,
        left: 15,
        width: 36
    },
    myVar: {
        position: "absolute",
        flexShrink: 0,
        top: 7,
        left: 7,
        width: 24,
        height: 24,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "SF Pro Display",
        fontSize: 20,
        fontWeight: 400
    },
    textareainputfield: {
        flexShrink: 0,
        marginHorizontal: 37,
        marginTop: 20,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    _Textareainputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    inputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    input: {
        position: "relative",
        alignSelf: "stretch",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        borderStyle: "solid",
        backgroundColor: "transparent",
        shadowColor: "rgba(10, 13, 18, 0.05)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
        display: "flex",
        alignItems: "flex-start",
        columnGap: 8,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 100
    },
    text: {
        position: "relative",
        alignSelf: "stretch",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    _trouvezàuneintreprétationsansattente: {
        flexShrink: 0,
        marginHorizontal: 35,
        marginTop: 30,
        height: 44,
        textAlign: "left",
        color: "rgba(33, 33, 33, 1)",
        fontFamily: "Outfit",
        fontSize: 22,
        fontWeight: 500,
        lineHeight: 44
    },
    inputfield: {
        flexShrink: 0,
        marginHorizontal: 35,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    _Inputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    _inputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    _input: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 56
    },
    content: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        columnGap: 8
    },
    _text: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    _inputfield: {
        flexShrink: 0,
        marginHorizontal: 35,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    __Inputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    __inputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    __input: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 56
    },
    _content: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        columnGap: 8
    },
    __text: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    __inputfield: {
        flexShrink: 0,
        marginHorizontal: 35,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    ___Inputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    ___inputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    ___input: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 56
    },
    __content: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        columnGap: 8
    },
    ___text: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    ___inputfield: {
        flexShrink: 0,
        marginHorizontal: 35,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    ____Inputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    ____inputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    ____input: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
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
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 80
    },
    ___content: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        columnGap: 8
    },
    ____text: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    iPhoneStatusbar: {
        position: "absolute",
        flexShrink: 0,
        height: 41,
        width: 390,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    wifi: {
        position: "absolute",
        flexShrink: 0,
        top: 16,
        right: 55,
        width: 17,
        height: 12,
        overflow: "visible"
    },
    _battery: {
        position: "absolute",
        flexShrink: 0,
        top: 16,
        height: 12,
        right: 25,
        width: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    fill: {
        position: "absolute",
        flexShrink: 0,
        top: 2,
        right: 4,
        bottom: 2,
        left: 2,
        overflow: "visible"
    },
    outline: {
        position: "absolute",
        flexShrink: 0,
        width: 25,
        height: 12,
        overflow: "visible"
    },
    reception: {
        position: "absolute",
        flexShrink: 0,
        top: 17,
        left: 296,
        width: 17,
        height: 10,
        overflow: "visible"
    },
    time: {
        position: "absolute",
        flexShrink: 0,
        top: 14,
        left: 37,
        width: 42,
        height: 17,
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "SF Pro Display",
        fontSize: 16.95652198791504,
        fontWeight: 600,
        letterSpacing: -0.34,
        lineHeight: 17
    },
    // Styles pour le nouveau champ Adresse domicile
    adresseDomicileField: {
        flexShrink: 0,
        marginHorizontal: "9%",
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },
    adresseDomicileInputfieldbase: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    adresseDomicileInputwithlabel: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 6
    },
    adresseDomicileInput: {
        position: "relative",
        alignSelf: "stretch",
        flexShrink: 0,
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
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)",
        borderRadius: 8,
        minHeight: 56
    },
    adresseDomicileContent: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        display: "flex",
        alignItems: "center",
        columnGap: 8
    },
    adresseDomicileText: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: "left",
        color: "rgba(113, 118, 128, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24
    },
    // Styles pour le bouton de retour
    backButton: {
        position: "absolute",
        top: 30,
        left: 20,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
    },
    // Styles pour le ScrollView
    scrollContainer: {
        flex: 1,
        marginTop: 80, // Espace pour la barre bleue
        backgroundColor: "rgba(249, 250, 251, 1)",
    },
    scrollContent: {
        paddingBottom: 100, // Espace en bas pour le dernier champ
        minHeight: "100%",
    },
    webScrollContainer: {
        ...(Platform.OS === 'web' && {
            maxHeight: 800,
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: {
                display: 'none',
            },
        }),
    },
    webScrollContent: {
        ...(Platform.OS === 'web' && {
            flexGrow: 1,
            paddingBottom: 40,
        }),
    },
    // Styles pour les TextInput
    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24,
        textAlignVertical: "top",
        minHeight: 80
    },
    adresseDomicileTextInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24
    },
    _textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24
    },
    __textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24
    },
    ___textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24
    },
    ____textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        padding: 0,
        margin: 0,
        lineHeight: 24,
        textAlignVertical: "top"
    },
    // Style pour le texte informatif des certifications
    certificationInfoText: {
        fontSize: 16,
        fontFamily: "Inter",
        color: "rgba(113, 118, 128, 1)",
        marginHorizontal: 37,
        marginTop: 20,
        textAlign: "left",
        lineHeight: 24
    },
    // Styles pour la fonctionnalité de téléchargement
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 35,
        marginTop: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: "rgba(46, 144, 250, 0.1)",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "rgba(46, 144, 250, 1)",
        borderStyle: "dashed"
    },
    uploadIcon: {
        marginRight: 10
    },
    uploadButtonText: {
        fontSize: 16,
        fontFamily: "Inter",
        color: "rgba(46, 144, 250, 1)",
        fontWeight: "500"
    },
    filesContainer: {
        marginHorizontal: 35,
        marginTop: 20
    },
    filesTitle: {
        fontSize: 16,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        fontWeight: "500",
        marginBottom: 10
    },
    fileItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "rgba(213, 215, 218, 1)"
    },
    fileName: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Inter",
        color: "rgba(33, 33, 33, 1)",
        marginLeft: 10,
        marginRight: 10
    }
});