import React, { useState,useContext } from 'react';
import { MultiTouchView } from 'expo-multi-touch';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';
import { Text, View, StyleSheet } from 'react-native';

export default function Controllers(props) {
  const [state,setState] = useContext(AppContext);

  const Up = (player1) => {
    if((player1 && state.player1.transform.directionVector.y != 0) || (!player1 && state.player2.transform.directionVector.y != 0) ){
      return;
    }
    var tmpState = JSON.parse(JSON.stringify(state));
    if(player1){
      tmpState.player1.transform.directionVector.y = -1;
    } else {
      tmpState.player2.transform.directionVector.y = -1;
    }
    setState(tmpState);

  }

  const Down = (player1) => {
    if((player1 && state.player1.transform.directionVector.y != 0) || (!player1 && state.player2.transform.directionVector.y != 0) ){
      return;
    }

    var tmpState = JSON.parse(JSON.stringify(state));
    if(player1){
      tmpState.player1.transform.directionVector.y = 1;
    } else {
      tmpState.player2.transform.directionVector.y = 1;
    }
    console.log("Set down");
    setState(tmpState);

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    position: 'absolute',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
