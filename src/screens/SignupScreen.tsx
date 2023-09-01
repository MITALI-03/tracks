import React, { useEffect } from "react";
import { StyleSheet, View} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuthContext } from "../context/AuthContext";
import { RootStackParamList } from "../../App";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup"
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
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
        headerText="Signup For Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Signup"
        onSubmit={actions.Signup}
      />
      <NavLink
        routename="Signin"
        text="Already have an account ? Sign in Instead"
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
  error: {
    fontSize: 16,
    color: "red",
    margin: 5,
  },
  text: {
    color: "blue",
  },
});

export default SignupScreen;
