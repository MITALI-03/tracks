import React, { useCallback} from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import {requestForegroundPermissionsAsync,watchPositionAsync,Accuracy,} from "expo-location";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useLocationContext } from "../context/LocationContext";
import '../_mockLocations'
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";


type TrackCreateScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TrackCreate"
>;

type Props = {
  navigation: TrackCreateScreenNavigationProp;
};

const TrackCreateScreen: React.FC<Props> = ({ navigation }) => {
  const { actions, state } = useLocationContext();
  const callback=useCallback ((location:any)=>{actions.addLocation(location,state.recording)},[state.recording])
  const [err] = useLocation(callback);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Text style={{ fontSize: 30 }}>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default TrackCreateScreen;
