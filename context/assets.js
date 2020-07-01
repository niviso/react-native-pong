const Assets = {
  ball: function(){
      return {
            transform: {
              position: {
                x: 0,
                y: 0
              },
              size: {
                width: 30,
                height: 30
              },
              directionVector: {
                x: 1,
                y: 0.5
              }
            },
            colliding: false,
            dead: false
          }
  },
  player: function(){
    return {
      transform: {
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 25,
          height: 125
        },
        directionVector: {
          x: 0,
          y: 0
        }
      },
      points: 0
    }
  }

}

export default Assets;
