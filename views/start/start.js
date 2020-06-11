import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {menu,impact} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';


export default function Start(props) {
  const {UpdateSceen} = props;


  AudioHelper.stopAll();
  AudioHelper.init({file: menu,name:"menu",loop: true});
  AudioHelper.play("menu");
  //Examplegif: https://thumbs.gfycat.com/ImpishUnequaledIchneumonfly-size_restricted.gif
  return (

    <TouchableOpacity onPress={() => UpdateSceen('game')} style={Styles.Wrapper}>
    <Image source={{uri: ''}} style={{position: 'absolute',width: '100%',height:'100%'}} alt="" />

    <SimpleAnimation delay={1000} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Header}>Pong</Text>
    </SimpleAnimation>

    <SimpleAnimation delay={1250} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Press}>Press anywhere to start</Text>
    </SimpleAnimation>
    </TouchableOpacity>

  );
}
