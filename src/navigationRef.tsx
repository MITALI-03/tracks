import { NavigationContainerRef } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Import the required type from the 'react-navigation-stack'
import { RootStackParamList } from '../App';


let navigationRef: NavigationContainerRef<RootStackParamList> | null = null; // Provide the ParamList type argument

export const setNavigationRef = (
  ref: NavigationContainerRef<RootStackParamList> | null
) => {
  navigationRef = ref;
};

export const navigate = (routeName: keyof RootStackParamList, params?: any) => {
  if (navigationRef) {
    navigationRef.navigate(routeName, params);
  }
};
