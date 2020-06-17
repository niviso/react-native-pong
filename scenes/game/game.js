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
import { SimpleAnimation } from 'react-native-simple-animations';
import Controllers from '../../components/controllers/controllers';
import StartupTimer from '../../components/startup-timer/startup-timer';

export default function Game(props) {

  const {UpdateSceen} = props;
  const [state,setState] = useContext(AppContext);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const [paused,setPause] = useState(true);

  const animate = time => {

    if (previousTimeRef.current != undefined) {
      const deltaTime = Math.abs(time - previousTimeRef.current);

      if(!paused){
      var tmpState = Engine.getNewPosition(state);
      if(tmpState.ball.colliding){
        if(Math.abs(tmpState.ball.collidingTimeStamp-time) > 100){
        if(tmpState.ball.collisionTarget == 'player1'){
          AudioHelper.play("hit2");
        } else if(tmpState.ball.collisionTarget == 'player2'){
          AudioHelper.play("hit3");
        } else {
          AudioHelper.play("hit1");
        }
        tmpState.ball.colliding = false;
        }
        tmpState.ball.collidingTimeStamp = time;
      }
      tmpState.ball.transform.position.x += state.ball.transform.directionVector.x * Engine.speed;
      tmpState.ball.transform.position.y += state.ball.transform.directionVector.y * Engine.speed;

      tmpState.player1.transform.position.y += state.player1.transform.directionVector.y * Engine.speed;
      tmpState.player2.transform.position.y += state.player2.transform.directionVector.y * Engine.speed;



      if(tmpState.player1.transform.position.y < 0){
        tmpState.player1.transform.position.y = 0;
      } else if(tmpState.player1.transform.position.y+tmpState.player1.transform.size.height > Engine.screenHeight){
        tmpState.player1.transform.position.y = Engine.screenHeight - tmpState.player1.transform.size.height;
      }


      if(tmpState.player2.transform.position.y < 0){
        tmpState.player2.transform.position.y = 0;
      } else if(tmpState.player2.transform.position.y+tmpState.player2.transform.size.height > Engine.screenHeight){
        tmpState.player2.transform.position.y = Engine.screenHeight - tmpState.player2.transform.size.height;
      }


      setState(tmpState);
    }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }



  function random(min, max) {
  const rand = (min + Math.random() * (max - min)).toFixed(2);;
  console.log(rand);
  return rand;
}
  useEffect(() => {
    if(state.player1.points >= 5 ||state.player2.points >= 5){
      UpdateSceen("ending");
    }
    if (AppState.currentState.match(/inactive|background/)) {
      UpdateSceen('pause');
      setPause(true);
    }
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <View style={{width: Engine.screenWidth, height: Engine.screenHeight}} onTo>
    <Ball transform={state.ball.transform}/>
    <Player theme={state.theme} transform={state.player1.transform}/>
    <Player theme={state.theme} transform={state.player2.transform}/>

    <View style={{position: 'absolute',width: Engine.screenWidth, height: Engine.screenHeight,display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <Text style={Styles.ScorePlayerOne}>{state.player1.points}</Text>
      <View style={Styles.ScoreSeparator}></View>
      <Text style={Styles.ScorePlayerTwo}>{state.player2.points}</Text>
    </View>

    <Controllers/>

    {paused && (
    <StartupTimer setPause={setPause}/>
    )}
    </View>
  );
}
