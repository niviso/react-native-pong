import React,{useContext,useEffect,useState} from 'react';
import { Text, View,Image,Dimensions } from 'react-native';
import {AppContext} from '../../context/appContext';
import {impact,bg} from '../../helpers/sounds';
import AudioHelper from '../../helpers/AudioHelper';

export default function Ball() {
  const [state,setState] = useContext(AppContext);
  const ball = state.ball;

  return (
    <View style={{position: 'relative',overflow: 'hidden',width: ball.transform.size.width, height: ball.transform.size.height,backgroundColor: 'black',borderRadius: '100%',left: ball.transform.position.x, top: ball.transform.position.y}}>
    {state.slowMotion && <Image alt="" source={{uri: 'https://i.imgur.com/1Nhp8Kf.gif'}} style={{width: '100%', height: '100%',opacity: 0.5}} ImageResizeMode="cover"/> }
    </View>
  );
}
