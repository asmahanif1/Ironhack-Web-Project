class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
console.log(this.gameScreen)
      this.player = new Player(
        this.gameScreen,
        200,
        300,
        150,
        150,
        "./images/fish.png"
      );

      this.lives1 = document.getElementById("one")
      this.lives2 = document.getElementById("two")
      this.lives3 = document.getElementById("three")
      console.log(this.lives1, this.lives2, this.lives3);

      this.sound = new Audio(`./sounds/gameSound.wav`);
      this.height = 600;
      this.width = 500;
      this.obstacles = [];
      this.bonuses = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameIntervalId;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps
    }
  
    start() {
      // Set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
      this.sound.play();
      this.sound.loop = true; 
  
      // Hide the start screen
      this.startScreen.style.display = "none";
      
      // Show the game screen
      this.gameScreen.style.display = "block";
  
      // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
      this.gameIntervalId = setInterval(() => {
        this.gameLoop()
      }, this.gameLoopFrequency)
    }
  
    gameLoop() {
      console.log("in the game loop");
      
      this.update();
  
      // If "gameIsOver" is set to "true" clear the interval to stop the loop
      if (this.gameIsOver) {
        clearInterval(this.gameIntervalId)
      }
    }
  
    update() {
        
            
       
      this.player.move();
       // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move();
        obstacle.sound.play();
  
        // If the player's car collides with an obstacle
        if (this.player.didCollide(obstacle)) {
          // Remove the obstacle element from the DOM
          obstacle.element.remove();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Reduce player's lives by 1
          this.lives--;
          
          document.getElementById("lives").innerText = this.lives;
          
          if(this.lives == "2"){
            this.lives3.style.display = "none";
          }
          if(this.lives == "1"){
            this.lives2.style.display = "none";
          }
          if(this.lives == "0"){
            this.lives1.style.display = "none";
          }

          // Update the counter variable to account for the removed obstacle
          i--;
          console.log(obstacle.left,this.width)
        } // If the obstacle is off the screen (at the left)
        else if (obstacle.left < 0) {
          // Increase the score by 1
          this.score++;
          document.getElementById("score").innerText = this.score;
          // Remove the obstacle from the DOM
          obstacle.element.remove();
          obstacle.sound.pause();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Update the counter variable to account for the removed obstacle
          i--;
        }
      }
      for (let i = 0; i < this.bonuses.length; i++) {
        const bonus = this.bonuses[i];
        bonus.move();
  
        // If the player's car collides with an obstacle
        if (this.player.didCollide(bonus)) {
          // Remove the obstacle element from the DOM
          bonus.element.remove();
          // Remove obstacle object from the array
          this.bonuses.splice(i, 1);
          // Reduce player's lives by 1
          this.score += 5;
          
          document.getElementById("score").innerText = this.score;
          // Update the counter variable to account for the removed obstacle
          i--;
       
        } // If the obstacle is off the screen (at the left)
        else if (bonus.top > this.height) {
          
          // Remove the obstacle from the DOM
          bonus.element.remove();
          // Remove obstacle object from the array
          this.bonuses.splice(i, 1);
          // Update the counter variable to account for the removed obstacle
          i--;
        }
      }
      // If the lives are 0, end the game
      if (this.lives === 0) {
        this.endGame();
      }
  
      // Create a new obstacle based on a random probability
      // when there is no other obstacles on the screen
      if (Math.random() > 0.98 && this.bonuses.length < 1) {
        this.bonuses.push(new Bonus(this.gameScreen));
      }
      if (Math.random() > 0.98 && this.obstacles.length < 1) {
        this.obstacles.push(new Obstacle(this.gameScreen));
        
      }
    }

   
    
    
    endGame() {

        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.bonuses.forEach(bonus=> bonus.element.remove());
        this.gameIsOver = true;
    
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
      }
  }