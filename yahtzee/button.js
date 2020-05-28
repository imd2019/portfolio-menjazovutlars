export default class Button {
    constructor(title, x, y, width, height, message, color) {
      this.title = title;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.message = message;
      this.color = color;
    }
  
    display() {
      fill(this.color);
      stroke(0,0,0);
      rect(this.x, this.y, this.width, this.height, 10);
      fill("black");
      noStroke();
      textAlign(CENTER);
    //   textSize(25);
      text(this.title, this.x, this.y + this.height /2, this.width);
    }
  
    hitTest(x,y) {
      if (
        x >= this.x &&
        x <= this.x + this.width &&
        y >= this.y &&
        y <= this.y + this.height
      ) {
        return true;
      }
    }

    clicked() {
        console.log("Yeet");
    }
  
    mouseClicked(){
        if (this.hitTest(mouseX, mouseY)) {
            this.clicked();
        }
    }
  }