import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { booking } from "../../features/slice/bookingSlice";
import Constants from "expo-constants";
import { COLORS } from "../../components/Colors/Colors";

const Book = ({ route }) => {
  const auth = useSelector(state => state.auth)
  const profile = useSelector(state => state.profile)
  const bookingState = useSelector(state => state.booking)
  const [name, setName] = useState(profile.firstName + " " + profile.lastName)
  const [email, setEmail] = useState(profile.email)
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber)
  const navigate = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.isLoginSuccess) navigate.navigate("Login")
  }, [auth])


  return (
    <>
      <View style={styles.search}>
        <Text style={{ fontWeight: "bold" }}>CONTACT INFORMATION</Text>
        <View style={styles.input}>
          <TextInput style={{ flex: 1 }} value={name} onChangeText={name => setName(name)} placeholder="Nama Lengkap" />
        </View>
        <View style={styles.input}>
          <TextInput style={{ flex: 1 }} value={email} onChangeText={email => setEmail(email)} placeholder="Email" />
        </View>
        <View style={styles.date}>
          <View style={styles.inputdate1}>
            <TextInput value="+62" placeholder="62+" />
          </View>
          <View style={styles.inputdate}>
            <TextInput style={{ flex: 1 }} value={phoneNumber} onChangeText={phoneNumber => setPhoneNumber(phoneNumber)} placeholder="Nomor Handphone" />
          </View>
        </View>
      </View>
      <View style={styles.priceSummary}>
        <Text style={{ fontWeight: "bold" }}>PRICE SUMMARY</Text>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Total</Text>
          </View>
          <View>
            <Text>$ {route.params.item.price_breakdown.all_inclusive_price}</Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
          }}
        >
          <View>
            <Text>Payable</Text>
          </View>
          <View>
            <Text>$ {route.params.item.price_breakdown.all_inclusive_price}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // console.log("PARAMS BEFORE DISPATCH",route.params.item)
          dispatch(booking(route.params.item))
          // console.log("BOOKING STATE",bookingState.hotel)
          ToastAndroid.show("Proses Booking Selesai", ToastAndroid.SHORT)
          navigate.navigate("Profile")
        }
        }
      >
        <Text
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: 10,
            borderRadius: 20,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    height: "auto",
    marginHorizontal: 20,
    marginTop: 20,
  },
  priceSummary: {
    height: "auto",
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 8,
  },
  input: {
    height: 40,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20,
  },
  inputdate1: {
    flex: 1,
    marginRight: 5,
    backgroundColor: COLORS.primary,
    height: 40,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    width: 50,
  },
  inputdate: {
    flex: 5,
    backgroundColor: COLORS.primary,
    height: 40,
    padding: 8,
    borderRadius: 5,
    flexDirection: "row",
    width: 220,
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    width: "100%",
    paddingTop: 20,
    position: "absolute",
    bottom: 16,
    paddingHorizontal: 16
  },
});

export default Book;
