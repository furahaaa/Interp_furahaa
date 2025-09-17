import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image, Animated, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Svg, Path, Ellipse, Circle, Line } from 'react-native-svg';

const videoCameraIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="black"/>
</svg>`;

export default function DashboardInterp() {
    const [selectedType, setSelectedType] = useState<'interprétation' | 'translation'>('interprétation');
    const [languagesSwapped, setLanguagesSwapped] = useState(false);

    const handleTypeSelection = (type: 'interprétation' | 'translation') => {
        setSelectedType(type);
    };

    const handleLanguageSwap = () => {
        setLanguagesSwapped(!languagesSwapped);
    };



    return (
        <View style={styles.backgroundContainer}>
            <ScrollView
                style={styles.dashboardInterpContainer}
                contentContainerStyle={[
                    { paddingTop: 50, paddingBottom: Platform.OS === 'android' ? 80 : 80 },
                    Platform.OS === 'web' && styles.webScrollContent
                ]}
                showsVerticalScrollIndicator={false}
            >


                {/* Type Selector */}
                <View style={styles.typeSelector}>
                    <Pressable
                        style={[
                            styles.typeButton,
                            selectedType === 'interprétation' && styles.selectedTypeButton
                        ]}
                        onPress={() => handleTypeSelection('interprétation')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            selectedType === 'interprétation' && styles.selectedTypeButtonTextInterp
                        ]}>
                            Interprétation
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.typeButton,
                            selectedType === 'translation' && styles.selectedTypeButton
                        ]}
                        onPress={() => handleTypeSelection('translation')}
                    >
                        <Text style={[
                            styles.typeButtonText,
                            selectedType === 'translation' && styles.selectedTypeButtonTextTrans
                        ]}>
                            Translation
                        </Text>
                    </Pressable>
                </View>

                {/* Language Selection Section */}
                <View style={styles.languageSection}>
                    <View style={styles.languageSelector}>
                        <View style={styles.sourceLanguage}>
                            <View style={styles.languageInfo}>
                                <Text style={styles.languageName}>
                                    {languagesSwapped ? 'Portugais' : 'Française'}
                                </Text>
                                <View style={styles.languageRow}>
                                    <View style={styles.flagContainer}>
                                        {languagesSwapped ? (
                                            <View style={styles.brazilianFlag}>
                                                <View style={styles.flagStripe1} />
                                                <View style={styles.flagStripe2} />
                                                <View style={styles.flagStripe3} />
                                            </View>
                                        ) : (
                                            <View style={styles.frenchFlag}>
                                                <View style={styles.flagStripe1} />
                                                <View style={styles.flagStripe2} />
                                                <View style={styles.flagStripe3} />
                                            </View>
                                        )}
                                    </View>
                                    <Text style={[styles.countryName, languagesSwapped && styles.portugueseText]}>
                                        {languagesSwapped ? 'Brésil' : 'France'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.lsfTag}>
                                <Text style={styles.lsfText}>
                                    {languagesSwapped ? 'Libras' : 'LSF'}
                                </Text>
                            </View>
                        </View>

                        {/* Arrow Icon - Clickable */}
                        <Pressable style={styles.arrowContainer} onPress={handleLanguageSwap}>
                            <Svg style={styles.arrowIcon} width="33" height="32" viewBox="0 0 33 32" fill="none">
                                <Ellipse cx="16.0458" cy="16" rx="16.0458" ry="16" fill="white" />
                                <Path d="M22.3594 12.1791L20.2803 12.1791M9.0532 12.1791L14.043 16.5533M9.0532 12.1791L14.043 7.80502M9.0532 12.1791L17.7854 12.1791" stroke="#14181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <Path d="M9.05273 22.6771L11.1318 22.6771M22.3589 22.6771L17.3691 19.1778M22.3589 22.6771L17.3691 26.1764M22.3589 22.6771L13.6267 22.6771" stroke="#14181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </Pressable>

                        <View style={styles.targetLanguage}>
                            <View style={styles.languageInfo}>
                                <Text style={[styles.languageName, !languagesSwapped && styles.portugueseText]}>
                                    {languagesSwapped ? 'Française' : 'Portugais'}
                                </Text>
                                <View style={styles.languageRow}>
                                    <View style={styles.flagContainer}>
                                        {languagesSwapped ? (
                                            <View style={styles.frenchFlag}>
                                                <View style={styles.flagStripe1} />
                                                <View style={styles.flagStripe2} />
                                                <View style={styles.flagStripe3} />
                                            </View>
                                        ) : (
                                            <View style={styles.brazilianFlag}>
                                                <View style={styles.flagStripe1} />
                                                <View style={styles.flagStripe2} />
                                                <View style={styles.flagStripe3} />
                                            </View>
                                        )}
                                    </View>
                                    <Text style={[styles.countryName, !languagesSwapped && styles.portugueseText]}>
                                        {languagesSwapped ? 'France' : 'Brésil'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.lsfTag}>
                                <Text style={styles.lsfText}>
                                    {languagesSwapped ? 'LSF' : 'Libras'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Location Input */}
                <View style={styles.locationSection}>
                    <View style={styles.locationInput}>
                        <View style={styles.locationIcon}>
                            <Image
                                source={require('../assets/images/localisation_point.png')}
                                style={styles.pinIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.locationPlaceholder}>
                            Où se prendre le rendez-vous...
                        </Text>
                    </View>
                </View>

                {/* Communication Options */}
                <View style={styles.communicationSection}>
                    <View style={styles.callButtonsContainer}>
                        <View style={styles.callButton}>
                            <View style={styles.callButtonIcon}>
                                <Text style={styles.phoneIcon}>📞</Text>
                            </View>
                            <Text style={styles.callButtonText}>Appel vocal</Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.callButton}>
                            <View style={styles.callButtonIcon}>
                                <SvgXml xml={videoCameraIcon} width="32" height="32" />
                            </View>
                            <Text style={styles.callButtonText}>Appel vidéo</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                source={require('../assets/images/accueil.png')}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Accueil</Text>
                    </View>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                source={require('../assets/images/messages.png')}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Messages</Text>
                    </View>
                    <View style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <Image
                                source={require('../assets/images/comptes.png')}
                                style={styles.navIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.navText}>Compte</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            web: {
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }
        })
    },
    dashboardInterpContainer: {
        flex: 1,
        backgroundColor: '#fff',
        ...Platform.select({
            android: {
                paddingBottom: 0,
            },
            web: {
                maxWidth: 375,
                marginHorizontal: 'auto',
                height: 800,
                maxHeight: 800,
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: {
                    display: 'none',
                },
            }
        })
    },
    webScrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },

    typeSelector: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
        padding: 5,
        ...Platform.select({
            web: {
                marginHorizontal: 15,
            }
        })
    },
    typeButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    selectedTypeButton: {
        backgroundColor: '#333',
    },
    typeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    selectedTypeButtonTextInterp: {
        color: '#FCD664',
    },
    selectedTypeButtonTextTrans: {
        color: '#6AF7D7',
    },
    languageSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
        transform: [{
            scale: 1.0
        }],
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 20,
            }
        })
    },
    languageSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
    },
    sourceLanguage: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 12,
        padding: 12,
        ...Platform.select({
            web: {
                width: 160,
                padding: 8,
            }
        })
    },
    targetLanguage: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 12,
        padding: 12,
        ...Platform.select({
            web: {
                width: 160,
                padding: 8,
            }
        })
    },
    languageInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    languageName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    portugueseText: {
        color: '#4caf50',
    },
    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagContainer: {
        marginRight: 8,
    },
    frenchFlag: {
        width: 16,
        height: 16,
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
    },
    brazilianFlag: {
        width: 16,
        height: 16,
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
    },
    flagStripe1: {
        flex: 1,
        backgroundColor: '#002395',
    },
    flagStripe2: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flagStripe3: {
        flex: 1,
        backgroundColor: '#ed2939',
    },
    countryName: {
        fontSize: 14,
        color: '#666',
    },
    lsfTag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    lsfText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    arrowContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        marginHorizontal: -8,
    },
    arrowIcon: {
        width: 28,
        height: 28,
    },
    communicationSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
        flex: 1,
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 15,
            }
        })
    },
    callButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        padding: 40,
        borderWidth: 1,
        borderColor: '#e9ecef',
        minHeight: 350,
        flex: 1,
        ...Platform.select({
            web: {
                padding: 30,
                minHeight: 450,
            }
        })
    },
    callButton: {
        flex: 1,
        alignItems: 'center',
        ...Platform.select({
            web: {
                minHeight: 250,
            }
        })
    },
    callButtonIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e9ecef',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        ...Platform.select({
            web: {
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 20,
            }
        })
    },
    phoneIcon: {
        fontSize: 24,
        ...Platform.select({
            web: {
                fontSize: 32,
            }
        })
    },
    videoIcon: {
        fontSize: 20,
    },
    callButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '400',
        ...Platform.select({
            web: {
                fontSize: 16,
                minHeight: 50,
                alignItems: 'center',
                justifyContent: 'center',
            }
        })
    },
    separator: {
        width: 1,
        height: 40,
        backgroundColor: '#d5d9eb',
        marginHorizontal: 20,
    },
    locationSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
        ...Platform.select({
            web: {
                paddingHorizontal: 15,
                marginBottom: 15,
            }
        })
    },
    locationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d5d9eb',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    locationIcon: {
        marginRight: 8,
    },
    pinIcon: {
        width: 24,
        height: 24,
    },
    locationPlaceholder: {
        flex: 1,
        fontSize: 14,
        color: '#999',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 0,
        ...Platform.select({
            android: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 1000,
            },
            web: {
                paddingHorizontal: 15,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
            }
        })
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
    },
    navIconContainer: {
        alignItems: 'center',
        marginBottom: 6,
    },
    navIcon: {
        width: 24,
        height: 24,
    },
    navText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
});
