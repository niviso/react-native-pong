import React from 'react';
import { View } from 'react-native';


export default function Ball(props) {
  const {transform,mode} = props;

  return (

    <View style={{position: 'relative',overflow: 'hidden',width: transform.size.width, height: transform.size.height,backgroundColor: 'black',borderRadius: 100,left: transform.position.x, top: transform.position.y}}>
    </View>
  );
}
