import React, { createContext, useContext, useReducer, ReactNode } from "react";
import tracker from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";


interface AuthContextState {
  token: null;
  errorMessage: ""; // Correct the property name to 'isSignedIn'
}

interface AuthContextActions {
  Signup: (email: string, password: string) => Promise<void>;
  Signin: (email: string, password: string) => Promise<void>;
  clearerrormessage: () => void; 
  tryLocalSignin:()=>Promise<void>
  Signout:()=>Promise<void>// Add return type
}

type Action = { type: string; payload?: any };

const initialState: AuthContextState = {
  token: null,
  errorMessage: "", // Correct the property name to 'isSignedIn'
};

const AuthContext = createContext<{
  state: AuthContextState;
  actions: AuthContextActions;
}>({
  state: initialState,
  actions: {
    Signup: () => Promise.resolve(),
    Signin: () => Promise.resolve(),
    clearerrormessage: () => {},
    tryLocalSignin:()=>Promise.resolve(),
    Signout:()=>Promise.resolve() // Add a default implementation for Signup
  },
});

const AuthReducer = (
  state: AuthContextState,
  action: Action
): AuthContextState => {
  switch (action.type) {
    case "add_err":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_meassage":
      return { ...state, errorMessage: "" };
    case "signout":
      return {token:null,errorMessage:'' };
    default:
      return state;
  }
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const actions: AuthContextActions = {
    Signup: async (email, password) => {
      try {
        const response = await tracker.post("/signup", { email, password });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signin", payload: response.data.token });
        navigate("mainFlow");
      } catch (err: any) {
        dispatch({
          type: "add_err",
          payload: "something went wrong with signup",
        });
      }
    },
    Signin: async (email, password) => {
      try {
        const response = await tracker.post("/signin", { email, password });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "signin", payload: response.data.token });
        navigate("mainFlow");
      } catch (err: any) {
        dispatch({
          type: "add_err",
          payload: "something went wrong with signin",
        });
        console.log(err.response.data);
      }
    },
    clearerrormessage: () => {
      dispatch({ type: "clear_error_meassage" });
    },
    tryLocalSignin: async () => {
        const token=await AsyncStorage.getItem('token')
        if(token){
        dispatch({ type: "signin", payload: token});
        navigate("mainFlow");
      } else{
        navigate("loginFlow")
      }
    },
    Signout: async () => {
      await AsyncStorage.removeItem('token')
      dispatch({ type: "signout"});
      navigate("loginFlow");
    } 
  ,
  };

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
