import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import Spacer from "./Spacer";
import { useLocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

type AuthFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup" | "Signin"
>;

type Props = {};

const TrackForm: React.FC<Props> = ({}) => {
  const { actions, state } = useLocationContext();
  const [email, setEmail] = useState("");
  const [saveTrack]=useSaveTrack()
  
  return <>
  <Spacer>
  <Input value={state.name} onChangeText={actions.changeName}  placeholder="Enter Name"/>
  </Spacer>
<Spacer>
  {state.recording?<Button title="Stop" onPress={actions.stopRecording}/>:
  <Button title="Start Recording" onPress={actions.startRecording}/>}
  </Spacer>
  <Spacer>
{
  !state.recording && state.locations.length
  ?(<Button title="Save Recording" onPress={saveTrack}/>):null

}</Spacer>

  </>
};

const styles = StyleSheet.create({});
export default TrackForm;
