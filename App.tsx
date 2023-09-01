import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { setNavigationRef } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { LocationProvider } from "./src/context/LocationContext";
import { TrackProvider } from "./src/context/TrackContext";


export type RootStackParamList = {
  ResolveAuth: undefined;
  loginFlow: undefined;
  mainFlow: undefined;
  Signup: undefined;
  Signin: undefined;
  TrackListFlow: undefined;
  TrackList: undefined;
  TrackDetail: { _id: string };
  TrackCreate: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer ref={(navigator: any) => setNavigationRef(navigator)}>
      <Stack.Navigator
        initialRouteName="ResolveAuth"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
        <Stack.Screen name="loginFlow" component={LoginFlow} />
        <Stack.Screen name="mainFlow" component={MainFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Rest of the components remain unchanged

const LoginFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
};

const MainFlow = () => {
  return (
    <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen
        name="TrackListFlow" // Make sure the name matches the screen defined in the nested navigator
        component={TrackListFlow}
      />

      <MaterialBottomTabs.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        
      />
      <MaterialBottomTabs.Screen name="Account" component={AccountScreen} />
    </MaterialBottomTabs.Navigator>
  );
};

const TrackListFlow = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <TrackProvider>
    <LocationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LocationProvider>
    </TrackProvider>
  );
};
