import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { subscribeRoute } from "../../features/slice/routeSlice";
import Destinasi from "./card/Destinasi/index";
import Search from "../../components/Card/SearchCard";

const Home = () => {
  const route = useRoute();
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )

  return (
    <ScrollView style={styles.container}>
      <Search />
      <Destinasi />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight + 50,
    // marginBottom: 10,
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
});

export default Home;
