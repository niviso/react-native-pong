import { Audio } from 'expo-av';


const AudioHelper = {
    list: [],
    muted: false,
    isInList: function(file){
      return this.list.findIndex(file) === 1;
    },
    init: async function(file,fileName,volume,looping,pitch){
      let newAudio =  new Audio.Sound();

      this.list[fileName] = {audio: newAudio, file: file};
      try{
      await Audio.setIsEnabledAsync(true);
      await this.list[fileName].audio.loadAsync(this.list[fileName].file);
      await this.list[fileName].audio.playAsync();
      if(volume){
        await this.list[fileName].audio.setVolumeAsync(volume);
      }
      if(looping){
        this.list[fileName].audio.setIsLoopingAsync(true);
      }
      if(this.muted){
        this.mute(fileName);
      }
      if(pitch){
        this.list[fileName].audio.setRateAsync(pitch,true,1);
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
    findIndex: function(file){
      return this.list.findIndex(file);
    },
    play: async function(file,loop=false,volume=1){
      try {
      if(!this.list[file]){
        this.init(file,volume,loop);
      } else {
        await this.list[file].audio.playAsync();
      }
      } catch(e){
          console.log("No bueno",file.toString());
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
