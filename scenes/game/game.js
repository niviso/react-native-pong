import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity,Dimensions,AppState,SafeAreaView } from 'react-native';
import {AppContext} from '../../context/appContext';
import {impact} from '../../helpers/sounds';
import AudioHelper from '../../helpers/AudioHelper';
import Ball from '../../components/ball/ball';
import Player from '../../components/player/player';
import Engine from '../../helpers/engine';
import { Emitter } from 'react-native-particles';
import Render from './render';
import Controllers from '../../components/controllers/controllers';

export default function Game(props) {
  const {UpdateSceen} = props;


  return (
    <View style={{width: Engine.screenWidth, height: Engine.screenHeight}}>
    <Render UpdateSceen={UpdateSceen}/>
    <Controllers/>

    </View>
  );
}
