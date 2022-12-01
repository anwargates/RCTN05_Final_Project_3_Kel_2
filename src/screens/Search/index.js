import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import SearchCard from "../../components/Card/SearchCard";
import { COLORS } from "../../components/Colors/Colors";
import Card from "../../components/Card/ResultCard";
import { subscribeRoute } from "../../features/slice/routeSlice";

const Search = () => {
  const hotels = useSelector((state) => state.hotels.entities)
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
        data={hotels}
        renderItem={({ item }) => {
          return <Card data={item} />
        }}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <SearchCard />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight + 50,
    backgroundColor: COLORS.base,
    flex: 1,
  },
});

export default Search;
