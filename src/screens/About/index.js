import React, { useCallback, useEffect } from "react";
import Constants from "expo-constants";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { COLORS } from "../../components/Colors/Colors";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { subscribeRoute } from "../../features/slice/routeSlice";
import Anwar from "../../../assets/image/anwar.jpeg";
import Arisfi from "../../../assets/image/arisfi.jpeg";
import Ipul from "../../../assets/image/ipul.png";


const Profile = ({ pic,nama, kode }) => {
  const route = useRoute();
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: "center" }}>
        {/* <Icon name="person-circle-outline" style={{ fontSize: 150 }} /> */}
        <Image source={pic} style={styles.profile} />
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text>
          {nama}
        </Text>
      </View>
      <View style={{ alignSelf: "center" }} >
        <Text>
          {kode}
        </Text>
      </View>
    </View>
  )
}


const About = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.heading}>
          KELOMPOK 2
        </Text>
      </View>
      <View style={{
        flex: 2, borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}>
        <Image style={styles.image} source={{ uri: "https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2020/01/15094433/hacktiv8-1.png" }} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.one}>
          <Profile pic={Anwar} nama="M. Anwar Firdaus" kode="RCTN-KS05-010" />
        </View>
        <View style={styles.two}>
          <Profile pic={Arisfi} nama="Arizfi Agustina" kode="RCTN-KS05-007" />
          <Profile pic={Ipul} nama="Ahmad Saifullah" kode="RCTN-KS05-008" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.base
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center"
  },
  bottom: {
    flex: 4,
    width: "100%",
  },
  one: {
    flex: 1,
    width: "100%",
    alignContent: "center",
  },
  two: {
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  profile: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    margin: 10,
  },
});

export default About;
