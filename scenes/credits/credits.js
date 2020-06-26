import React,{useContext,useEffect} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity,ScrollView } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {confirm} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';
import Markdown from 'react-native-markdown-renderer';
export default function Credits(props) {
  const {UpdateSceen} = props;
  const [state,setState] = useContext(AppContext);
const readme =  `
## Thank you to
&nbsp;&nbsp;&nbsp;
### Background music:
Background music from PlayOnLoop.com
Licensed under Creative Commons by Attribution 4.0
&nbsp;&nbsp;&nbsp;
Yellow by cyba (c) copyright 2019 Licensed under a Creative Commons Attribution Noncommercial  (3.0) license. http://dig.ccmixter.org/files/cyba/60166
&nbsp;
Shadows by cyba (c) copyright 2019 Licensed under a Creative Commons Attribution Noncommercial  (3.0) license. http://dig.ccmixter.org/files/cyba/60095
&nbsp;&nbsp;&nbsp;
### Sound effects:
"Countdown" by ckvoiceover @ https://freesound.org/

"Confirm" by InspectorJ @ https://freesound.org/

"Boop" by fordps3 @ https://freesound.org/
`;
  AudioHelper.play("menu-music");
  return (
    <>
    <ScrollView style={Styles.Wrapper}>
    <SimpleAnimation delay={250} duration={2000} fade staticType='zoom' style={{padding: 50}}>
    <Markdown>
    {readme}
    </Markdown>
    </SimpleAnimation>
    </ScrollView>
    <TouchableOpacity style={Styles.GoBackButton} onPress={() => UpdateSceen('start')}>
    <Text style={Styles.GoBackButtonText}>← Go back</Text>
    </TouchableOpacity>
    </>

  );
}
