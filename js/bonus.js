class Bonus extends Obstacle{
    constructor(gameScreen){
        super(gameScreen);
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 70;
        this.height = 70;
        this.element = document.createElement("img");
        this.collisionSound = new Audio(`./sounds/bonus.wav`)
    
        this.element.src = "./images/star.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    
        this.gameScreen.appendChild(this.element);
    }
    updatePosition() {
        // Update the bonus' position based on the properties left and top
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }
    
      move() {
        // Move the bonus down by 3px
        this.top += 3;
        // Update the bonus' position on the screen
        this.updatePosition();
      }
}