import React from 'react';
import { View, } from 'react-native';

export default function Player(props) {
  const {transform,theme} = props;
  return (

    <View style={{position: 'absolute',width: transform.size.width, height: transform.size.height,backgroundColor: theme.primary,left: transform.position.x, top: transform.position.y}}>
    </View>
  );
}
