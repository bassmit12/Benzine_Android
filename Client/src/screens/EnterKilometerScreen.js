// Update the EnterKilometerScreen component

import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import DropdownComponent from "../components/DropdownComponent";
import TextInputComponent from "../components/TextInputComponent";
import SubmitButton from "../components/SubmitButton";

const EnterKilometerScreen = () => {
  const [kilometerStart, setKilometerStart] = useState("");
  const [kilometerEnd, setKilometerEnd] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [highestEndKilometers, setHighestEndKilometers] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://measured-gentle-labrador.ngrok-free.app/trip/get"
        );
        const responseData = await response.json();

        if (response.ok) {
          const highestEnd = Math.max(
            ...responseData.map((trip) => trip.endKilometers)
          );
          setHighestEndKilometers(highestEnd.toString());

          // Set initial value only if kilometerStart is not set by the user
          if (!kilometerStart) {
            setKilometerStart(highestEnd.toString());
          }
        } else {
          Alert.alert("Error", "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Internal Server Error");
      }
    };

    fetchData();
  }, []);

  const handleButtonPress = async () => {
    try {
      const distance = kilometerEnd - kilometerStart;
      const personName = selectedPerson
        ? selectedPerson.label
        : "Unknown Person";

      const response = await fetch(
        "https://measured-gentle-labrador.ngrok-free.app/trip/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: personName,
            startKilometers: kilometerStart,
            endKilometers: kilometerEnd,
          }),
        }
      );

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (response.ok) {
        Alert.alert("Success", "Trip created successfully");
      } else {
        Alert.alert("Error", "Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      Alert.alert("Error", "Internal Server Error");
    }
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
      <DropdownComponent
        value={selectedPerson}
        onChange={(item) => setSelectedPerson(item)}
      />

      <TextInputComponent
        labelText={`Enter kilometers at the start`}
        value={kilometerStart}
        onChangeText={(text) => setKilometerStart(text)}
      />
      <TextInputComponent
        labelText="Enter kilometers at the end"
        value={kilometerEnd}
        onChangeText={(text) => setKilometerEnd(text)}
      />
      <SubmitButton label="Submit distance" onPress={handleButtonPress} />
    </View>
  );
};

export default EnterKilometerScreen;
