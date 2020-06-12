import { Audio } from 'expo-av';


const AudioHelper = {
    list: [],
    muted: false,
    time : 0,
    init: async function(props){
      const {file,name,volume,pitch,loop,autoPlay} = props;
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
      if(loop){
        this.list[name].setIsLoopingAsync(true);
      }
      if(pitch){
        this.list[name].setRateAsync(pitch,true,1);
      }
      if(autoPlay){
        this.play(name);
      }

    } catch(e){
        console.log(e);
    }

    },
    muteAll: async function(){
      this.muted = true;
      this.list.map(index=>{
        this.mute(index);
      });
    },
    mute: async function(file){
         this.list[file].setIsMutedAsync(true);
    },
    unMute: async function(file){
         this.list[file].setIsMutedAsync(false);
    },
    unMuteAll: function(){
      this.muted = false;
      this.list.map(index=>{
        this.unMute(index);
      });
    },
    play: async function(file,pitch){
        if(!this.list[file]){
          console.log(file,"file does not exist");
          return;
        }
        try {
          await this.list[file].setPositionAsync(0);
          await this.list[file].playAsync();
        } catch(e){
            console.log(e);
        }
    },
    pause: async function(file){
      await this.list[file].pauseAsync();
    },
    stop: async function(file){
      try {
        await this.list[file].stopAsync();
      } catch(e){
          //console.log("No bueno",file.toString());
      }
    },
    stopAll: async function(){
      this.list.forEach(async function(sound) {
        this.stop(sound);
      })
    }

}
export default AudioHelper;
