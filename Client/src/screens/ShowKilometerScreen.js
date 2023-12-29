import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client";

const ShowKilometerScreen = () => {
  const [allData, setAllData] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    fetchData();

    // Establish a websocket connection
    const socket = io("https://measured-gentle-labrador.ngrok-free.app");

    // Listen for the 'newTrip' event
    socket.on("newTrip", (newTrip) => {
      // Update state with the new trip
      setAllData((prevData) => [...prevData, newTrip]);

      // You may need to update uniqueNames here if needed
    });

    // Clean up the websocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Fetch data when the component mounts

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://measured-gentle-labrador.ngrok-free.app/trip/get"
      );
      const result = await response.json();

      setAllData(result);

      // Extract unique names
      const uniqueNamesSet = new Set(result.map((entry) => entry.name));
      setUniqueNames(Array.from(uniqueNamesSet));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNamePress = (name) => {
    setSelectedName((prevName) => (prevName === name ? null : name));
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.name}</Text>
      <Text style={styles.column}>{item.startKilometers}</Text>
      <Text style={styles.column}>{item.endKilometers}</Text>
      <Text style={styles.column}>
        {item.endKilometers - item.startKilometers}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>Start</Text>
      <Text style={styles.headerText}>End</Text>
      <Text style={styles.headerText}>Total</Text>
    </View>
  );

  const filteredData = selectedName
    ? allData.filter((entry) => entry.name === selectedName)
    : allData;

  // Sort the filtered data based on startKilometers
  const sortedData = [...filteredData].sort(
    (a, b) => a.startKilometers - b.startKilometers
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />

      <View style={styles.namesContainer}>
        {uniqueNames.map((name) => (
          <TouchableOpacity
            key={name}
            style={[
              styles.nameButton,
              {
                borderColor: selectedName === name ? "lightgreen" : "blue",
              },
            ]}
            onPress={() => handleNamePress(name)}
          >
            <Text style={styles.nameButtonText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
    paddingVertical: 8,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  namesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 8,
  },
  nameButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  nameButtonText: {
    fontSize: 16,
    color: "black",
  },
});

export default ShowKilometerScreen;
