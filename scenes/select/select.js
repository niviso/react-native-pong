import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {menu,impact} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Select(props) {
  const {UpdateSceen} = props;

  const [state,setState] = useContext(AppContext);

  const [currentStep,setCurrentstep] = useState(0);

  const [settings,setSettings] = useState({
    players: 1,
    mode: 'normal',
    playerOneSkill: null, //Implement later
    playerTwoSkill: null //Implement later
  })

  useEffect(()=>{
  if(state.settings && currentStep !== 0){
    UpdateSceen('game');
  }

},[state]);

const GoToStep = (index,setting) => {
    AudioHelper.play("confirm");
    setSettings(prev => ({...prev,...setting}));

    if(index !== null){
    setCurrentstep(index);
  } else {
    AudioHelper.stopAll();
    setState({...Engine.resetPositions(state),...{settings: settings}});
  }

}

function getStep(){

  if(currentStep == 0){
    return (
      <View style={Styles.Wrapper}>
      <TouchableOpacity onPress={() => GoToStep(1,{players: 1})} style={{...Styles.BgBlack,...Styles.Row}}>
      <SimpleAnimation animateOnUpdate delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>

      <Text style={{color:'white',...Styles.Header}}>1 Player</Text>
      </SimpleAnimation>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => GoToStep(1,{players: 2})} style={Styles.Row}>
      <SimpleAnimation animateOnUpdate delay={100} duration={2000} fade staticType='bounce' style={Styles.Box}>

      <Text style={{color:'black',...Styles.Header,...Styles.Deg90}}>2 Players</Text>
      </SimpleAnimation>
      </TouchableOpacity>
      </View>
    )
  }
  else if(currentStep == 1){
    return(
    <View style={Styles.Wrapper}>


    <TouchableOpacity onPress={() => GoToStep(2,{mode:'heroic'})} style={Styles.Row}>
    <SimpleAnimation animateOnUpdate delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>
    <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>Heroic mode</Text>

    </SimpleAnimation>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(2,{mode:'normal'})} style={{...Styles.BgBlack,...Styles.Row}}>
    <SimpleAnimation animateOnUpdate delay={100} duration={2000} fade staticType='bounce' style={Styles.Box}>

    <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>Normal mode</Text>
    </SimpleAnimation>
    </TouchableOpacity>
    </View>
  )
}   else if(currentStep == 2){
      return(
        <View style={Styles.Wrapper}>
        {settings.players == 2 && (<TouchableOpacity onPress={() => GoToStep(null)} style={{...Styles.BgBlack,...Styles.Row}}>
        <SimpleAnimation animateOnUpdate delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>
        <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>Tap to start</Text>

        </SimpleAnimation>
        </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => GoToStep(null)} style={Styles.Row}>
        <SimpleAnimation animateOnUpdate delay={100} duration={2000} fade staticType='bounce' style={Styles.Box}>

        <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>Tap to start</Text>
        </SimpleAnimation>
        </TouchableOpacity>
        </View>
    )
    }
}



  return (
    <>
    {getStep()}
    </>

  );
}
