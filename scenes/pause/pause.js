import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
export default function Start(props) {
  const {UpdateSceen} = props;

  AudioHelper.stopAll();

  return (

    <TouchableOpacity onPress={() => UpdateSceen('game')} style={Styles.Wrapper}>

    <SimpleAnimation delay={250} duration={2000} fade staticType='zoom'>
    <Text style={Styles.Pause}>Press anywhere to resume</Text>
    </SimpleAnimation>
    </TouchableOpacity>

  );
}
