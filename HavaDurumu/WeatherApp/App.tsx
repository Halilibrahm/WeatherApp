import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const API_KEY = '43cb28df6ebda888e1075f7aaa34cab0';
const cities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana'];

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = cities.map(city =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
        );
        const results = await Promise.all(promises);
        setWeatherData(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {weatherData.map((cityWeather, index) => (
        <View key={index} style={styles.cityContainer}>
          <Text style={styles.cityName}>{cityWeather.name}</Text>
          <Text style={styles.temperature}>{Math.round(cityWeather.main.temp)}°C</Text>
          <Text style={styles.description}>{cityWeather.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 36,
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
  },
});

export default WeatherApp;