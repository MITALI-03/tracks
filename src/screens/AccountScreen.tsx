import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { useAuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView from react-native-safe-area-context

const AccountScreen = () => {
  const { actions, state } = useAuthContext();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View>
        <Text style={{ fontSize: 30 }}>Account Screen</Text>
        <Spacer>
          <Button title="Sign Out" onPress={actions.Signout} />
        </Spacer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;
