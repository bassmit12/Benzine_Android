// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EnterKilometerScreen from "./src/screens/EnterKilometerScreen";
import ShowKilometerScreen from "./src/screens/ShowKilometerScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import SettingsScreen from "./src/screens/SettingsScreen";
import PaymentScreen from "./src/screens/PaymentScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "EnterKilometer") {
              iconName = focused ? "enter" : "enter-outline";
            } else if (route.name === "ShowKilometer") {
              iconName = focused ? "ios-list-outline" : "ios-list-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Payment") {
              iconName = focused ? "card" : "card-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="EnterKilometer"
          component={EnterKilometerScreen}
          options={{ title: "Enter Kilometers" }}
        />
        <Tab.Screen
          name="ShowKilometer"
          component={ShowKilometerScreen}
          options={{ title: "Show Kilometers" }}
        />
        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ title: "Payment" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
