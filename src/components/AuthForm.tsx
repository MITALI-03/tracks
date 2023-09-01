import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import Spacer from "./Spacer";
import { Text, Input, Button } from "react-native-elements";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup" | "Signin"
>;

type Props = {
  onSubmit: (email: string, password: string) => void;
  headerText:string;
  errorMessage:string;
  submitButtonText:string

};

const AuthForm: React.FC<Props> = ({ onSubmit, headerText,errorMessage,submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
   
      <>
        <Spacer>
          <Text h3>{headerText}</Text>
        </Spacer>
        <Input label="Email" value={email} onChangeText={setEmail} />
        <Input
          secureTextEntry={true}
          label="Password"
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <Spacer>
          <Button
            title={submitButtonText}
            onPress={() => onSubmit(email, password)}
          />
        </Spacer>
      
    </>
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
export default AuthForm;
