

const Engine = {
  screenWidth : null,
  screenHeight: null,
  speed: 5,
  initialized: false,
  init: function(props){
    const {screenWidth,screenHeight,speed=5} = props;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.speed = speed;
    this.initialized = true;
  },
  getNewPosition: function(state,speed){
    if(!this.initialized){
      return state;
    }
  var tmpState = JSON.parse(JSON.stringify(state));

  const collisionLeft = tmpState.ball.transform.position.x <= 0;
  const collisionRight =  (tmpState.ball.transform.position.x+tmpState.ball.transform.size.width > this.screenWidth) && (tmpState.ball.transform.position.x < this.screenWidth);
  const collisionBottom = (tmpState.ball.transform.position.y+tmpState.ball.transform.size.height > this.screenHeight) && (tmpState.ball.transform.position.y < this.screenHeight);
  const collisionTop = tmpState.ball.transform.position.y < 0;

  const collisionWithCharacterX = tmpState.ball.transform.position.x < (tmpState.player1.transform.position.x+tmpState.player1.transform.size.width);
  const collisionWithCharacterY = (tmpState.ball.transform.position.y > tmpState.player1.transform.position.y) && (tmpState.ball.transform.position.y < tmpState.player1.transform.position.y+tmpState.player1.transform.size.height);
  const collidingWithCharacter = collisionWithCharacterX && collisionWithCharacterY;

  const collisionWithCharacterX_02 = (tmpState.ball.transform.position.x > tmpState.player2.transform.position.x-tmpState.player2.transform.size.width);
  const collisionWithCharacterY_02 = (tmpState.ball.transform.position.y > tmpState.player2.transform.position.y) && (tmpState.ball.transform.position.y < tmpState.player2.transform.position.y+tmpState.player2.transform.size.height);
  const collidingWithCharacter_02 = collisionWithCharacterX_02 && collisionWithCharacterY_02;


  tmpState.ball.colliding = (collidingWithCharacter || collidingWithCharacter_02 || collisionBottom || collisionTop);


  if(tmpState.ball.colliding){
    if(this.speed < 10){
        this.speed += 0.1;
      }

      if(collidingWithCharacter){
        tmpState.ball.transform.directionVector.x = 1;
        tmpState.ball.transform.position.x = tmpState.player1.transform.position.x + tmpState.player1.transform.size.width;
        tmpState.ball.collisionTarget = "player1";

      }
      if(collidingWithCharacter_02){
        tmpState.ball.transform.directionVector.x = -1;
        tmpState.ball.transform.position.x = tmpState.player2.transform.position.x - tmpState.ball.transform.size.width;
        tmpState.ball.collisionTarget = "player2";

      }


    if(collisionTop){
      tmpState.ball.transform.directionVector.y = 1;
      //tmpState.ball.transform.position.y = 0;
      tmpState.ball.collisionTarget = "top";

    }
    if(collisionBottom){
      tmpState.ball.transform.directionVector.y = -1;
      //tmpState.ball.transform.position.y = this.screenHeight - tmpState.ball.transform.size.height;
      tmpState.ball.collisionTarget = "bottom";


    }

    if(collisionRight || collisionLeft){
      tmpState.ball.transform.position.x = this.screenWidth/2;
      tmpState.ball.transform.position.y = this.screenHeight/2;
      this.speed = 5;
      if(collisionRight){
        tmpState.player1.points++;
      }else {
        tmpState.player2.points++;

      }
    }

    }

    return tmpState;
  }


}

export default Engine;
