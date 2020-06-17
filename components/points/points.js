import React from 'react';
import { View,Text } from 'react-native';
import Styles from './styles.scss';
import Engine from '../../helpers/engine';
import { SimpleAnimation } from 'react-native-simple-animations';

export default function Player(props) {
  const {player1Points,player2Points} = props;
  return (

    <SimpleAnimation delay={4500} duration={2000} fade staticType='zoom' style={{position: 'absolute',width: Engine.screenWidth, height: Engine.screenHeight,display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <Text style={Styles.ScorePlayerOne}>{player1Points}</Text>
      <View style={Styles.ScoreSeparator}></View>
      <Text style={Styles.ScorePlayerTwo}>{player2Points}</Text>
    </SimpleAnimation>
  );
}
