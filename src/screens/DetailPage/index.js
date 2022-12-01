import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Profile from "../../../assets/image/profile.png";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from "rn-placeholder";
import Constants from "expo-constants";

import { COLORS } from "../../components/Colors/Colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../features/slice/hotelDetailSlice";
import { subscribeRoute } from "../../features/slice/routeSlice";
import { ICONS } from "../../components/Icons/Icon";

const DetailPage = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const details = useSelector(state => state.hotelDetail.details)
  const photos = useSelector(state => state.hotelDetail.photos)
  const prefixUrl = useSelector(state => state.hotelDetail.prefixUrl)
  const reviews = useSelector(state => state.hotelDetail.reviews)
  const [isLoading, setIsLoading] = useState(true)
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
      dispatch(fetchDetails({ id: route.params.item.hotel_id, searchID: route.params.searchID }))
    }, [])
  )

  return (
    <View style={styles.container}>
      <ScrollView>
        <View >
          <View>
            <FlatList
              data={photos}
              style={{ flex: 1 }}
              renderItem={({ item }) => (<Image
                source={{ uri: prefixUrl + item[4] }}
                style={{ width: windowWidth, height: 300 }}
                resizeMode="cover"
              ></Image>)}
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <View
              style={{ paddingLeft: 20, position: "absolute", bottom: 10, }}
            >
              <Text style={{
                textShadowColor: 'rgba(0, 0, 0, 0.85)',
                textShadowOffset: { width: -2, height: 1 },
                textShadowRadius: 15, fontSize: 22, color: "#ffffff", fontWeight: "bold"
              }}>
                {details.hotel_name}
                {/* {console.log(route.params)} */}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 3,
                  paddingBottom: 3,
                }}
              >
                <Text style={{
                  color: "#ffffff", textShadowColor: 'rgba(0, 0, 0, 0.85)',
                  textShadowOffset: { width: -2, height: 1 },
                  textShadowRadius: 15,
                }}>{details.city || details.city_trans}, {details.country_trans}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <StarRatingDisplay
                  rating={route.params.item.review_score / 2}
                  color={COLORS.star}
                  starSize={15}
                />
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 30, paddingTop: 30, paddingRight: 30 }}>
            <Text style={{ fontSize: 20, paddingBottom: 10, fontWeight: "bold" }}>
              About
            </Text>
            <Text>
              {details.address}.
              {details.hotel_text?.important_information?.substring(0, 500)}...
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae nisi vitae mi condimentum congue nec a est. Vestibulum bibendum mollis tortor quis fringilla. Cras augue lacus, viverra quis malesuada et, pharetra ut turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae */}
            </Text>
            <TouchableOpacity style={{ alignItems: "flex-end", margin: 15 }}>
              <Text
                style={{
                  color: "#ffffff",
                  padding: 10,
                  backgroundColor: "#000000",
                  width: 100,
                  textAlign: "center",
                  borderRadius: 10,
                }}
              >
                Read More
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={{ paddingLeft: 30, fontSize: 20, paddingBottom: 10, fontWeight: "bold" }}>
              Facilities
            </Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {details.facilities_block?.facilities?.map((facility, id) => (
                <View
                  key={id}
                  style={styles.smallCard}
                >
                  <Icon
                    name={ICONS.find(i => facility.icon === i.ori)?.sub ? ICONS.find(i => facility.icon === i.ori).sub : facility.icon}
                    style={{ fontSize: 35, textAlign: "center", paddingBottom: 8 }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {facility.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={{ paddingLeft: 30, fontSize: 20, paddingBottom: 10, fontWeight: "bold" }}>
              Review
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {reviews.map((review, id) => (
                <View key={id} style={{ flexDirection: "row", margin: 8 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={Profile}
                  />
                  <View
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: 10,
                      marginLeft: 10,
                      width: 250,
                      padding: 10,
                      shadowColor: "#000000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.23,
                      shadowRadius: 2.62,

                      elevation: 4,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "400" }}>{review.author.name ? review.author.name : "Anonymous"}</Text>
                    <Text>
                      "{review.pros.substring(0, 150)}..."
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Book", { item: route.params.item })}
      >
        <Text
          style={styles.button.text}
        >
          Book This Hotel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingBottom: 64
  },
  smallCard: {
    padding: 8,
    backgroundColor: "#ffffff",
    alignContent: "center",
    justifyContent: "center",
    width: 100,
    // height: 100,
    borderRadius: 5,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: "100%",
    height: 300,
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
    position: "absolute",
    right: 8,
    left: 8,
    bottom: 16,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 10,
    text: {
      color: "#ffffff",
      textAlign: "center",
    }
  }
});

export default DetailPage;
