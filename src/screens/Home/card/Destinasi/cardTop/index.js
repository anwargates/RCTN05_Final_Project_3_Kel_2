import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Bali from "../../../../../../assets/image/bali.jpg";
import Paris from "../../../../../../assets/image/paris.jpg";
import Swiss from "../../../../../../assets/image/swiss.jpg";
import London from "../../../../../../assets/image/london.jpg";
import Rome from "../../../../../../assets/image/rome.jpg";
import { useDispatch } from "react-redux";
import { fetchHotels } from "../../../../../features/slice/hotelSlice";

const topDestinations = [
  {
    name: "Bali",
    pic: Bali
  },
  {
    name: "Paris",
    pic: Paris
  },
  {
    name: "Swiss",
    pic: Swiss
  },
  {
    name: "London",
    pic: London
  },
  {
    name: "Rome",
    pic: Rome
  },
]

const Top = () => {
  const dispatch = useDispatch()

  return (
    <View>
      <Text style={styles.title}>TOP DESTINATION</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {topDestinations.map((item) => {
          return <View key={item.name} style={styles.card}>
            <TouchableOpacity onPress={(() =>
              dispatch(fetchHotels({ location: item.name }))
            )}>
              <Image style={styles.image} source={item.pic} />
            </TouchableOpacity>
            <Text style={styles.judul}>{item.name}</Text>
          </View>
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  card: {
    margin: 5,
  },
  judul: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    alignItems: "center",
    top: 90,
    left: 5,
    right: 5,
  },
});

export default Top;
