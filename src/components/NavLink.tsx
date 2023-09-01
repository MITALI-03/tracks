import React, { ReactNode, useState } from "react";
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import Spacer from "./Spacer";
import { Input, Button } from "react-native-elements";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Signup" | "Signin"
>;

type Props = {
  navigation: AuthFormNavigationProp;
  text:string;
  routename:keyof RootStackParamList
};

const NavLink: React.FC<Props> = ({ navigation ,text,routename}) => {
  return (
   
      <>
        <TouchableOpacity onPress={() => navigation.navigate(routename)}>
        <Spacer>
          <Text style={styles.text}>
           {text}
          </Text>
        </Spacer>
      </TouchableOpacity> 
      
    </>
  );
};

const styles = StyleSheet.create({
    text: {
        color: "blue",
      },
  
});
export default NavLink;
