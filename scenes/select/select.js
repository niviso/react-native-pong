import React,{useContext,useEffect,useState} from 'react';
import Styles from './styles.scss';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import AudioHelper from '../../helpers/AudioHelper';
import {menu,impact} from '../../helpers/sounds';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Emitter } from 'react-native-particles';
import Engine from '../../helpers/engine';
import {AppContext} from '../../context/appContext';

export default function Select(props) {
  const {UpdateSceen} = props;

  const [state,setState] = useContext(AppContext);

  const [currentStep,setCurrentstep] = useState(0);

  const [settings,setSettings] = useState({
    players: 1,
    mode: 'normal',
    playerOneSkill: null,
    playerTwoSkill: null
  })

  useEffect(()=>{
  var tmpState = JSON.parse(JSON.stringify(state));
  tmpState.player1.points = 0;
  tmpState.player2.points = 0;

  tmpState.ball.transform.position.x = (Engine.screenWidth/2)-(tmpState.ball.transform.size.width/2);
  tmpState.ball.transform.position.y = (Engine.screenHeight/2)-(tmpState.ball.transform.size.height/2);

  tmpState.player1.transform.position.x = 0;
  tmpState.player2.transform.position.x = Engine.screenWidth - tmpState.player2.transform.size.width;

  setState(tmpState);
},[]);

const GoToStep = (index,setting) => {

    AudioHelper.play("confirm");
    setSettings({...settings,...setting});
    if(index !== null){
    setCurrentstep(index);
  } else {
    AudioHelper.stopAll();
    setState({...state,...settings});
    UpdateSceen('game');
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


    <TouchableOpacity onPress={() => GoToStep(2)} style={Styles.Row}>
    <SimpleAnimation animateOnUpdate delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>

    <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>Heroic mode</Text>
    </SimpleAnimation>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(2)} style={{...Styles.BgBlack,...Styles.Row}}>
    <SimpleAnimation animateOnUpdate delay={100} duration={2000} fade staticType='bounce' style={Styles.Box}>

    <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>Normal mode</Text>
    </SimpleAnimation>
    </TouchableOpacity>


    </View>
  )
  }
  else if(currentStep == 2){
    return(
    <View style={Styles.Wrapper}>


    <TouchableOpacity onPress={() => GoToStep(1)} style={Styles.Row}>
    <SimpleAnimation animateOnUpdate delay={0} duration={2000} fade staticType='bounce' style={Styles.Box}>

    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 1'})}>
      <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>SKILL 1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 2'})}>
      <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>SKILL 2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 2'})}>
      <Text style={{color:'black',...Styles.Header,...settings.players == 2 ? Styles.Deg90 : null}}>SKILL 3</Text>
    </TouchableOpacity>

    </SimpleAnimation>
    </TouchableOpacity>
    <View style={{...Styles.BgBlack,...Styles.Row}}>
    <SimpleAnimation animateOnUpdate delay={100} duration={2000} fade staticType='bounce' style={Styles.Box}>
    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 1'})}>
      <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>SKILL 1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 2'})}>
      <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>SKILL 2</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => GoToStep(null,{playerOneSkill: 'Skill 2'})}>
      <Text style={{color:'white',...Styles.Header,...settings.players == 2 ? Styles.Deg270 : null}}>SKILL 3</Text>
    </TouchableOpacity>

    </SimpleAnimation>
    </View>


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
