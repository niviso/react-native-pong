const ContextHelper = {
  setState : null,
  state: null,
  UpdateState: function(setState,state,newState){
      setState({...state,...newState});
  },

}

export default ContextHelper;
