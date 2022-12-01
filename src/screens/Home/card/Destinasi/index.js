import { View, StyleSheet } from "react-native";
import React from "react";
import Top from "./cardTop/index";
import Popular from "./cardPopular/index";

const Destinasi = () => {
  return (
    <View style={styles.destinasi}>
      <Top />
      <Popular />
    </View>
  );
};

const styles = StyleSheet.create({
  destinasi: {
    height: "auto",
    margin: 10,
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
    elevation: 4,
  },
});

export default Destinasi;
