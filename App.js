import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import Tab from "./src/screens/TabBottom/index";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light"/>
        <Router />
        <Tab />
      </NavigationContainer>
    </Provider>
  );
}
