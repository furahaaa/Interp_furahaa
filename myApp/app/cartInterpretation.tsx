import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet, ScrollView, Image, Alert, TextInput, TouchableOpacity, Dimensions, Modal, PanResponder } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Svg, Path, Circle } from 'react-native-svg';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function CartInterpretation() {
    const router = useRouter();
    const [address, setAddress] = useState('15 rue de la liberté, 75000 PARIS');
    const [isLocationActive, setIsLocationActive] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 48.8566,
        longitude: 2.3522,
    });
    const [cityName, setCityName] = useState('Paris');
    const [mapRegion, setMapRegion] = useState({
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.01, // Vue locale par défaut
        longitudeDelta: 0.01,
    });
    const [showInterpreterModal, setShowInterpreterModal] = useState(false);
    const [searchRadius, setSearchRadius] = useState(5); // Rayon de recherche en km
    const [sliderPosition, setSliderPosition] = useState(50); // Position du slider en pourcentage

    // États pour le zoom et le déplacement de la carte
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [lastScale, setLastScale] = useState(1);
    const [lastTranslateX, setLastTranslateX] = useState(0);
    const [lastTranslateY, setLastTranslateY] = useState(0);

    useEffect(() => {
        getCurrentLocation();
        // Initialiser la position du slider
        setSliderPosition((searchRadius / 10) * 100);
    }, []);

    // Fonction pour géocoder une adresse (convertir adresse en coordonnées)
    const geocodeAddress = async (addressText: string) => {
        try {
            const geocodeResult = await Location.geocodeAsync(addressText);
            if (geocodeResult.length > 0) {
                const coords = geocodeResult[0];
                console.log('Coordonnées trouvées:', coords.latitude, coords.longitude);
                setIsLocationActive(true);

                // Mettre à jour la position actuelle et la région de la carte
                setCurrentLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
                setMapRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.01, // Zoom plus serré pour voir les détails locaux
                    longitudeDelta: 0.01,
                });

                // Mettre à jour le nom de la ville
                const cityFromGeocode = await getCityName(coords.latitude, coords.longitude);
                setCityName(cityFromGeocode);
            } else {
                Alert.alert(
                    'Adresse non trouvée',
                    'Impossible de localiser cette adresse. Vérifiez l\'orthographe.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsLocationActive(false);
                            },
                        },
                    ]
                );
            }
        } catch (error) {
            console.warn('Erreur de géocodage:', error);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la recherche de l\'adresse.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setIsLocationActive(false);
                        },
                    },
                ]
            );
        }
    };

    // Fonction appelée quand l'utilisateur tape
    const handleAddressChange = (text: string) => {
        setAddress(text);

        // Délai de 1 seconde après la fin de frappe
        setTimeout(() => {
            if (text.trim().length > 3) { // Seulement si l'adresse fait plus de 3 caractères
                geocodeAddress(text);
            } else {
                setIsLocationActive(false);
            }
        }, 1000);
    };


    // Fonction pour obtenir le nom de la ville à partir des coordonnées
    const getCityName = async (latitude: number, longitude: number) => {
        try {
            const places = await Location.reverseGeocodeAsync({ latitude, longitude });
            const first = places && places.length > 0 ? places[0] : undefined;
            return first?.city || first?.district || 'Position inconnue';
        } catch (error) {
            console.warn('Erreur lors de la récupération de la ville:', error);
            return 'Position inconnue';
        }
    };

    // Fonction pour calculer la position du marqueur sur la carte statique
    const getMarkerPosition = () => {
        if (!isLocationActive || !currentLocation) return { top: '50%' as const, left: '50%' as const };

        // Zone locale de 20km de rayon autour de la position
        const lat = currentLocation.latitude;
        const lng = currentLocation.longitude;
        const localRadius = 0.18; // ~20km en degrés

        const mapBounds = {
            north: lat + localRadius,
            south: lat - localRadius,
            east: lng + localRadius,
            west: lng - localRadius
        };

        // Calculer la position relative sur la carte locale
        const latPercent = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
        const lngPercent = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;

        // Ajuster pour le centrage du marqueur
        const top = Math.max(5, Math.min(95, latPercent - 1));
        const left = Math.max(5, Math.min(95, lngPercent - 1));

        return { top: `${top}%` as const, left: `${left}%` as const };
    };

    // Gestionnaires de gestes pour le zoom et le déplacement
    const onPinchGestureEvent = (event: any) => {
        setScale(event.nativeEvent.scale * lastScale);
    };

    const onPinchHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setLastScale(scale);
        }
    };

    const onPanGestureEvent = (event: any) => {
        setTranslateX(event.nativeEvent.translationX + lastTranslateX);
        setTranslateY(event.nativeEvent.translationY + lastTranslateY);
    };

    const onPanHandlerStateChange = (event: any) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setLastTranslateX(translateX);
            setLastTranslateY(translateY);
        }
    };

    // Fonction pour réinitialiser la vue de la carte
    const resetMapView = () => {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
        setLastScale(1);
        setLastTranslateX(0);
        setLastTranslateY(0);
    };

    // Fonction pour gérer le clic sur Interprète
    const handleInterpreterPress = () => {
        setShowInterpreterModal(true);
    };

    // Fonction pour gérer le clic sur "Maintenant"
    const handleMaintenantPress = () => {
        setShowInterpreterModal(false);
        router.push('/page_local');
    };

    // Fonction pour gérer le clic sur "Plus tard"
    const handlePlusTardPress = () => {
        setShowInterpreterModal(false);
        // Ici on pourrait ajouter une logique pour programmer un rendez-vous
    };

    // Fonction pour gérer le changement du rayon de recherche
    const handleRadiusChange = (newRadius: number) => {
        const clampedRadius = Math.max(1, Math.min(10, newRadius));
        setSearchRadius(clampedRadius);
        setSliderPosition((clampedRadius / 10) * 100);
    };

    // PanResponder pour le slider
    const sliderPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
            // Calculer la position initiale basée sur la position du touch
            const sliderWidth = 100;
            const sliderX = evt.nativeEvent.locationX;
            const newPosition = Math.max(0, Math.min(100, (sliderX / sliderWidth) * 100));
            setSliderPosition(newPosition);

            const newRadius = Math.round((newPosition / 100) * 9) + 1;
            setSearchRadius(newRadius);
        },
        onPanResponderMove: (evt, gestureState) => {
            const sliderWidth = 100;
            const sliderX = evt.nativeEvent.locationX;
            const newPosition = Math.max(0, Math.min(100, (sliderX / sliderWidth) * 100));
            setSliderPosition(newPosition);

            // Convertir la position en rayon (1-10 km)
            const newRadius = Math.round((newPosition / 100) * 9) + 1;
            setSearchRadius(newRadius);
        },
        onPanResponderRelease: () => {
            // Fin du glissement
        },
    });


    const getCurrentLocation = async () => {
        try {
            // Demander la permission d'accès à la localisation
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission refusée',
                    'La localisation n\'a pas été activée. Vous pourrez l\'activer plus tard dans les paramètres.',
                    [
                        {
                            text: 'Continuer',
                            onPress: () => {
                                // Continuer sans géolocalisation
                                setIsLocationActive(false);
                            },
                        },
                    ]
                );
                return;
            }

            // Obtenir la position actuelle
            const position = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = position.coords;

            // Inverse geocoding pour récupérer l'adresse complète
            const places = await Location.reverseGeocodeAsync({ latitude, longitude });
            const first = places && places.length > 0 ? places[0] : undefined;

            if (first) {
                const streetNumber = first.streetNumber || '';
                const street = first.street || '';
                const postalCode = first.postalCode || '';
                const cityName = first.city || '';
                const fullAddress = `${streetNumber} ${street}, ${postalCode} ${cityName}`.trim();

                setAddress(fullAddress || 'Position actuelle');
                setIsLocationActive(true);

                // Mettre à jour la position actuelle et la région de la carte
                setCurrentLocation({
                    latitude: latitude,
                    longitude: longitude,
                });
                setMapRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01, // Zoom plus serré pour voir les détails locaux
                    longitudeDelta: 0.01,
                });

                // Mettre à jour le nom de la ville
                const cityFromCoords = await getCityName(latitude, longitude);
                setCityName(cityFromCoords);
            }
        } catch (err) {
            console.warn('Erreur lors de la géolocalisation:', err);
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de l\'obtention de votre position.',
                [
                    {
                        text: 'Continuer',
                        onPress: () => {
                            setIsLocationActive(false);
                        },
                    },
                ]
            );
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.mapContainer}>
                    <PinchGestureHandler
                        onGestureEvent={onPinchGestureEvent}
                        onHandlerStateChange={onPinchHandlerStateChange}
                    >
                        <PanGestureHandler
                            onGestureEvent={onPanGestureEvent}
                            onHandlerStateChange={onPanHandlerStateChange}
                        >
                            <View style={styles.mapWrapper}>
                                <ImageBackground
                                    style={[
                                        styles.mapBackground,
                                        {
                                            transform: [
                                                { scale: scale },
                                                { translateX: translateX },
                                                { translateY: translateY },
                                            ],
                                        },
                                    ]}
                                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=800&fit=crop&q=80' }}
                                >
                                    {/* Cercle de rayon de recherche */}
                                    {isLocationActive && (
                                        <View style={[styles.radiusCircle, getMarkerPosition()]}>
                                            <Svg width="100%" height="100%" viewBox="0 0 200 200" style={styles.radiusSvg}>
                                                <Circle
                                                    cx="100"
                                                    cy="100"
                                                    r={`${(searchRadius * 20)}`} // Ajuster le rayon selon la valeur
                                                    fill="none"
                                                    stroke="rgba(59, 130, 246, 0.6)"
                                                    strokeWidth="3"
                                                />
                                            </Svg>
                                        </View>
                                    )}

                                    {/* Marqueur de position sur la carte */}
                                    {isLocationActive && (
                                        <View style={[styles.mapMarker, getMarkerPosition()]}>
                                            <View style={styles.markerDot} />
                                            <View style={styles.markerPulse} />
                                            <View style={styles.cityLabel}>
                                                <Text style={styles.cityLabelText}>{cityName}</Text>
                                            </View>
                                        </View>
                                    )}
                                </ImageBackground>
                            </View>
                        </PanGestureHandler>
                    </PinchGestureHandler>

                </View>

                {/* Header with back arrow and slider */}
                <View style={styles.header}>
                    <Text style={styles.backArrow}>←</Text>
                    <View style={styles.sliderContainer}>
                        <TouchableOpacity
                            style={styles.radiusButton}
                            onPress={() => handleRadiusChange(searchRadius - 1)}
                        >
                            <Text style={styles.radiusButtonText}>-</Text>
                        </TouchableOpacity>
                        <View style={styles.sliderTrack} {...sliderPanResponder.panHandlers}>
                            <View style={[styles.sliderThumb, { left: `${sliderPosition}%` }]} />
                        </View>
                        <TouchableOpacity
                            style={styles.radiusButton}
                            onPress={() => handleRadiusChange(searchRadius + 1)}
                        >
                            <Text style={styles.radiusButtonText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.distanceText}>{searchRadius} km</Text>
                    </View>
                </View>

                {/* Search bar */}
                <View style={styles.searchBar}>
                    <Svg style={styles.searchIcon} width="18" height="20" viewBox="0 0 18 20" fill="none">
                        <Path d="M16.5 8.33325C16.5 14.1666 9 19.1666 9 19.1666C9 19.1666 1.5 14.1666 1.5 8.33325C1.5 6.34413 2.29018 4.43647 3.6967 3.02995C5.10322 1.62343 7.01088 0.833252 9 0.833252C10.9891 0.833252 12.8968 1.62343 14.3033 3.02995C15.7098 4.43647 16.5 6.34413 16.5 8.33325Z" stroke="#14181B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        <Path d="M9 10.8333C10.3807 10.8333 11.5 9.71396 11.5 8.33325C11.5 6.95254 10.3807 5.83325 9 5.83325C7.61929 5.83325 6.5 6.95254 6.5 8.33325C6.5 9.71396 7.61929 10.8333 9 10.8333Z" stroke="#14181B" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                    <TextInput
                        style={styles.addressText}
                        value={address}
                        onChangeText={handleAddressChange}
                        placeholder="Entrez votre adresse"
                        placeholderTextColor="#666"
                    />
                    {isLocationActive && (
                        <View style={styles.locationIndicator}>
                            <View style={styles.locationPulse} />
                            <View style={styles.locationDot} />
                        </View>
                    )}
                </View>

                {/* Main white card */}
                <View style={styles.whiteCard}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Card header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.titleContainer}>
                                <View style={styles.titleRow}>
                                    <Image
                                        source={require('../assets/images/icon_maps.png')}
                                        style={styles.mapIcon}
                                    />
                                    <View style={styles.titleColumn}>
                                        <Text style={styles.mainTitle}>Sur place</Text>
                                        <Text style={styles.subtitle}>Choisir un service</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.helpIcon}>?</Text>
                        </View>

                        {/* Services section */}
                        <View style={styles.servicesContainer}>
                            {/* Interprète service */}
                            <TouchableOpacity style={styles.serviceItem} onPress={handleInterpreterPress}>
                                <View style={styles.serviceIcon}>
                                    <Image
                                        source={require('../assets/images/icon_intep_1.png')}
                                        style={styles.serviceIconImage}
                                    />
                                </View>
                                <View style={styles.serviceContent}>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.categoryText}>Communication</Text>
                                    </View>
                                    <Text style={styles.serviceTitle}>Interprète</Text>
                                    <Text style={styles.serviceDescription}>Parlant de deux langues</Text>
                                </View>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Disponible</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Relais service */}
                            <View style={styles.serviceItem}>
                                <View style={styles.serviceIcon}>
                                    <Image
                                        source={require('../assets/images/relais_icon.png')}
                                        style={styles.serviceIconImage}
                                    />
                                </View>
                                <View style={styles.serviceContent}>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.categoryText}>Social</Text>
                                    </View>
                                    <Text style={styles.serviceTitle}>Relais</Text>
                                    <Text style={styles.serviceDescription}>Adapter à la communication</Text>
                                </View>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Disponible</Text>
                                </View>
                            </View>

                            {/* Assistant service */}
                            <View style={styles.serviceItem}>
                                <View style={styles.serviceIcon}>
                                    <Image
                                        source={require('../assets/images/icon_assistant.png')}
                                        style={styles.serviceIconImage}
                                    />
                                </View>
                                <View style={styles.serviceContent}>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.categoryText}>Aide</Text>
                                    </View>
                                    <Text style={styles.serviceTitle}>Assistant</Text>
                                    <Text style={styles.serviceDescription}>Accompagner les démarches</Text>
                                </View>
                                <View style={styles.statusBadge}>
                                    <View style={[styles.statusDot, styles.statusDotRed]} />
                                    <Text style={styles.statusText}>Non disponible</Text>
                                </View>
                            </View>
                        </View>

                        {/* Mes alliés section */}
                        <View style={styles.alliesSection}>
                            <Text style={styles.alliesTitle}>Mes alliés</Text>
                            <View style={styles.alliesContainer}>
                                <View style={styles.allyCard}>
                                    <View style={styles.allyAvatar}>
                                        <Text style={styles.allyAvatarText}>E</Text>
                                    </View>
                                    <View style={styles.allyInfo}>
                                        <Text style={styles.allyName}>@Emma</Text>
                                        <Text style={styles.allyRole}>Interprète</Text>
                                    </View>
                                </View>
                                <View style={styles.addAllyCard}>
                                    <Text style={styles.addIcon}>+</Text>
                                    <Text style={styles.addText}>Ajouter</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Modal pour Interprète */}
                <Modal
                    visible={showInterpreterModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowInterpreterModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButtonPlusTard} onPress={handlePlusTardPress}>
                                    <Svg style={styles.clockIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <Circle cx="10" cy="10" r="9" stroke="#666" strokeWidth="2" />
                                        <Path d="M10 6v4l3 2" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                                    </Svg>
                                    <Text style={styles.modalButtonTextPlusTard}>Plus tard</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.modalButtonMaintenant} onPress={handleMaintenantPress}>
                                    <Text style={styles.modalButtonTextMaintenant}>Maintenant</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    mapContainer: {
        height: 300,
        width: '100%',
    },
    mapBackground: {
        flex: 1,
        width: '100%',
    },
    mapWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    mapMarker: {
        position: 'absolute',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -15,
        marginLeft: -15,
    },
    cityLabel: {
        position: 'absolute',
        top: 30,
        left: -30,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 60,
        alignItems: 'center',
    },
    cityLabelText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    markerDot: {
        width: 12,
        height: 12,
        backgroundColor: '#4B39EF',
        borderRadius: 6,
        position: 'absolute',
        zIndex: 2,
    },
    markerPulse: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#4B39EF',
        position: 'absolute',
        opacity: 0.3,
        zIndex: 1,
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    backArrow: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    sliderTrack: {
        width: 100,
        height: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 2,
        marginRight: 10,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        backgroundColor: '#4B39EF',
        borderRadius: 10,
        position: 'absolute',
        top: -8,
        left: 30,
    },
    distanceText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    searchBar: {
        marginTop: -40,
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    addressText: {
        fontSize: 16,
        color: '#14181B',
        flex: 1,
    },
    locationIndicator: {
        width: 12,
        height: 12,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#1E40AF',
        position: 'absolute',
        zIndex: 2,
    },
    locationPulse: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#3B82F6',
        opacity: 0.6,
        position: 'absolute',
        zIndex: 1,
    },
    whiteCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowColor: '#4B39EF',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.2,
        shadowRadius: 50,
        elevation: 10,
        minHeight: 500,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    titleContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mapIcon: {
        width: 60,
        height: 60,
        marginRight: 15,
        marginTop: 2,
    },
    titleColumn: {
        flex: 1,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#57636C',
        fontWeight: '500',
    },
    helpIcon: {
        fontSize: 20,
        color: '#57636C',
        fontWeight: '400',
    },
    servicesContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    serviceItem: {
        flexDirection: 'row',
        backgroundColor: 'rgba(234, 236, 245, 1)',
        padding: 15,
        marginBottom: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        alignItems: 'center',
    },
    serviceIcon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        overflow: 'hidden',
    },
    serviceIconText: {
        fontSize: 24,
        color: '#14181B',
    },
    serviceIconSvg: {
        width: 40,
        height: 40,
    },
    serviceIconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    serviceContent: {
        flex: 1,
        marginLeft: 5,
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f9f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        backgroundColor: '#12B76A',
        borderRadius: 3,
        marginRight: 6,
    },
    statusDotRed: {
        backgroundColor: '#F04438',
    },
    statusText: {
        fontSize: 12,
        color: '#12B76A',
        fontWeight: '500',
    },
    serviceDescription: {
        fontSize: 14,
        color: '#57636C',
    },
    categoryBadge: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 12,
        color: '#57636C',
        fontWeight: '500',
    },
    alliesSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    alliesTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#14181B',
        marginBottom: 15,
    },
    alliesContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    allyCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    allyAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#4B39EF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    allyAvatarText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    allyInfo: {
        flex: 1,
    },
    allyName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#14181B',
        marginBottom: 2,
    },
    allyRole: {
        fontSize: 14,
        color: '#57636C',
    },
    addAllyCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        fontSize: 24,
        color: '#57636C',
        marginBottom: 5,
    },
    addText: {
        fontSize: 14,
        color: '#57636C',
        fontWeight: '500',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 50,
        minWidth: 300,
        width: '90%',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 15,
    },
    modalButtonPlusTard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    modalButtonMaintenant: {
        flex: 1,
        backgroundColor: 'rgba(89, 37, 220, 1)',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonTextPlusTard: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
        marginLeft: 8,
    },
    modalButtonTextMaintenant: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    clockIcon: {
        marginRight: 8,
    },
    // Radius circle styles
    radiusCircle: {
        position: 'absolute',
        width: 200,
        height: 200,
        marginTop: -100,
        marginLeft: -100,
        zIndex: 1,
    },
    radiusSvg: {
        width: '100%',
        height: '100%',
    },
    radiusButton: {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    radiusButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4B39EF',
    },
});