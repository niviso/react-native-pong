import React, { useState } from 'react';
import {Dimensions} from 'react-native';

const AppContext = React.createContext([{}, () => {}]);
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const AppProvider = (props) => {
  const [appState, setAppState] = useState({
    screenWidth: screenHeight,
    screenHeight: screenWidth,
    slowMotion: false,
    player1: {
      transform: {
        position: {
          x: 10,
          y: 200
        },
        size: {
          width: 25,
          height: 125
        },
        directionVector: {
          x: 0,
          y: 0
        }
      },
      points: 0
    },
    player2: {
      transform: {
        position: {
          x: 750,
          y: 200
        },
        size: {
          width: 25,
          height: 125
        },
        directionVector: {
          x: 0,
          y: 0
        }
      },
      points: 0
    },
    ball: {
      transform: {
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 25,
          height: 25
        },
        directionVector: {
          x: 1,
          y: 0.5
        }
      },
      colliding: false,
      dead: false
    },
    theme:{
      primary: "#002a55",
      secondary: "#80c565",
      neutral: "#000000",
      contrast: "#ffffff"
    }
  });

  return (
    <AppContext.Provider value={[appState, setAppState]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
