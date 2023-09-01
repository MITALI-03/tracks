import React,{useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { useAuthContext } from "../context/AuthContext";

const ResolveAuthScreen=()=>{
    const { actions, state } = useAuthContext();
    useEffect(()=>{
        actions.tryLocalSignin();
    
      },[])
    return null;
}

const styles = StyleSheet.create({
   
  });
export default ResolveAuthScreen;