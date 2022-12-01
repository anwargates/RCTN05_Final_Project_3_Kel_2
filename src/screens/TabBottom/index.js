import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { COLORS } from "../../components/Colors/Colors";

const Tab = () => {
  const navigation = useNavigation();
  const auth = useSelector(state => state.auth)
  const routeState = useSelector(state => state.route.route)
  console.log("routestate", routeState)


  return (
    routeState !== "Detail" ?
      <View
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.button}
          >
            <Icon name="magnify" style={{
              ...styles.button.icon,
              color: routeState === "Search" ? "white" : "black",
              backgroundColor: routeState === "Search" ? COLORS.secondary : "white"
            }} />
            <Text style={styles.judul}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorite")}
            style={styles.button}
          >
            <Icon
              name="heart-outline"
              style={{
                ...styles.button.icon,
                color: routeState === "Favorite" ? "white" : "black",
                backgroundColor: routeState === "Favorite" ? COLORS.secondary : "white"
              }}
            />
            <Text style={styles.judul}>Favorite</Text>
          </TouchableOpacity>
          {
            !auth.isLoginSuccess && <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Icon name="login" style={{
                ...styles.button.icon,
                color: routeState === "Login" ? "white" : "black",
                backgroundColor: routeState === "Login" ? COLORS.secondary : "white"
              }} />
              <Text style={styles.judul}>Login</Text>
            </TouchableOpacity>
          }
          {auth.isLoginSuccess && <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.button}
            >
              <Icon name="account" style={{
                ...styles.button.icon,
                color: routeState === "Profile" ? "white" : "black",
                backgroundColor: routeState === "Profile" ? COLORS.secondary : "white"
              }} />
              <Text style={styles.judul}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Setting")}
              style={styles.button}
            >
              <Icon name="cog" style={{
                ...styles.button.icon,
                color: routeState === "Setting" ? "white" : "black",
                backgroundColor: routeState === "Setting" ? COLORS.secondary : "white"
              }} />
              <Text style={styles.judul}>Setting</Text>
            </TouchableOpacity>
          </>}
          <TouchableOpacity
            onPress={() => navigation.navigate("About")}
            style={styles.button}
          >
            <Icon
              name="account-box-multiple-outline"
              style={{
                ...styles.button.icon,
                color: routeState === "About" ? "white" : "black",
                backgroundColor: routeState === "About" ? COLORS.secondary : "white"
              }}
            />
            <Text style={styles.judul}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
      :
      <></>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 15,
    icon: {
      fontSize: 25,
      textAlign: "center",
      borderRadius: 100,
      padding: 2
      // color: COLORS.third
    },
  },
  judul: {
    textAlign: "center",
    // color: COLORS.primary
  },
});

export default Tab;
