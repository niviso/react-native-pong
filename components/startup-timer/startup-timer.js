import React,{useState,useEffect} from 'react';
import { View,Text } from 'react-native';
import {AppContext} from '../../context/appContext';
import Styles from './styles.scss';
import { SimpleAnimation } from 'react-native-simple-animations';
import AudioHelper from '../../helpers/AudioHelper';

export default function StartupTimer(props) {
  const {time=3,setPause,players} = props;
  const [countdown,setCountdown] = useState(time);
  useEffect(() => {
   const interval = setInterval(() => {
     if(countdown == time){
       AudioHelper.play('countdown');
     }
      if(countdown > 0){
        setCountdown(countdown-1);
      } else {
        setPause(false);
      }

    }, (1000));
   return () => clearInterval(interval);
 });


  return (

    <View style={Styles.Startup}>
      <SimpleAnimation delay={0} duration={1000} fade staticType='bounce'>
      <Text style={{...Styles.StartupTimer1,transform: [{ rotate: players == 2 ? '90deg' : '0deg' }]}}>Player 1{"\n"}{countdown}</Text>
      </SimpleAnimation>
      {players == 2 && (<SimpleAnimation  delay={100} duration={1000} fade staticType='bounce'>
      <Text style={Styles.StartupTimer2}>Player 2{"\n"}{countdown}</Text>
      </SimpleAnimation>
      )}
    </View>
  );
}
