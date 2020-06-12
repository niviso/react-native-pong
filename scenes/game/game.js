import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity,Dimensions,AppState } from 'react-native';
import {AppContext} from '../../context/appContext';
import {impact} from '../../helpers/sounds';
import AudioHelper from '../../helpers/AudioHelper';
import Ball from '../../components/ball/ball';
import Player from '../../components/player/player';
import Engine from '../../helpers/engine';
import { Emitter } from 'react-native-particles';
import { SimpleAnimation } from 'react-native-simple-animations';



export default function Game(props) {

  const {UpdateSceen} = props;
  const [state,setState] = useContext(AppContext);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const [startupTimer,setstartupTimer] = useState(30);

  if(startupTimer == 30){
    AudioHelper.play("countdown");
  }
  const animate = time => {

    if (previousTimeRef.current != undefined) {
      const deltaTime = Math.abs(time - previousTimeRef.current);

      if(startupTimer <= 0){
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
    } else {
      const NewValue = (startupTimer - Math.round(deltaTime) * 0.01) % 100;
      setstartupTimer(NewValue);
    }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }



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

  function random(min, max) {
  const rand = (min + Math.random() * (max - min)).toFixed(2);;
  console.log(rand);
  return rand;
}
  useEffect(() => {
    if(state.player1.points >= 5 ||state.player2.points >= 5){
      UpdateSceen("start");
    }
    if (AppState.currentState.match(/inactive|background/)) {
      UpdateSceen('pause');
    }
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
  });

  return (
    <View style={{width: Engine.screenWidth, height: Engine.screenHeight}} onTo>
    <Ball transform={state.ball.transform}/>
    <View style={{position: 'absolute',width: state.player1.transform.size.width, height: state.player1.transform.size.height,backgroundColor: 'black',left: state.player1.transform.position.x, top: state.player1.transform.position.y}}>
    </View>

    <View style={{position: 'absolute',width: state.player2.transform.size.width, height: state.player2.transform.size.height,backgroundColor: 'black',left:state.player2.transform.position.x, top: state.player2.transform.position.y}}>
    </View>

        <View style={{position: 'absolute',width: Engine.screenWidth, height: Engine.screenHeight,display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
    <Text style={Styles.ScorePlayerOne}>{state.player1.points}</Text>
    <View style={Styles.ScoreSeparator}></View>
    <Text style={Styles.ScorePlayerTwo}>{state.player2.points}</Text>

    </View>

    <View style={{position:'absolute',top:0,left:0,width: '50%',height: '50%'}} onTouchStart={()=> Up(true)} onTouchEnd={() => Stop(true)}></View>
    <View style={{position:'absolute',top:'50%',left:0,width: '50%',height: '50%'}} onTouchStart={()=> Down(true)} onTouchEnd={() => Stop(true)}></View>

    <View style={{position:'absolute',top:0,left:'50%',width: '50%',height: '50%'}} onTouchStart={()=> Up()} onTouchEnd={() => Stop()}></View>
    <View style={{position:'absolute',top:'50%',left:'50%',width: '50%',height: '50%'}} onTouchStart={()=> Down()} onTouchEnd={() => Stop()}></View>
    {startupTimer > 0 && (
    <View style={Styles.Startup}>
      <SimpleAnimation delay={0} duration={1000} fade staticType='bounce'>
      <Text style={Styles.StartupTimer1}>Player 1{"\n"}{(startupTimer.toFixed(0)*0.1).toFixed(0)}</Text>
      </SimpleAnimation>
      <SimpleAnimation  delay={100} duration={1000} fade staticType='bounce'>
      <Text style={Styles.StartupTimer2}>Player 2{"\n"}{(startupTimer.toFixed(0)*0.1).toFixed(0)}</Text>
      </SimpleAnimation>
    </View>
    )}
    </View>
  );
}
