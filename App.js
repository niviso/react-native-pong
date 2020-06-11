import React from 'react';
import {AppProvider} from './context/appContext';
import Game from './views/game/game';
import {bg_02,impact} from './helpers/sounds';
import AudioHelper from './helpers/AudioHelper';
import Engine from './helpers/engine';
import { Dimensions } from 'react-native';



export default function App() {
  AudioHelper.init({file: impact,name:"hit1",pitch: 0.8});
  AudioHelper.init({file: impact,name:"hit2",pitch: 0.5});
  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  Engine.init({screenWidth: screenWidth,screenHeight: screenHeight});
  return (
    <AppProvider>
    <Game/>
    </AppProvider>
  );
}
