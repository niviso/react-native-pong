import React,{useContext,useEffect,useState} from 'react';
import { Text, View,Image,Dimensions } from 'react-native';
import {AppContext} from '../../context/appContext';
import {impact,bg} from '../../helpers/sounds';
import AudioHelper from '../../helpers/AudioHelper';

export default function Ball(props) {
  const {transform} = props;

  return (

    <View style={{position: 'relative',overflow: 'hidden',width: transform.size.width, height: transform.size.height,backgroundColor: 'black',borderRadius: '100%',left: transform.position.x, top: transform.position.y}}>
    </View>
  );
}
