const AssetsTemplates = {
  Ball: function(){
      return {
            transform: {
              position: {
                x: 0,
                y: 0
              },
              size: {
                width: 25,
                height: 25
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
  Player: function(){
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

export default AssetsTemplates;
