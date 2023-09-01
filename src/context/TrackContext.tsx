import React, { createContext, useContext, useReducer, ReactNode } from "react";
import tracker from "../api/tracker";
import { useLocationContext } from "./LocationContext";
import { useAuthContext } from "./AuthContext";

interface track {
    _id: string;
    name: string;
    locations:location[]
    // Add other properties as needed
  }
  type location = {
    coords: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
  };
  interface TrackContextState {
    tracks: track[];
  }

interface TrackContextActions {
  createTrack: (name: string, location: any) => void;
  fetchTracks:()=>void;
}

type Action = { type: string; payload?: any };

const initialState: TrackContextState = {
    tracks:[]
};


const TrackContext = createContext<{
  state: TrackContextState;
  actions: TrackContextActions;
}>({
  state: initialState,
  actions: {
    createTrack: () => Promise.resolve(),
    fetchTracks: () => Promise.resolve(),
  },
});

const TrackReducer = (
    state: TrackContextState,
    action: Action
  ): TrackContextState => {
    switch (action.type) {
      case 'fetch_tracks':
        return {
          ...state,
          tracks: action.payload,
        };
      default:
        return state;
    }
  };

const TrackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(TrackReducer, initialState);

  const actions: TrackContextActions = {
    createTrack: async(name, locations) => {
        await tracker.post('/tracks',{name,locations})
      
    },
    fetchTracks: async() => {
        const response=await tracker.get('/tracks',)
        dispatch({type:'fetch_tracks',payload:response.data})
      
    },
  };

  return (
    <TrackContext.Provider value={{ state, actions }}>
      {children}
    </TrackContext.Provider>
  );
};

const useTrackContext = () => useContext(TrackContext);

export { TrackProvider, useTrackContext };
