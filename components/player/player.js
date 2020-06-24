import React from 'react';
import { View, } from 'react-native';

export default function Player(props) {
  const {transform,color,mode} = props;
  return (

    <View style={{position: 'absolute',width: transform.size.width, height: transform.size.height,backgroundColor: color,left: transform.position.x, top: transform.position.y}}>
    </View>
  );
}
