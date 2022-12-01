import React, { useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StarRatingDisplay } from "react-native-star-rating-widget";

import { addToWishlist } from '../../features/slice/wishlistSlice';
import Heart from '../Animated/Heart';
import { COLORS } from '../Colors/Colors';

export default function Card(props) {
    const wishlist = useSelector((state) => state.wishlist.list)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const resizedImg = props.data.main_photo_url.replace("square60", "square500")

    // mengecek wishlist
    const checkIconState = () => wishlist.some((item) => item.id === props.data.id)

    // handle update state wishlist
    const handleLike = (item) => {
        dispatch(addToWishlist(item))
    }

    return (
        <View style={styles.card} key={props.data.hotel_id}>
            <TouchableOpacity onPress={() => navigation.navigate("Detail", { item: props.data })}>
                <Image style={styles.image} source={{ uri: resizedImg }} />
            </TouchableOpacity>
            <Heart isLiked={checkIconState()} handler={handleLike} data={props.data} />
            <View style={{ flex: 1, padding: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Detail", { item: props.data })}>
                    <Text style={{ fontSize: 20, paddingHorizontal: 2, color: "black" }}>{props.data.hotel_name}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", paddingVertical: 3 }}>
                    <View style={{ justifyContent: "space-between" }}>
                        <StarRatingDisplay
                            rating={props.data.review_score / 2}
                            starSize={15}
                            color={COLORS.star}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <Icon
                                name="map-marker-radius"
                                style={{
                                    fontSize: 20,
                                    marginRight: 4
                                }}
                            />
                            <Text style={{ fontSize: 14, color: "black" }}>{props.data.city_trans}, {props.data.country_trans}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Icon
                                    name="currency-usd"
                                    style={{
                                        fontSize: 28,
                                    }}
                                />
                                <Text style={{ fontSize: 20, color: COLORS.secondary }}>{props.data.price_breakdown.all_inclusive_price}</Text>
                            </View>
                            <Text style={{ paddingLeft: 35 }}>Per/night</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // margin: 15,
    },
    image: {
        flex: 1,
        borderRadius: 10,
        width: "100%",
        height: 200,
    },
    card: {
        marginHorizontal: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginTop: 20,
    },
});
