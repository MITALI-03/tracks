import React,{useEffect,useState} from "react";
import {requestForegroundPermissionsAsync,watchPositionAsync,Accuracy,} from "expo-location";


export default(callback:any)=>{
    const [err, setErr] = useState(null);
      useEffect(() => {
        const startWatching = async () => {
          try {
            const { granted } = await requestForegroundPermissionsAsync();
            if (!granted) {
              throw new Error('Location permission not granted');
            }
        await watchPositionAsync(
              {
                  timeInterval: 1000,
                distanceInterval: 10,
              },
              callback
            );
          } catch (e: any) {
            setErr(e);
          }
        };
        startWatching(); 
      }, [callback]);
    return [err];
}