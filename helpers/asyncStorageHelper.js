import { AsyncStorage } from "react-native";

const AsyncStorageHelper = {

    get: async function(key) {
            //Note when fetching remember get(x).then(response=>{console.log(response)});
            try {
              return await AsyncStorage.getItem(key);
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }


    },
    set: function(key,data){
        try{
            return AsyncStorage.setItem(key, data);
        } catch(error){
            console.log(error.message);
        }
    }

};
export default AsyncStorageHelper;
