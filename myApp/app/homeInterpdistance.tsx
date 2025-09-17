import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function HomeInterpDistance() {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.homeInterpDistanceContainer}>
            {/* Header avec titre et icône X */}
            <View style={styles.header}>
                <Text style={styles._label}>
                    {`Sur place`}
                </Text>
                <View style={styles.xIcon}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                </View>
            </View>

            {/* Champ de saisie */}
            <TextInput
                style={styles.textInput}
                placeholder="Rechercher un lieu..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="rgba(113, 118, 128, 1)"
            />

            {/* Ma position actuelle avec icône étoile */}
            <View style={styles.currentLocationContainer}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={styles.starIcon}>
                    <Path d="M10 2L12.5 7.5L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7.5L10 2Z" stroke="#666" strokeWidth="1.5" fill="none" />
                </Svg>
                <Text style={styles.mapositionactuelle}>
                    {`Ma position actuelle`}
                </Text>
            </View>

            {/* Mes lieux enregistrés */}
            <Text style={styles.label}>
                {`Mes lieux enregistrés`}
            </Text>

            {/* Boutons des lieux */}
            <View style={styles.frame11038}>
                <View style={styles.rectangle684}>
                    <Text style={styles._myVar}>
                        {`+`}
                    </Text>
                </View>
                <View style={styles.rectangle683}>
                    <Text style={styles.club}>
                        {`Club`}
                    </Text>
                </View>
                <View style={styles.rectangle686}>
                    <Text style={styles.ecole}>
                        {`Ecole`}
                    </Text>
                </View>
                <View style={styles.rectangle685}>
                    <Text style={styles.notaire}>
                        {`Notaire`}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    homeInterpDistanceContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        paddingTop: 80,
        paddingHorizontal: 20,
        marginTop: 10
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    xIcon: {
        padding: 5
    },
    currentLocationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10
    },
    starIcon: {
        marginRight: 10
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "rgba(24, 29, 39, 1)",
        fontFamily: "Inter",
        marginBottom: 15
    },
    textInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(20, 24, 27, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontWeight: "400",
        marginBottom: 20
    },
    frame11038: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        marginBottom: 20,
        flexWrap: "wrap"
    },
    rectangle684: {
        width: 70,
        height: 50,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderColor: "rgba(213, 217, 235, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    rectangle683: {
        width: 70,
        height: 50,
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    rectangle686: {
        width: 70,
        height: 50,
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    rectangle685: {
        width: 70,
        height: 50,
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    notaire: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit",
        fontSize: 12,
        fontWeight: "500"
    },
    _myVar: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit",
        fontSize: 18,
        fontWeight: "100"
    },
    club: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit",
        fontSize: 12,
        fontWeight: "500"
    },
    ecole: {
        textAlign: "center",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit",
        fontSize: 12,
        fontWeight: "500"
    },
    mapositionactuelle: {
        fontSize: 17,
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Outfit",
        fontWeight: "400"
    },
    _label: {
        fontSize: 20,
        fontWeight: "700",
        color: "rgba(24, 29, 39, 1)",
        fontFamily: "Inter"
    },







});