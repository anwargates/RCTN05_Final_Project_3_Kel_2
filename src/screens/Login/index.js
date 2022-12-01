import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../features/slice/authSlice";
import { COLORS } from "../../components/Colors/Colors";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { subscribeRoute } from "../../features/slice/routeSlice";
import Logo from "../../../assets/image/Logo-cropped.png";

const Login = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      dispatch(subscribeRoute(route.name))
    }, [])
  )

  useEffect(() => {
    dispatch(subscribeRoute(route.name))
  }, [])

  useEffect(() => {
    if (auth.isLoginSuccess) {
      ToastAndroid.show("Login Berhasil", ToastAndroid.SHORT)
      // navigation.navigate("Home")
      navigation.goBack()
    }
    if (auth.isLoginRejected) ToastAndroid.show(auth.errorMessage, ToastAndroid.SHORT)
  }, [auth])

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Image
          source={Logo}
          style={{ height: 250, width: 250, alignSelf: "center" }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            width: 200,
            alignSelf: "center",
            textAlignVertical: "center",
            textAlign: "center"
          }}
        >
          BOOKING APPS
        </Text>
      </View>
      <View style={styles.header}>
        <View style={styles.input}>
          <Icon name="email" style={{ fontSize: 25, paddingRight: 10 }} />
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(email) => onChangeEmail(email)}
            placeholder="email"
          />
        </View>
        <View style={styles.input}>
          <Icon name="lock" style={{ fontSize: 25, paddingRight: 10 }} />
          <TextInput
            style={{ flex: 1 }}
            onChangeText={(password) => onChangePassword(password)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(authLogin({ email, password }))}
        >
          <Text
            style={{
              backgroundColor: COLORS.secondary,
              paddingVertical: 10,
              borderRadius: 20,
              textAlign: "center",
              color: "#fff",
            }}
          >
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: Constants.statusBarHeight + 80,
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    flexDirection: "row",
  },
  button: {
    marginRight: 12,
    marginLeft: 12,
    marginTop: 20,
  },
  forgot: {
    marginTop: 15,
    textAlign: "center",
  },
});

export default Login;
