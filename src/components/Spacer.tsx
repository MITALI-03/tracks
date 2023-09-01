import React , { ReactNode } from "react";
import { StyleSheet, Text, View } from 'react-native';


interface SpacerProps {
    children: ReactNode;
  }
  
  const Spacer: React.FC<SpacerProps> = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>;
  };
    

const styles = StyleSheet.create({
    spacer:{
        margin:15
    }
   
  });
export default Spacer;