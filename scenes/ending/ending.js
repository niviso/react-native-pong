import React,{useContext} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Ending(props) {
  const {UpdateSceen} = props;
  const [state,setState] = useContext(AppContext);

  AudioHelper.play("menu-music");

  return (

    <TouchableOpacity onPress={() => UpdateSceen('select')} style={Styles.Wrapper}>
    <SimpleAnimation delay={250} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Header}>Player {state.player1.points > state.player2.points ? '1' : '2'} won</Text>
    </SimpleAnimation>
    <View style={Styles.Spacer}></View>
    <SimpleAnimation delay={500} duration={2000} fade staticType='zoom'>
    <Text style={Styles.Press}>Tap anywhere to play again</Text>
    </SimpleAnimation>
    </TouchableOpacity>

  );
}
