import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CoursesDashboardScreen from "../screens/CoursesDashboardScreen";
import InsideCourseScreen from "../screens/InsideCourseScreen";
import CreateCourseScreen from "../screens/CreateCourseScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id={undefined}
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="CoursesDashboardScreen"
          component={CoursesDashboardScreen}
        />
        <Stack.Screen name="InsideCourseScreen" component={InsideCourseScreen} />
        <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
