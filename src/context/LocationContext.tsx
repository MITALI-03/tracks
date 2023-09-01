import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface LocationContextState {
  recording: boolean;
  locations: location[];
  currentLocation: location | null;
  name:string
}
type location = {
  coords: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

interface LocationContextActions {
  startRecording: () => void;
  stopRecording: () => void;
  addLocation: (location: any,recording:boolean) => Promise<void>;
  changeName: (name:string) => Promise<void>;
  reset: () => void;
}

type Action = { type: string; payload?: any };

const initialState: LocationContextState = {
  recording: false,
  locations: [],
  currentLocation: null,
  name:' '
};

const LocationContext = createContext<{
  state: LocationContextState;
  actions: LocationContextActions;
}>({
  state: initialState,
  actions: {
    startRecording: () => {},
    stopRecording: () => {},
    addLocation: () => Promise.resolve(),
    changeName: () => Promise.resolve(),
    reset: () => {},
  },
});

const LocationReducer = (
  state: LocationContextState,
  action: Action
): LocationContextState => {
  switch (action.type) {
    case "add_current_location":
      return {
        ...state,
        currentLocation: action.payload,
      };
      case "start_recording":
        return {...state,recording:true};
      case "stop_recording":
        return {...state,recording:false};
      case "add_location":
        return {...state,locations:[...state.locations,action.payload]};
      case "change_name":
        return {...state,name:action.payload};
      case "reset":
        return {...state,name:'',locations:[]};
    
    default:
      return state;
  }
};

const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(LocationReducer, initialState);

  const actions: LocationContextActions = {
    startRecording: async () => {
      dispatch({type:'start_recording'});
    },
    stopRecording: async () => {
      dispatch({type:'stop_recording'});
    },
    addLocation: async (location,recording) => {
      dispatch({ type: "add_current_location", payload: location });
      if(recording){
        dispatch({ type: "add_location", payload: location });
      }
    },
    changeName: async (name) => {
      dispatch({type:'change_name',payload:name});
    },
    reset: () => {
      dispatch({type:'reset'});
    },
  
  
};


  return (
    <LocationContext.Provider value={{ state, actions }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocationContext = () => useContext(LocationContext);

export { LocationProvider, useLocationContext };
