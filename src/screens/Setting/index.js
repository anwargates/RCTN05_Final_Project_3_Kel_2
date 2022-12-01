import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/slice/authSlice";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../components/Colors/Colors";
import Constants from "expo-constants";
import { subscribeRoute } from "../../features/slice/routeSlice";

const Setting = () => {
  const auth = useSelector(state => state.auth)
  const route = useRoute()
  const navigate = useNavigation()
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )

  useEffect(() => {
    if (!auth.isLoginSuccess) navigate.navigate("Home")
  }, [auth])


  return (
    <ScrollView style={{
      flex: 1,
      // paddingTop: Constants.statusBarHeight + 60,
    }}>
      <View style={styles.card}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>MY ACCOUNT</Text>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>First Name</Text>
          </View>
          <View>
            <Text>AHMAD</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Last Name</Text>
          </View>
          <View>
            <Text>SAIFULLAH</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Email</Text>
          </View>
          <View>
            <Text>ahmadsaipullah140@gmail.com</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Gender</Text>
          </View>
          <View>
            <Text>Pria</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Language</Text>
          </View>
          <View>
            <Text>Indonesia</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Search History</Text>
          </View>
          <View>
            <Text>=</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Report A Problem</Text>
          </View>
          <View>
            <Text>=</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>MY ACCOUNT</Text>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Terms & policy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 20,
            paddingBottom: 10,
          }}
          onPress={() => dispatch(logout())}
        >
          <Text style={{ fontSize: 18, }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 6,
  },
});

export default Setting;
