import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
export default function Start(props) {
  const {UpdateSceen} = props;


/*  <Emitter
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

  return (

    <TouchableOpacity onPress={() => UpdateSceen('select')} style={Styles.Wrapper}>

    <SimpleAnimation delay={250} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Header}>Pong</Text>
    </SimpleAnimation>
    <View style={Styles.Spacer}></View>
    <SimpleAnimation delay={500} duration={2000} fade staticType='zoom'>

    <Text style={Styles.Press}>Press anywhere to start</Text>
    </SimpleAnimation>
    </TouchableOpacity>

  );
}
