// PaymentScreen.js
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

const PaymentScreen = () => {
  const [totalKilometers, setTotalKilometers] = useState([]);

  useEffect(() => {
    const fetchTotalKilometers = async () => {
      try {
        const response = await fetch(
          "https://measured-gentle-labrador.ngrok-free.app/trip/calculateTotalKilometers"
        );
        const result = await response.json();
        setTotalKilometers(result);
      } catch (error) {
        console.error("Error fetching total kilometers:", error);
      }
    };

    fetchTotalKilometers();
  }, []);

  return (
    <View>
      <Text>Total Kilometers for Each Name:</Text>
      {totalKilometers.map((entry) => (
        <Text key={entry._id}>
          {entry._id}: {entry.totalKilometers} km
        </Text>
      ))}
    </View>
  );
};

export default PaymentScreen;
