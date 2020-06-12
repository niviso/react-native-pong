import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {menu,impact} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Emitter } from 'react-native-particles';
import Engine from '../../helpers/engine';
export default function Start(props) {
  const {UpdateSceen} = props;


/*  AudioHelper.stopAll();
  AudioHelper.init({file: menu,name:"menu",loop: true});
  AudioHelper.play("menu");


  <Emitter
    numberOfParticles={500}
    emissionRate={30}
    interval={0}
    speed={15}
    particleLife={3000}
    direction={360}
    spread={360}
    gravity={0}
    segments={2}
    infiniteLoop={true}
    fromPosition={{ x: (Engine.screenWidth/2)-10, y: (Engine.screenHeight/2)-20 }}
  >
    <Text style={{fontSize: 40,opacity: 0.5}}>.</Text>
  </Emitter>

  */
  //Examplegif: https://thumbs.gfycat.com/ImpishUnequaledIchneumonfly-size_restricted.gif
  AudioHelper.init({file: menu,name:"menu",loop: true});
  AudioHelper.play("menu");
  return (

    <TouchableOpacity onPress={() => UpdateSceen('select')} style={Styles.Wrapper}>

    <SimpleAnimation delay={1000} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Header}>Pong</Text>
    </SimpleAnimation>
    <View style={Styles.Spacer}></View>
    <SimpleAnimation delay={1250} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Press}>Press anywhere to start</Text>
    </SimpleAnimation>
    </TouchableOpacity>

  );
}
