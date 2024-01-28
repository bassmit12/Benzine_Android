// PaymentScreen.js
import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import TextInputComponent from "../components/TextInputComponent";
import SubmitButton from "../components/SubmitButton";

const PaymentScreen = () => {
  const [totalKilometers, setTotalKilometers] = useState([]);
  const [gasolinePrice, setGasolinePrice] = useState("");
  const [moneyPaid, setMoneyPaid] = useState("");

  useEffect(() => {
    const fetchTotalKilometers = async () => {
      try {
        const response = await fetch(
          "http://benzine-server.germanywestcentral.azurecontainer.io:5000/trip/calculateTotalKilometers"
        );
        const result = await response.json();
        setTotalKilometers(result);
      } catch (error) {
        console.error("Error fetching total kilometers:", error);
      }
    };

    fetchTotalKilometers();
  }, []);

  const calculateAmountOwed = () => {
    // Convert inputs to numbers
    const pricePerLiter = parseFloat(gasolinePrice);
    const paidAmount = parseFloat(moneyPaid);

    if (isNaN(pricePerLiter) || isNaN(paidAmount)) {
      // Handle invalid input
      console.error("Invalid input for gasoline price or money paid");
      return;
    }

    // Initialize an object to store the amount owed for each person
    const amountOwedPerPerson = {};

    // Calculate total distance based on the total kilometers
    totalKilometers.forEach((entry) => {
      // Calculate liters consumed for each person
      const litersConsumed = entry.totalKilometers / 10;

      // Calculate amount owed for each person
      const amountOwed = litersConsumed * pricePerLiter;

      // Store the amount owed for each person in the object
      amountOwedPerPerson[entry._id] = amountOwed;
    });

    console.log("Amount Owed Per Person:", amountOwedPerPerson);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "white",
      }}
    >
      <Text>Total Kilometers for Each Name:</Text>
      {totalKilometers.map((entry) => (
        <Text key={entry._id}>
          {entry._id}: {entry.totalKilometers} km
        </Text>
      ))}
      <TextInputComponent
        labelText="Gasoline Price (per liter)"
        value={gasolinePrice}
        onChangeText={(text) => setGasolinePrice(text)}
      />

      <TextInputComponent
        labelText="Money Paid"
        value={moneyPaid}
        onChangeText={(text) => setMoneyPaid(text)}
      />

      {/* Use the SubmitButton component instead of the default Button */}
      <SubmitButton
        label="Calculate Amount Owed"
        onPress={calculateAmountOwed}
      />
    </View>
  );
};

export default PaymentScreen;
