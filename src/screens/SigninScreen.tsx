import React, { useState ,useEffect} from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthContext } from "../context/AuthContext";
import { RootStackParamList } from "../../App";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

type SigninScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signin"
>;

type Props = {
  navigation: SigninScreenNavigationProp;
};


const SigninScreen: React.FC<Props> = ({ navigation }) => {
  const { actions, state } = useAuthContext();
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      actions.clearerrormessage();
    });
  
    return () => {
      focusListener();
    };
  }, []);
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Signin For Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Signin"
        onSubmit={actions.Signin}
      />
      <NavLink
        routename="Signup"
        text="Dont have an account ? Sign up Instead"
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SigninScreen;
