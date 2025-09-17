import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

export default function PageLocal() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 7)); // Janvier 2025, jour 7
    const [selectedDay, setSelectedDay] = useState(7); // Jour sélectionné
    const [selectedTime, setSelectedTime] = useState({ hours: 8, minutes: 0 }); // Heure sélectionnée
    const [flexibleTime, setFlexibleTime] = useState(false); // Heure flexible sélectionnée
    const [flexibleDate, setFlexibleDate] = useState(false); // Date flexible sélectionnée

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const goToPreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    const selectDay = (day: number) => {
        setSelectedDay(day);
        // Mettre à jour la date actuelle avec le jour sélectionné
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(day);
            return newDate;
        });
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDay(today.getDate());
    };

    const increaseTime = () => {
        setSelectedTime(prevTime => {
            let newHours = prevTime.hours;
            let newMinutes = prevTime.minutes + 15; // Incrément de 15 minutes

            if (newMinutes >= 60) {
                newHours = (newHours + 1) % 24;
                newMinutes = 0;
            }

            return { hours: newHours, minutes: newMinutes };
        });
    };

    const decreaseTime = () => {
        setSelectedTime(prevTime => {
            let newHours = prevTime.hours;
            let newMinutes = prevTime.minutes - 15; // Décrément de 15 minutes

            if (newMinutes < 0) {
                newHours = newHours === 0 ? 23 : newHours - 1;
                newMinutes = 45;
            }

            return { hours: newHours, minutes: newMinutes };
        });
    };

    const formatTime = () => {
        const hours = selectedTime.hours.toString().padStart(2, '0');
        const minutes = selectedTime.minutes.toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const toggleFlexibleTime = () => {
        setFlexibleTime(!flexibleTime);
    };

    const toggleFlexibleDate = () => {
        setFlexibleDate(!flexibleDate);
    };

    const getMonthYear = () => {
        return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Jours du mois précédent (ajuster pour que lundi = 0)
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Lundi = 0, Dimanche = 6

        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
            days.push(
                <View key={`prev-${i}`} style={styles.calendarDay}>
                    <Text style={styles.previousMonthDay}>{daysInPrevMonth - i}</Text>
                </View>
            );
        }

        // Jours du mois actuel
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = day === selectedDay; // Jour sélectionné
            days.push(
                <TouchableOpacity
                    key={day}
                    style={styles.calendarDay}
                    onPress={() => selectDay(day)}
                >
                    {isSelected && <View style={styles.selectedDayBackground} />}
                    <Text style={isSelected ? styles.selectedDayText : styles.currentMonthDay}>
                        {day}
                    </Text>
                </TouchableOpacity>
            );
        }

        // Jours du mois suivant pour compléter la grille (6 semaines * 7 jours = 42)
        const totalDays = days.length;
        const remainingDays = 42 - totalDays;
        for (let day = 1; day <= remainingDays; day++) {
            days.push(
                <View key={`next-${day}`} style={styles.calendarDay}>
                    <Text style={styles.previousMonthDay}>{day}</Text>
                </View>
            );
        }

        return days;
    };

    return (
        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
        >
            <View style={styles.container}>
                <View style={styles.headerBackground} />
                <Text style={styles.backButton}>
                </Text>

                <TouchableOpacity style={styles.closeButton}>
                    <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>

                <View style={styles.monthNavigation}>
                    <TouchableOpacity style={styles.navButton} onPress={goToPreviousMonth}>
                        <Text style={styles.navArrow}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthTitle}>
                        {getMonthYear()}
                    </Text>
                    <TouchableOpacity style={styles.navButton} onPress={goToNextMonth}>
                        <Text style={styles.navArrow}>→</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.weekDaysContainer}>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            lun.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            mar.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            mer.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            jeu.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            ven.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            sam.
                        </Text>
                    </View>
                    <View style={styles.dayContainer}>
                        <View style={styles.dayBackground} />
                        <Text style={styles.dayText}>
                            dim.
                        </Text>
                    </View>
                </View>
                <View style={styles.calendarContainer}>
                    {renderCalendarDays()}
                </View>


                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.optionCard} onPress={toggleFlexibleTime}>
                        <Svg style={styles.optionIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <Circle
                                cx="10"
                                cy="10"
                                r="9.5"
                                fill={flexibleTime ? "rgba(89, 37, 220, 1)" : "white"}
                                stroke={flexibleTime ? "rgba(89, 37, 220, 1)" : "#D1D8EA"}
                            />
                        </Svg>
                        <Text style={styles.optionTitle}>
                            Heure flexible
                        </Text>
                        <Text style={styles.optionDescription}>
                            Réservation dans une plage de ±3 jours
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={toggleFlexibleDate}>
                        <Svg style={styles.optionIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <Circle
                                cx="10"
                                cy="10"
                                r="9.5"
                                fill={flexibleDate ? "rgba(89, 37, 220, 1)" : "white"}
                                stroke={flexibleDate ? "rgba(89, 37, 220, 1)" : "#D1D8EA"}
                            />
                        </Svg>
                        <Text style={styles.optionTitle}>
                            Date flexible
                        </Text>
                        <Text style={styles.optionDescription}>
                            Réservation dans une plage de ±3 jours
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.validateButton}>
                    <View style={styles.buttonBase}>
                        <Text style={styles.buttonText}>
                            Valider {selectedDay} {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
                    <Text style={styles.todayLabel}>
                        {(() => {
                            const today = new Date();
                            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
                            const isToday = selectedDate.getDate() === today.getDate() &&
                                selectedDate.getMonth() === today.getMonth() &&
                                selectedDate.getFullYear() === today.getFullYear();
                            return isToday ? 'Aujourd\'hui' : `${selectedDay} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
                        })()}
                    </Text>
                </TouchableOpacity>

                <View style={styles.timeSelectorContainer}>
                    <TouchableOpacity style={styles.minusButton} onPress={decreaseTime}>
                        <Text style={styles.buttonSymbol}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.timeDisplay}>
                        <Text style={styles.timeText}>
                            {formatTime()}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.plusButton} onPress={increaseTime}>
                        <Text style={styles.buttonSymbol}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    // Scroll container
    scrollContainer: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 1)"
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20
    },

    // Main container
    container: {
        position: "relative",
        flexShrink: 0,
        minHeight: 1045,
        width: 390,
        backgroundColor: "rgba(255, 255, 255, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 0
    },

    // Header section
    headerBackground: {
        position: "absolute",
        flexShrink: 0,
        top: 504,
        right: 19,
        left: 28,
        height: 51,
        borderStyle: "solid",
        backgroundColor: "rgba(20, 24, 27, 1)",
        borderWidth: 2,
        borderColor: "rgba(20, 24, 27, 1)",
        borderRadius: 12
    },
    backButton: {
        position: "absolute",
        flexShrink: 0,
        top: 64,
        left: 336,
        width: 21,
        height: 24,
        textAlign: "left",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "SF Pro Display",
        fontSize: 20,
        fontWeight: 400
    },
    closeButton: {
        position: "absolute",
        top: 60,
        right: 20,
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10
    },
    closeIcon: {
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: "400",
        textAlign: "center"
    },

    // Month navigation
    monthNavigation: {
        position: "absolute",
        flexShrink: 0,
        top: 120,
        height: 42,
        left: 25,
        right: 25,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    navButton: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    navArrow: {
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24
    },
    monthTitle: {
        textAlign: "center",
        color: "rgba(27, 27, 27, 1)",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 32
    },

    // Week days
    weekDaysContainer: {
        position: "absolute",
        flexShrink: 0,
        top: 167,
        height: 47,
        left: 32,
        width: 326,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        rowGap: 0
    },
    dayContainer: {
        position: "relative",
        flexShrink: 0,
        height: 47,
        width: 46.5, // 326 / 7 = 46.5 pour 7 colonnes
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 0
    },
    dayBackground: {
        position: "absolute",
        flexShrink: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 12
    },
    dayText: {
        textAlign: "center",
        color: "rgba(89, 37, 220, 1)",
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: 500
    },

    // Calendar grid
    calendarContainer: {
        position: "absolute",
        flexShrink: 0,
        top: 211,
        height: 380,
        left: 32,
        width: 326,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    calendarDay: {
        position: "relative",
        flexShrink: 0,
        height: 47,
        width: 46.5, // 326 / 7 = 46.5 pour 7 colonnes
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0
    },
    previousMonthDay: {
        textAlign: "center",
        color: "rgba(179, 179, 179, 1)",
        fontFamily: "Roboto",
        fontSize: 15,
        fontWeight: 500
    },
    currentMonthDay: {
        textAlign: "center",
        color: "rgba(27, 27, 27, 1)",
        fontFamily: "Roboto",
        fontSize: 15,
        fontWeight: 500
    },
    selectedDayBackground: {
        position: "absolute",
        flexShrink: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(89, 37, 220, 1)",
        borderRadius: 50
    },
    selectedDayText: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Roboto",
        fontSize: 15,
        fontWeight: 500
    },


    // Validate button
    validateButton: {
        position: "absolute",
        flexShrink: 0,
        bottom: 20,
        left: 20,
        width: 343,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 0,
        borderRadius: 8,
        zIndex: 1000
    },
    buttonBase: {
        position: "relative",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        backgroundColor: "rgba(89, 37, 220, 1)",
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
        borderRadius: 8
    },
    buttonText: {
        position: "relative",
        flexShrink: 0,
        textAlign: "left",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 24
    },

    // Today button container
    todayButton: {
        position: "absolute",
        flexShrink: 0,
        top: 504,
        left: 20,
        width: 343,
        height: 51,
        backgroundColor: "rgba(20, 24, 27, 1)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    todayLabel: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 28
    },

    // Time selector container
    timeSelectorContainer: {
        position: "absolute",
        flexShrink: 0,
        top: 585,
        height: 60,
        left: 75,
        width: 240,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },

    // Time display (central white box)
    timeDisplay: {
        flexShrink: 0,
        width: 100,
        height: 50,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 1)",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    timeText: {
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 28
    },

    // Buttons (black squares with white symbols)
    plusButton: {
        flexShrink: 0,
        width: 40,
        height: 40,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    minusButton: {
        flexShrink: 0,
        width: 40,
        height: 40,
        backgroundColor: "rgba(0, 0, 0, 1)",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSymbol: {
        textAlign: "center",
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 24
    },

    // Options container
    optionsContainer: {
        position: "absolute",
        flexShrink: 0,
        width: 343,
        left: 17,
        bottom: 100,
        display: "flex",
        flexDirection: "column",
        gap: 20
    },

    // Option cards
    optionCard: {
        position: "relative",
        flexShrink: 0,
        width: 343,
        height: 105,
        backgroundColor: "rgba(234, 236, 245, 1)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    optionIcon: {
        position: "absolute",
        flexShrink: 0,
        top: 14,
        right: 20,
        width: 20,
        height: 20,
        overflow: "visible"
    },
    clockIcon: {
        position: "absolute",
        flexShrink: 0,
        top: 18,
        right: 24,
        width: 12,
        height: 12,
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "SF Pro",
        fontSize: 10,
        fontWeight: 400
    },
    calendarIcon: {
        position: "absolute",
        flexShrink: 0,
        top: 18,
        right: 24,
        width: 12,
        height: 12,
        textAlign: "center",
        color: "rgba(0, 0, 0, 1)",
        fontFamily: "SF Pro",
        fontSize: 10,
        fontWeight: 400
    },
    optionTitle: {
        position: "relative",
        flexShrink: 0,
        width: 250,
        height: 24,
        textAlign: "left",
        color: "rgba(20, 24, 27, 1)",
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 24,
        marginBottom: 5
    },
    optionDescription: {
        position: "relative",
        flexShrink: 0,
        width: 280,
        height: 32,
        textAlign: "left",
        color: "rgba(87, 99, 108, 1)",
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 20
    },

});