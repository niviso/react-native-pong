import React,{useState,useEffect} from 'react';
import {AppProvider} from './context/appContext';
import Game from './scenes/game/game';
import Start from './scenes/start/start';
import Select from './scenes/select/select';
import Pause from './scenes/pause/pause';

import {impact,bg,bg_02,confirm} from './helpers/sounds';
import AudioHelper from './helpers/AudioHelper';
import Engine from './helpers/engine';
import { Dimensions } from 'react-native';

export default function App() {
  AudioHelper.stopAll();
  AudioHelper.init({file: impact,name:"hit1",pitch: 0.8});
  AudioHelper.init({file: impact,name:"hit2",pitch: 0.5});
  AudioHelper.init({file: confirm,name:"confirm",volume: 0.5});
  AudioHelper.init({file: bg,name:"menu-music",loop: true,autoPlay: true});
  AudioHelper.init({file: bg_02,name:"game-music",loop: true});

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);
  const [sceen,setSceen] = useState('start');
  Engine.init({screenWidth: screenWidth,screenHeight: screenHeight});

  const UpdateSceen = (sceen) => {
    AudioHelper.stopAll();

    AudioHelper.play("confirm");
    setSceen(sceen);
  }




  return (
    <AppProvider>
    {sceen == 'start' && <Start UpdateSceen={UpdateSceen}/> }
    {sceen == 'select' && <Select  UpdateSceen={UpdateSceen}/> }
    {sceen == 'game' && <Game  UpdateSceen={UpdateSceen}/> }
    {sceen == 'pause' && <Pause  UpdateSceen={UpdateSceen}/> }

    </AppProvider>
  );
}
