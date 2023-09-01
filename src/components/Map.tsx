import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { useLocationContext } from "../context/LocationContext";

type Props = {};

const Map: React.FC<Props> = () => {
  const { state } = useLocationContext();

  if (!state.currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <>
      <Text>map</Text>
      <MapView
        initialRegion={{
          ...state.currentLocation?.coords,

          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        
        style={styles.map}
      >
        <Circle center={state.currentLocation?.coords}
        radius={30} strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
        />
        <Polyline coordinates={state.locations.map(loc=>loc.coords)}/>
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
