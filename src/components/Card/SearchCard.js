import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { useDispatch } from "react-redux";

import { fetchHotels } from "../../features/slice/hotelSlice";

const Home = () => {
  const today = new Date()
  const [location, setLocation] = useState("");
  const [guest, setGuest] = useState(1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const dispatch = useDispatch()

  const onChangeStart = (event, selectedDate) => {
    setStartDate(selectedDate)
    setShowStart(false);
  };
  const onChangeEnd = (event, selectedDate) => {
    setEndDate(selectedDate)
    setShowEnd(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchHotels({ location, startDate: Moment(startDate).format('YYYY-MM-DD'), endDate: Moment(endDate).format('YYYY-MM-DD'), guest }))
  }

  useEffect(() => {
    console.log("startdate", startDate)
    console.log("enddate", endDate)
    console.log("guest", guest)
    console.log("location", location)
  }, [startDate, endDate, guest, location])



  return (
    <View style={styles.search}>
      <View style={styles.input}>
        <Icon name="magnify" style={{ fontSize: 25, paddingRight: 10 }} />
        <TextInput style={{ flex: 1 }} value={location} onChangeText={text => setLocation(text)} placeholder="Where do you want to go?" />
      </View>
      <View style={styles.date}>
        <TouchableOpacity
          style={styles.inputdate}
          onPress={() => { setShowStart(true) }}
        >
          <Icon
            name="calendar-month"
            style={{ fontSize: 25, paddingHorizontal: 5 }}
          />
          <TextInput style={{ flex: 1 }} editable={false} value={Moment(startDate).format('YYYY-MM-DD')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputdate}
          onPress={() => { setShowEnd(true) }}
        >
          <Icon
            name="calendar-month"
            style={{ fontSize: 25, paddingHorizontal: 5 }}
          />
          <TextInput style={{ flex: 1 }} editable={false} value={Moment(endDate).format('YYYY-MM-DD')} />
        </TouchableOpacity>
      </View>
      {showStart && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          onChange={onChangeStart}
        />
      )}
      {showEnd && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode="date"
          onChange={onChangeEnd}
        />
      )}
      <View style={styles.input}>
        <Icon name="account" style={{ fontSize: 25, paddingRight: 10 }} />
        <TextInput style={{ flex: 1 }} keyboardType="numeric" value={guest} onChangeText={text => setGuest(text)} placeholder="Guest?" />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
      >
        <Text
          style={{
            backgroundColor: "#2ab7ca",
            paddingVertical: 10,
            borderRadius: 20,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    height: "auto",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 16,
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
    elevation: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    flexDirection: "row",
    paddingLeft: 5,
  },
  inputdate: {
    height: 40,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    flexDirection: "row",
    width: "45%",
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    paddingTop: 20,
  },
});

export default Home;
