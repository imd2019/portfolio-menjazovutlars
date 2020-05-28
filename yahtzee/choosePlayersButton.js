import Button from "./button.js";

export default class ChoosePlayersButton extends Button {
  constructor(title, x, y, players, color) {
    super(title, x, y, width, height, color);
    this.x = x;
    this.y = y;
    this.color = color;
    this.title = title;
    this.players = players;
    this.width = 55;
    this.height = 25;
    this.active = true;
    this.chosen = false;
  }

  clicked() {
    if (this.active) this.active = false;
  }

  display() {
    if (this.active) {
      fill(this.color);
    } else {
      fill(150, 150, 150);
    }
    if (this.chosen) {
      fill("yellow");
    }
    stroke(0, 0, 0);
    rect(this.x, this.y, this.width, this.height, 10);
    fill("black");
    noStroke();
    textAlign(CENTER);
    text(this.title, this.x, this.y + this.height / 2, this.width);
  }
}
