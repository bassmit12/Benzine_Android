// NavButton.js

import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const NavButton = ({ label, onPress, screenName, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onPress();
          navigation.navigate(screenName); // Navigate to the desired screen
        }}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
