import Button from "./button.js";

export default class GameOverButton extends Button {
  constructor(title, x, y) {
    super(title, x, y, width, height, color);
    this.title = title;
    this.x = x;
    this.y = y;
    this.width = 300;
    this.height = 100;
    this.color = "white";
    this.active = false;
  }

  display() {
    fill(150, 150, 150, 80);
    rect(0, 0, windowWidth, windowHeight);
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(this.color);
    stroke("yellow");
    strokeWeight(3);
    rect(this.x, this.y, this.width, this.height, 10);
    fill("black");
    noStroke();
    textAlign(CENTER);
    textSize(25);
    text(this.title, this.x, this.y + this.height / 2, this.width);
  }

  clicked(board) {
    if (this.active) {
      window.location.reload();
      this.active = false;
    }
    for (let index in board) {
      board[index].gameIsOver = false;
    }
  }

  mouseClicked(board) {
    if (this.hitTest(mouseX, mouseY)) {
      this.clicked(board);
    }
  }
}
