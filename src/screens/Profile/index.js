import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Constants from "expo-constants";

import Profil from "../../../assets/image/profile.png";
import Gambar from "../../../assets/image/bali.jpg";
import { COLORS } from "../../components/Colors/Colors";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { subscribeRoute } from "../../features/slice/routeSlice";

const Profile = () => {
  const bookingState = useSelector(state => state.booking)
  const profile = useSelector(state => state.profile)
  const route = useRoute();
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.image} source={Profil} />
          <View style={{ justifyContent: "center", width: 220 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            >
              {profile.firstName + " " + profile.lastName}
            </Text>
            <Text style={{ textAlign: "center" }}>{profile.email}</Text>
          </View>
        </View>
        <View style={styles.detail}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                paddingTop: 10,
                fontSize: 18,
              }}
            >
              Booking
            </Text>
            <Text
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                paddingTop: 10,
                fontSize: 18,
              }}
            >
              Reviews
            </Text>
            <Text
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                paddingTop: 10,
                fontSize: 18,
              }}
            >
              Favorite
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
              }}
            >
              {bookingState.hotel?.length ? bookingState.hotel?.length : 0}
            </Text>
            <Text
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
              }}
            >
              14
            </Text>
            <Text
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 10,
              }}
            >
              17
            </Text>
          </View>
        </View>
        {bookingState.hotel?.map((item, id) => {
          const resizedImg = item.main_photo_url.replace("square60", "square100")

          return (
            <View key={id} style={styles.card}>
              <Image style={styles.imageCard} source={{ uri: resizedImg }} />
              <View
                style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
              >
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item.hotel_name.split(' ').slice(0, 2).join(' ')}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingTop: 3,
                      paddingBottom: 3,
                    }}
                  >
                    <Text style={{ fontSize: 10 }}>{item.city_trans}, {item.address.country_trans}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <StarRatingDisplay
                      rating={item.review_score/2}
                      starSize={15}
                      style={{ width: 10 }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icon
                      name="currency-usd"
                      style={{
                        fontSize: 20,
                        paddingLeft: 10,
                      }}
                    />
                    <Text>{item.price_breakdown.all_inclusive_price}</Text>
                  </View>
                  <Text style={{ paddingLeft: 30, fontSize: 12 }}>Per/night</Text>
                </View>
              </View>
            </View>)
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight + 60,
    backgroundColor: COLORS.primary,
    padding: 20,
    margin: 20,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detail: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  imageCard: {
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 20,
    marginTop: 20,
    flexDirection: "row",
  },
});

export default Profile;
