import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";

const SettingsScreen = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  const testConnection = async () => {
    try {
      const response = await fetch(
        "https://measured-gentle-labrador.ngrok-free.app/test/connection"
      );

      if (response.ok) {
        setConnectionStatus("Connection successful!");
      } else {
        setConnectionStatus("Connection failed.");
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      setConnectionStatus("Connection error.");
    }
  };

  const clearTrips = async () => {
    try {
      const response = await fetch(
        "https://measured-gentle-labrador.ngrok-free.app/trip/deleteAll",
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
