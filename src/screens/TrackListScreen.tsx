import React ,{useEffect}from "react";
import { StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItem} from "react-native-elements";
import { RootStackParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTrackContext } from "../context/TrackContext";

type TrackListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TrackList","trackListFlow"
>;

type Props = {
  navigation: TrackListScreenNavigationProp;
};


const TrackListScreen: React.FC<Props> = ({ navigation }) => {
  const { actions, state } = useTrackContext();
  console.log(state.tracks)
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      actions.fetchTracks();
    });
  
    return () => {
      focusListener();
    };
  }, []);
  return (
    
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Text style={{fontSize:30}}>Tracks</Text>
      <FlatList
        data={state.tracks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={()=>navigation.navigate('TrackDetail',{_id: item._id})}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   
  });
export default TrackListScreen;