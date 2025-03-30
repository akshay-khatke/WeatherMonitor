import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData } from "../service/weatherService";
import { Weather } from "../model";
import { debounce } from "../utils/debounce";

export const useWeatherViewModel = (city: string) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const getWeather = async (forceRefresh = false) => {
        setLoading(true);
        const data = await fetchWeatherData(city, forceRefresh);
        setWeather(data);
        setLoading(false);
    };

    useEffect(() => {
        debounce(() => getWeather(), 500)(); //IIFE
    }, [city]);

    const onRefresh = () => {
        setRefreshing(true);
        getWeather(true).then(() => setRefreshing(false));
    };

    return { weather, loading, refreshing, onRefresh };
};
