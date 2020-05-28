import Button from "./button.js";

export default class Dice extends Button {
  constructor (x,y, size) {
    super('dice',x,y, width, height, 'test', 'white');
    this.value = this.diceResult();
    this.active = true;
    this.size = size;
    this.width = size;
    this.height = size;

  }

  diceResult() {
          return floor(random() * 6 + 1);
        }
      
  roll() {
          if (this.active) { this.value=this.diceResult();
          return this.value;
         }
        }
      
  display() {
          if (this.active) {
            fill(this.color);
          } else {
            fill(150, 150, 150);
          }
          stroke(0, 0, 0);
          strokeWeight(2);
          rect(this.x, this.y, this.width, this.height, 6);
          fill(0, 0, 0);
          noStroke();
          if (this.value == 1) {
            ellipse(this.x + this.width*0.5, this.y + this.height*0.5, this.size*0.2);
          } else if (this.value == 2) {
            ellipse(this.x + this.width*0.25, this.y + this.height*0.25, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.75, this.size*0.2);
          } else if (this.value == 3) {
            ellipse(this.x + this.width*0.25, this.y + this.height*0.25, this.size*0.2);
            ellipse(this.x + this.width*0.5, this.y + this.height*0.5, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.75, this.size*0.2);
          } else if (this.value == 4) {
            ellipse(this.x + this.width*0.25, this.y + this.height*0.25, this.size*0.2);
            ellipse(this.x + this.width*0.25, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.25, this.size*0.2);
          } else if (this.value == 5) {
            ellipse(this.x + this.width*0.5, this.y + this.height*0.5, this.size*0.2);
            ellipse(this.x + this.width*0.25, this.y + this.height*0.25, this.size*0.2);
            ellipse(this.x + this.width*0.25, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.25, this.size*0.2);
          } else if (this.value == 6) {
            ellipse(this.x + this.width*0.25, this.y + this.height*0.25, this.size*0.2);
            ellipse(this.x + this.width*0.25, this.y + this.height*0.5, this.size*0.2);
            ellipse(this.x + this.width*0.25, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.75, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.5, this.size*0.2);
            ellipse(this.x + this.width*0.75, this.y + this.height*0.25, this.size*0.2);
          }
}

clicked() {
  if (this.active) {
    this.active = false;
  } else {
    this.active = true;
  }
}
}