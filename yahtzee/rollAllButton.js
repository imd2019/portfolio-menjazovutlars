import Button from "./button.js";

export default class RollAllButton extends Button {
  constructor(title, x, y, width, height, message, color, dice,nextTurn) {
    super(title, x, y, width, height, message, color);
    this.dice = dice;
    this.turns = 2;
    this.active = true;
    this.gameOver = false;
    this.nextTurn = nextTurn;
  }

  display() {
    if (this.active) {
      fill(this.color);
    } else {
      fill(150, 150, 150);
    }
    stroke(0, 0, 0);
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height, 10);
    fill("black");
    noStroke();
    textFont('Arial');
    textAlign(CENTER, CENTER);
    textSize(this.width / 2 / (this.height * 0.1));
    text(this.title, this.x, this.y + this.height / 2, this.width);
    textAlign(CENTER, CENTER);
    textSize(this.width / 2 / (this.height * 0.1));
    text(
      "Rolls left: " + this.turns,
      this.x + 150,
      this.y + this.height / 2,
      this.width
    );
  }

  nextGame(board) {
    for (let index in board){
    if (board[index].nextGame == true){
      this.gameOver = true;
    
    }
    board[index].nextGame = false;
  }
  }

  clicked() {
    if (this.active) {
      if (this.turns > 0) {
        for (let index in this.dice) {
          this.dice[index].roll();
        }
        this.turns -= 1;
      }
      if (this.turns == 0){
        for (let index in this.dice) {
          this.dice[index].roll();
        }
        this.active = false;
      }
    }

    if (this.gameOver == true) {
      for (let index in this.dice) {
        this.dice[index].active = true;
        this.dice[index].roll();
      }
      this.gameOver = false;
      this.nextTurn;
    }
  }
}
