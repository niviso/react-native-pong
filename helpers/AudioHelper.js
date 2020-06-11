import { Audio } from 'expo-av';


const AudioHelper = {
    list: [],
    muted: false,
    init: async function(props){
      const {file,name,volume,pitch,looping,autoPlay} = props;
      if(this.list[name]){
        return; 
      }
      let newAudio =  new Audio.Sound();

      this.list[name] = newAudio;
      try{
      await this.list[name].loadAsync(file);
      if(volume){
        await this.list[name].setVolumeAsync(volume);
      }
      if(looping){
        this.list[name].setIsLoopingAsync(true);
      }
      if(pitch){
        this.list[name].setRateAsync(pitch,true,1);
      }
      if(autoPlay){
        this.play(name);
      }

    } catch(e){
        //console.log("No bueno",file.toString());
    }

    },
    muteAll: async function(){
      this.muted = true;
      this.list.map(index=>{
        this.mute(index.file);
      });
    },
    mute: async function(file){
         this.list[file].audio.setIsMutedAsync(true);
    },
    unMute: async function(file){
         this.list[file].audio.setIsMutedAsync(false);
    },
    unMuteAll: function(){
      this.muted = false;
      this.list.map(index=>{
        this.unMute(index.file);
      });
    },
    play: async function(file,pitch){
      try {
        await this.list[file].setPositionAsync(0);
        await this.list[file].playAsync();
      } catch(e){
          console.log(e);
      }
    },
    pause: async function(file){
      await this.list[file].audio.pauseAsync();
    },
    stop: async function(file){
      try {
        await this.list[file].audio.stopAsync();
      } catch(e){
          //console.log("No bueno",file.toString());
      }
    },
    stopAll: async function(){
      this.list.map(index=>{
        this.stop(index.file);
      });
    }

}
export default AudioHelper;
