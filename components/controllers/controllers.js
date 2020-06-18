import React, { useState,useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MultiTouchView } from 'expo-multi-touch';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

const colors = ['red', 'blue'];
export default function Controllers(props) {
  const [state,setState] = useContext(AppContext);

  const [touchState,setTouchState] = useState({touches:{}})
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
  const touchProps = {
    onTouchBegan: event => {
      const { identifier } = event;

      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: event,
        },
      }));

    },
    onTouchMoved: event => {
      const { identifier,pageY,pageX } = event;
      if(pageY > (Engine.screenHeight/2)){
        Down(pageX < (Engine.screenWidth/2));
      } else {
        Up(pageX < (Engine.screenWidth/2));
      }
      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: event,
        },
      }));
    },
    onTouchEnded: event => {
      const { identifier, deltaX, deltaY, isTap } = event;
      Stop();
      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));
    },
    onTouchCancelled: event => {
      const { identifier, deltaX, deltaY, isTap } = event;
      setTouchState(previous => ({
        touches: {
          ...previous.touches,
          [identifier]: null,
        },
      }));
    },
    onTouchesBegan: () => {
    },
    onTouchesMoved: () => {},
    onTouchesEnded: () => {
    },
    onTouchesCancelled: () => {
    },
  };


    const { touches } = touchState;
    return (
      <View style={{ flex: 1 }}>
        <MultiTouchView style={{ flex: 1 }} {...touchProps}>
          <View style={styles.container}>

            {Object.values(touches).map((item, index) => {
              if (!item) {
                return null;
              }

              return (
                <View
                  key={index}
                  style={[
                    styles.touch,
                    {
                      transform: [
                        { translateX: -TOUCH_SIZE / 2 },
                        { translateY: -TOUCH_SIZE / 2 },
                        { scale: 1 + (item.force || 0) * 2 },
                      ],
                      backgroundColor: item.pageX < (Engine.screenWidth/2) ? state.theme.primary : state.theme.secondary,
                      top: item.pageY,
                      left: item.pageX,
                    },
                  ]}
                />
              );
            })}
          </View>
        </MultiTouchView>
      </View>
    );

}

const TOUCH_SIZE = 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    position: 'absolute',
    aspectRatio: 1,
    width: TOUCH_SIZE,
    borderRadius: TOUCH_SIZE / 2,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
