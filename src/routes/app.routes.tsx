import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Register, Dashboard, Resume } from "../screens";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
        name="Listagem"
        component={Dashboard}
      />
      <Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color={color} size={size} />
          ),
        }}
        name="Cadastrar"
        component={Register}
      />
      <Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pie-chart" color={color} size={size} />
          ),
        }}
        name="Resumo"
        component={Resume}
      />
    </Navigator>
  );
}
