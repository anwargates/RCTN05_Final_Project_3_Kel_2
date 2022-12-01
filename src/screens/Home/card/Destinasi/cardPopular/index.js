import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Popular = () => {
  const navigation = useNavigation();
  const popularResults = useSelector(state => state.hotels.entities)
  const searchID = useSelector(state => state.hotels.searchID)

  return (
    <View>
      <Text style={styles.title}>POPULER DESTINATION</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        {/* {console.log("popular results", popularResults)} */}
        {popularResults?.slice(0, 5).map((item) => {
          const resizedImg = item.main_photo_url.replace("square60", "square200")
          return <View key={item.hotel_id} style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("Detail", { item, searchID })}>
              <Image style={styles.image} source={{ uri: resizedImg }} />
            </TouchableOpacity>
            <Text style={styles.judul}>{item.hotel_name}</Text>
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

export default Popular;
