import React,{useContext,useEffect,useState} from 'react';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Controllers(props) {
  const [state,setState] = useContext(AppContext);

  const Up = (player1) => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(player1){
      tmpState.player1.transform.directionVector.y = -1;
    } else {
      tmpState.player2.transform.directionVector.y = -1;
    }
    setState(tmpState);

  }

  const Down = (player1) => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(player1){
      tmpState.player1.transform.directionVector.y = 1;
    } else {
      tmpState.player2.transform.directionVector.y = 1;
    }    setState(tmpState);

  }

  const Stop = (player1) => {
    var tmpState = JSON.parse(JSON.stringify(state));
    if(player1){
      tmpState.player1.transform.directionVector.y = 0;
    } else {
      tmpState.player2.transform.directionVector.y = 0;
    }    setState(tmpState);

  }

  return (

    <>
    <View style={{position:'absolute',top:0,left:0,width: '50%',height: '50%'}} onTouchStart={()=> Up(true)} onTouchEnd={() => Stop(true)}></View>
    <View style={{position:'absolute',top:'50%',left:0,width: '50%',height: '50%'}} onTouchStart={()=> Down(true)} onTouchEnd={() => Stop(true)}></View>
    <View style={{position:'absolute',top:0,left:'50%',width: '50%',height: '50%'}} onTouchStart={()=> Up()} onTouchEnd={() => Stop()}></View>
    <View style={{position:'absolute',top:'50%',left:'50%',width: '50%',height: '50%'}} onTouchStart={()=> Down()} onTouchEnd={() => Stop()}></View>
    </>

  );
}
