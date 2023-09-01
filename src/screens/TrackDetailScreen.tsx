import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTrackContext } from "../context/TrackContext";
import MapView ,{Polyline}from "react-native-maps";
type TrackDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TrackDetail"
>;
type TrackDetailScreenRouteProp = RouteProp<RootStackParamList, 'TrackDetail'>;
type Props = {
  route: TrackDetailScreenRouteProp;
  navigation: TrackDetailScreenNavigationProp;
};

const TrackDetailScreen: React.FC<Props> = ({ navigation ,route}) => {
  const _id= route.params._id
  const { actions, state } = useTrackContext();
  const track=state.tracks.find(track=>track._id===_id)
  const initialCoords=track?.locations[0]?.coords

    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {track ? (
        <>
          <Text style={{ fontSize: 30 }}>{track.name}</Text>
          <MapView
          initialRegion={{
            longitudeDelta:0.01,
            latitudeDelta:0.01,
            latitude: initialCoords?.latitude ?? 0,
              longitude: initialCoords?.longitude ?? 0,
          }}
          style={styles.map}
          >
            <Polyline coordinates={track.locations.map(loc => loc.coords)} />
          </MapView>
        </>
      ) : (
        <Text>No track found with the provided ID</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map:{
    height:300
  }
   
  });
export default TrackDetailScreen;