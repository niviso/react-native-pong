import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
export default function Start(props) {
  const {UpdateSceen} = props;
  AudioHelper.play("menu-music");

  return (
    <>
    <TouchableOpacity onPress={() => UpdateSceen('select')} style={Styles.Wrapper}>

    <SimpleAnimation delay={250} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Header}>Pong</Text>
    </SimpleAnimation>
    <View style={Styles.Spacer}></View>
    <SimpleAnimation delay={500} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Press}>Tap anywhere to start</Text>
    </SimpleAnimation>
    </TouchableOpacity>
    <TouchableOpacity style={Styles.GoToCredits} onPress={() => UpdateSceen('credits')}>
    <Text style={Styles.GotToCreditsText}>CREDITS</Text>
    </TouchableOpacity>
    </>
  );
}
