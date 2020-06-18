import React, { useState,useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiTouchView } from 'expo-multi-touch';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Controllers(props) {
  const [state,setState] = useContext(AppContext);
  const [touchState,setTouchState] = useState({touches:{}});

  const Up = (player1) => {
    if((player1 && state.player1.transform.directionVector.y !== 0) || (!player1 && state.player2.transform.directionVector.y !== 0) ){
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
  const touchProps = {
    onTouchBegan: event => {
      const { identifier,pageY,pageX } = event;
      const player1 = pageX > (Engine.screenWidth/2) ? 0 : 1; // true = player 1, false = player2
      const direction = pageY > (Engine.screenHeight/2) ? 0 : 1; // true = up, false = down

      if(direction){
        Up(player1);
      } else {
        Down(player1);
      }      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));

    },
    onTouchEnded: event => {
      const { identifier, deltaX, deltaY, isTap,pageX } = event;

      const player1 = pageX > (Engine.screenWidth/2) ? 0 : 1; // true = player 1, false = player2
      Stop(player1);
      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));
    },
    onTouchCancelled: event => {
      const { identifier, deltaX, deltaY, isTap,pageX } = event;
      const player1 = pageX > (Engine.screenWidth/2) ? 0 : 1; // true = player 1, false = player2
      Stop(player1);
      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));
    },
  };


    const { touches } = touchState;
    return (
        <MultiTouchView {...touchProps} style={{position:'absolute',top:0,left:0,width: Engine.screenWidth,height: Engine.screenHeight}}>

        </MultiTouchView>
    );

}

const TOUCH_SIZE = 56;
