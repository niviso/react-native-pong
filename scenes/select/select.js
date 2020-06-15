import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {menu,impact} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Emitter } from 'react-native-particles';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Select(props) {
  const {UpdateSceen} = props;

  const [state,setState] = useContext(AppContext);
  const [steps,setStep] = useState([]);
  const [currentStep,setStep] = useState(0);
  const Select = () => {
      UpdateSceen('game');
  }
  useEffect(()=>{
  var tmpState = JSON.parse(JSON.stringify(state));
  tmpState.player1.points = 0;
  tmpState.player2.points = 0;

  tmpState.ball.transform.position.x = (Engine.screenWidth/2)-(tmpState.ball.transform.size.width/2);
  tmpState.ball.transform.position.y = (Engine.screenHeight/2)-(tmpState.ball.transform.size.height/2);

  tmpState.player1.transform.position.x = 0;
  tmpState.player2.transform.position.x = Engine.screenWidth - tmpState.player2.transform.size.width;

  setState(tmpState);
},[]);

const UpdateStep = (index) => {
  if(index > step)
}


const step_01 = (
  <TouchableOpacity onPress={() => Select()} style={Styles.Wrapper}>


  <View style={{backgroundColor: 'black',width: '50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <SimpleAnimation delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>

  <Text style={{color:'white',...Styles.Header}}>1 Player</Text>
  </SimpleAnimation>
  </View>
  <View style={Styles.Flip}>
  <SimpleAnimation delay={50} duration={2000} fade staticType='bounce' style={Styles.Box}>

  <Text style={{color:'black',...Styles.Header}}>2 Players</Text>
  </SimpleAnimation>
  </View>


  </TouchableOpacity>
)

  return (
    <>
    {step_01}
    </>

  );
}
