import React from "react";
import { useTrackContext } from "../context/TrackContext";
import { useLocationContext } from "../context/LocationContext";
import { navigate } from "../navigationRef";
import { RootStackParamList } from "../../App";
export default  () => {
  const location = useLocationContext();
  const track = useTrackContext();

  const saveTrack = async() => {
    await track.actions.createTrack(location.state.name, location.state.locations);
    location.actions.reset();
    navigate('TrackList')


  };
  return [saveTrack];
};

