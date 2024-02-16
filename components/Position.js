import * as Location from "expo-location";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Position() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [message, setMessage] = useState("Retrieving location...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      try {
        if (status !== "granted") {
          setMessage("Location not permitted.");
        } else {
          const position = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setMessage("Location retrieved");
        }
      } catch (error) {
        setMessage("Error retrieving location.");
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <View>
      <Text style={StyleSheet.coords}>
        {latitude.toFixed(3)}, {longitude.toFixed(3)}
      </Text>
      <Text style={StyleSheet.message}>{message}</Text>
      {isLoading === false && (
        <Weather latitude={latitude} longitude={longitude} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  coords: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "gray",
  },
});
