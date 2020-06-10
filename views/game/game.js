import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity,Dimensions } from 'react-native';
import {AppContext} from '../../context/appContext';
import {impact,bg} from '../../helpers/sounds';
import AudioHelper from '../../helpers/AudioHelper';
import Ball from '../../components/ball/ball';
//AudioHelper.init(bg,"bg",true,true);

export default function Game() {
  const [state,setState] = useContext(AppContext);
  const [speed,setSpeed] = useState(10);
  const [slowMotion,setSlowMotion] = useState(100);

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  let settings = {
    FPS: 60,
    SPEED: 10
  }

  const Reset = () => {
    var tmpState = JSON.parse(JSON.stringify(state));

    tmpState.ball.transform.position.x = 0;
    tmpState.ball.transform.position.y = 0;
    setState(tmpState);

  }

  const Up = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player1.transform.directionVector.y -= 1;
    setState(tmpState);

  }

  const Down = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player1.transform.directionVector.y = 1;
    setState(tmpState);

  }

  const Stop = () => {
    var tmpState = JSON.parse(JSON.stringify(state));
    tmpState.player1.transform.directionVector.y = 0;
    setState(tmpState);

  }
  useEffect(() => {

    const interval = setInterval(() => {
      var tmpState = JSON.parse(JSON.stringify(state));

      const collisionLeft = tmpState.ball.transform.position.x <= 0;
      const collisionRight =  (tmpState.ball.transform.position.x+tmpState.ball.transform.size.width > screenWidth) && (tmpState.ball.transform.position.x < screenWidth)
      const collisionBottom = (tmpState.ball.transform.position.y+tmpState.ball.transform.size.height > screenHeight) && (tmpState.ball.transform.position.y < screenHeight)
      const collisionTop = tmpState.ball.transform.position.y < 0;

      const collisionWithCharacterX = tmpState.ball.transform.position.x < (tmpState.player1.transform.position.x+tmpState.player1.transform.size.width);
      const collisionWithCharacterY = (tmpState.ball.transform.position.y > tmpState.player1.transform.position.y) && (tmpState.ball.transform.position.y < tmpState.player1.transform.position.y+tmpState.player1.transform.size.height);
      const collidingWithCharacter = collisionWithCharacterX && collisionWithCharacterY;
      const collisionWithCharacterX_02 = (tmpState.ball.transform.position.x+tmpState.player2.transform.size.width > tmpState.player2.transform.position.x-tmpState.player2.transform.size.width);
      const collisionWithCharacterY_02 = (tmpState.ball.transform.position.y > tmpState.player2.transform.position.y) && (tmpState.ball.transform.position.y < tmpState.player2.transform.position.y+tmpState.player2.transform.size.height);
      const collidingWithCharacter_02 = collisionWithCharacterX_02 && collisionWithCharacterY_02;


      const ballY = Math.abs(state.ball.transform.position.y)+state.ball.transform.size.height;
      const playerY = Math.abs(state.player1.transform.position.y) + state.player1.transform.size.height;
      const precentage = Math.round((ballY/playerY)*100);

      tmpState.ball.colliding = (collidingWithCharacter || collidingWithCharacter_02 || collisionBottom || collisionTop);
      if(collidingWithCharacter){
        console.log("WAA",precentage);
      }
      if(collidingWithCharacter && precentage > 80){
        setSpeed(1);
        tmpState.slowMotion = true;
      }

      if(speed <= 10){
        setSpeed(speed+0.5);
      } else {
        tmpState.slowMotion = false;

      }

      if(collidingWithCharacter){
        tmpState.ball.transform.directionVector.x = 1;
        tmpState.ball.transform.position.x = tmpState.player1.transform.position.x+tmpState.player1.transform.size.width;
      }
      if(collidingWithCharacter_02){
        tmpState.ball.transform.directionVector.x = -1;
        tmpState.ball.transform.position.x = tmpState.player2.transform.position.x-tmpState.ball.transform.size.width      }
      if(collisionTop){
        tmpState.ball.transform.directionVector.y = 1;
      }
      if(collisionBottom){
        tmpState.ball.transform.directionVector.y = -1;
      }

      if(collisionRight || collisionLeft){
        tmpState.ball.transform.position.x = screenWidth/2;
        tmpState.ball.transform.position.y = screenHeight/2;
      }


      tmpState.ball.transform.position.x += state.ball.transform.directionVector.x * speed;
      tmpState.ball.transform.position.y += state.ball.transform.directionVector.y * speed;

      //tmpState.player1.transform.position.x += state.player1.transform.directionVector.x * speed;
      tmpState.player1.transform.position.y += state.player1.transform.directionVector.y * speed;
      //tmpState.player1.transform.position.y = tmpState.ball.transform.position.y - 100;
      tmpState.player2.transform.position.y = tmpState.ball.transform.position.y - 100;


      setState(tmpState);
     }, (1000/settings.FPS));
    return () => clearInterval(interval);
  });

  return (
    <View style={{width: screenWidth, height: screenHeight}}>
    <Ball/>

    <View style={{position: 'absolute',width: state.player1.transform.size.width, height: state.player1.transform.size.height,backgroundColor: 'black',left: state.player1.transform.position.x, top: state.player1.transform.position.y}}>
    </View>

    <View style={{position: 'absolute',width: state.player2.transform.size.width, height: state.player2.transform.size.height,backgroundColor: 'black',left:state.player2.transform.position.x, top: state.player2.transform.position.y}}>
    </View>

<View style={Styles.UpBtn} onTouchStart={() => Up()} onTouchEnd={() => Stop()}><Text style={Styles.ResetBtnText}>↑</Text></View>
<View style={Styles.DownBtn} onTouchStart={() => Down()} onTouchEnd={() => Stop()}><Text style={Styles.ResetBtnText}>↓</Text></View>

    </View>
  );
}
