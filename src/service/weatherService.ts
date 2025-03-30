import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY, CACHE_EXPIRY_TIME } from "../utils/constants";
import { baseUrl } from "./urls";


export const fetchWeatherData = async (city: string, forceRefresh = false) => {
    const cacheKey = `weather_${city}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);

    if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (!forceRefresh && Date.now() - timestamp < CACHE_EXPIRY_TIME) {
            return data;
        }
    }
    try {
        const response = await fetch(
            `${baseUrl}${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
        );
        const json = await response.json();

        const weatherData = {
            address: json.address,
            temperature: json.currentConditions.temp,
            humidity: json.currentConditions.humidity,
            windSpeed: json.currentConditions.windspeed,
            description: json.currentConditions.conditions,
        };
        await AsyncStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: weatherData }));
        return weatherData;
    } catch (error) {
        console.log('check the null', error)
        console.error("Error fetching weather:", error);
        return null;
    }
};
