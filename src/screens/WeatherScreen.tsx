

import React, { useState } from "react";
import {
    View, Text, TextInput, ActivityIndicator, ScrollView,
    RefreshControl, StyleSheet, TouchableOpacity, Image, Switch, Dimensions, StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useWeatherViewModel } from "../viewModel/weatherViewModel";
import { colors } from "../utils/colors";

const { width, height } = Dimensions.get("window");

type WeatherProps = {};
const WeatherScreen: React.FC<WeatherProps> = () => {
    const [city, setCity] = useState("");
    const [selectedCity, setSelectedCity] = useState("New York");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { weather, loading, refreshing, onRefresh } = useWeatherViewModel(selectedCity);
    const [errorText, setErrorText] = useState("");

    const handleCityChange = () => {
        if (city === "") {
            setErrorText("Enter the city name");
        } else {
            setSelectedCity(city);
            setErrorText("");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={isDarkMode ? colors.darkBackground : colors.white} />

            <View style={styles.switchContainer}>
                <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
            <Image source={require("../assets/images/storm.jpg")} style={styles.logo} />
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>Weather App</Text>
            <View style={styles.inputContainer}>
                <Icon name="map-marker-outline" size={24} color={isDarkMode ? colors.lightGray : colors.lightButtonBackground} />
                <TextInput
                    style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
                    placeholder="Enter city name"
                    placeholderTextColor={isDarkMode ? colors.lightGray : colors.darkBorder}
                    value={city}
                    onChangeText={(text) => {
                        setCity(text)
                        setErrorText("")
                    }}
                />
            </View>
            <TouchableOpacity style={[styles.button, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={handleCityChange}>
                <Text style={styles.buttonText}>Get Weather</Text>
            </TouchableOpacity>
            {errorText !== "" && (
                <View style={styles.errorContainer}>
                    <Icon name="alert-circle-outline" size={24} color={colors.errorText} />
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            )}
            {weather === null && city && (
                <View style={styles.errorContainer}>
                    <Icon name="alert-circle-outline" size={24} color={colors.errorText} />
                    <Text style={styles.errorText}>Invalid city name! Please enter a correct city.</Text>
                </View>
            )}
            {loading && <ActivityIndicator size="large" color={isDarkMode ? colors.loadingIndicatorDark : colors.loadingIndicatorLight} />}
            {weather && (
                <View style={[styles.weatherContainer, isDarkMode ? styles.darkCard : styles.lightCard]}>
                    <Text style={[styles.weatherTitle, isDarkMode ? styles.darkText : styles.lightText]}>{weather.address}</Text>
                    <View style={styles.weatherRow}>
                        <Icon name="thermometer" size={24} color={colors.thermometerIcon} />
                        <Text style={isDarkMode ? styles.weatherText : styles.weatherTextDark}>Temperature: {weather.temperature}°C</Text>
                    </View>
                    <View style={styles.weatherRow}>
                        <Icon name="water-percent" size={24} color={colors.humidityIcon} />
                        <Text style={isDarkMode ? styles.weatherText : styles.weatherTextDark}>Humidity: {weather.humidity}%</Text>
                    </View>
                    <View style={styles.weatherRow}>
                        <Icon name="weather-windy" size={24} color={colors.windIcon} />
                        <Text style={isDarkMode ? styles.weatherText : styles.weatherTextDark}>Wind Speed: {weather.windSpeed} km/h</Text>
                    </View>
                    <View style={styles.weatherRow}>
                        <Icon name="weather-cloudy" size={24} color={colors.weatherConditionIcon} />
                        <Text style={isDarkMode ? styles.weatherText : styles.weatherTextDark}>Condition: {weather.description}</Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, justifyContent: "center", alignItems: "center" },
    lightContainer: { backgroundColor: colors.white },
    darkContainer: { backgroundColor: colors.darkBackground },

    switchContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width * 0.9, marginBottom: 10 },

    logo: { width: width * 0.3, height: width * 0.3, marginBottom: 10 },
    title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

    lightText: { color: colors.lightText },
    darkText: { color: colors.white },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: width * 0.9,
    },
    input: { flex: 1, marginLeft: 10, fontSize: 16 },

    button: { padding: 12, borderRadius: 5, marginTop: 10, width: width * 0.9, alignItems: "center" },
    buttonText: { color: colors.white, fontSize: 18, fontWeight: "bold" },

    errorContainer: { flexDirection: "row", alignItems: "center", marginTop: 10, backgroundColor: colors.errorBackground, padding: 10, borderRadius: 5 },
    errorText: { color: colors.errorText, marginLeft: 10 },

    weatherContainer: { marginTop: 20, padding: 15, borderRadius: 10, width: width * 0.9 },
    darkCard: { backgroundColor: colors.darkInputBackground, shadowColor: colors.white, shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
    lightCard: { backgroundColor: colors.lightInputBackground, shadowColor: colors.white, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },

    weatherTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    weatherRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
    weatherText: { fontSize: 18, marginLeft: 10, color: colors.white },
    weatherTextDark: { fontSize: 18, marginLeft: 10, color: colors.lightText },
    lightButton: { backgroundColor: colors.loadingIndicatorLight },
    darkButton: { backgroundColor: colors.darkBorder },
    lightInput: { backgroundColor: colors.lightInputBackground, borderColor: colors.lightBorder, color: colors.lightText },
    darkInput: { backgroundColor: colors.darkInputBackground, borderColor: colors.darkBorder, color: colors.white },

});

export default WeatherScreen;

