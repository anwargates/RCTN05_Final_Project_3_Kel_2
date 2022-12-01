import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import { subscribeRoute } from "../../features/slice/routeSlice";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import Card from "../../components/Card/ResultCard";

const Favorite = () => {
  const wishlist = useSelector(state => state.wishlist.list)
  const route = useRoute();
  const dispatch = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={({ item }) => {
          return <Card data={item} />
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 15,
    flex: 1,
    // marginTop: Constants.statusBarHeight + 50,
  },
});

export default Favorite;
