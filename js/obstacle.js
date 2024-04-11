class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = 500
      this.top = Math.floor(Math.random() * 300 + 70);;
      this.width = 100;
      this.height = 150;
      this.element = document.createElement("img");
  
      this.element.src = "./images/hurdle1.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      // Move the obstacle down by 3px
      this.left -= 3;
      // Update the obstacle's position on the screen
      this.updatePosition();
    }
}