import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login/index";
import Home from "../screens/Home/index";
import Setting from "../screens/Setting/index";
import Search from "../screens/Search/index";
import Favorite from "../screens/Favorite/index";
import Profile from "../screens/Profile/index";
import About from "../screens/About/index";
import Detail from "../screens/DetailPage";
import Book from "../screens/BookNow/index";
import { COLORS } from "../components/Colors/Colors";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerTransparent: true,
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: COLORS.secondary
        }
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ title: "Setting" }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search Results" }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ title: "Favorite" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ title: "About" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail Hotel",
          headerTransparent: true,
          headerTitleStyle: {
            textShadowColor: '#000000',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 6,
            elevation: 6,
          }
        }}
      />
      <Stack.Screen
        name="Book"
        component={Book}
        options={{ title: "Book Now" }}
      />
    </Stack.Navigator>
  );
};

export default Router;
