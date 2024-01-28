import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import api from "../utils/api.js"; // Import the api instance

const SettingsScreen = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  const testConnection = async () => {
    try {
      const response = await api.get("/test/connection");

      if (response.status === 200) {
        setConnectionStatus("Connection successful!");
      } else {
        setConnectionStatus("Connection failed.");
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      setConnectionStatus("Error testing connection: " + error.message);
    }
  };

  const clearTrips = async () => {
    try {
      const response = await api.delete("/trip/deleteAll");

      if (response.status === 200) {
        Alert.alert("Success", "Trips cleared successfully");
      } else {
        Alert.alert("Error", "Failed to clear trips");
      }
    } catch (error) {
      console.error("Error clearing trips:", error);
      Alert.alert("Error", "Internal Server Error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Settings</Text>

      <TouchableOpacity onPress={testConnection}>
        <View
          style={{
            backgroundColor: "blue",
            padding: 16,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Test Connection</Text>
        </View>
      </TouchableOpacity>

      {connectionStatus && (
        <Text style={{ marginTop: 16 }}>{connectionStatus}</Text>
      )}

      <TouchableOpacity onPress={clearTrips}>
        <View
          style={{
            backgroundColor: "red",
            padding: 16,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Clear Trips</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
