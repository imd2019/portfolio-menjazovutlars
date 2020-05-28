import Button from "./button.js";

export default class Board extends Button {
  constructor(x, y, width, height, title, dice, active, nextTurn, players) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.active = active;
    this.title = title;
    this.color = (255, 255, 255);
    this.result = false;
    this.dice = dice;
    this.game = 1;
    this.players = players;
    this.nextPlayer = false;
    this.nextGame = false;
    this.nextTurn = nextTurn;
    this.gameIsOver = false;

    this.combinations = false;
    this.pair = false;
    this.threeOfAKind = false;
    this.fourOfAKind = false;
    this.fiveOfAKind = false;
    this.kniffel = false;
    this.fullHouse = false;
    this.smallstraight = false;
    this.largestraight = false;

    this.aces = this.game - 1;
    this.twos = this.game + 3;
    this.threes = this.game + 7;
    this.fours = this.game + 11;
    this.fives = this.game + 15;
    this.six = this.game + 19;
    this.total = this.game + 23;
    this.bonus = this.game + 27;
    this.totalTop = this.game + 31;
    this.rowThreeOfAKind = this.game + 35;
    this.rowFourOfAKind = this.game + 39;
    this.rowFullHouse = this.game + 43;
    this.rowSmallStraight = this.game + 47;
    this.rowLargeStraight = this.game + 51;
    this.rowKniffel = this.game + 55;
    this.rowChance = this.game + 59;
    this.totalBottom = this.game + 63;
    this.totalTop2 = this.game + 67;
    this.grandTotal = this.game + 71;
  }

  clear(board) {
    for (let index in board) {
      if (board[index].active) {
        board[index].result = false;
      }
    }
    this.pair = false;
    this.threeOfAKind = false;
    this.fourOfAKind = false;
    this.fiveOfAKind = false;
    this.kniffel = false;
    this.fullHouse = false;
    this.smallstraight = false;
    this.largestraight = false;
  }

  getOccurence() {
    let a = [];
    for (let index in this.dice) {
      let v = this.dice[index].value;
      a.push(v);
    }

    this.combinations = a.reduce(function (dices, values) {
      dices[values] = ++dices[values] || 1;
      return dices;
    }, []);
    return this.combinations;
  }

  findCombinations() {
    for (let index in this.combinations) {
      if (this.combinations[index] == 2) {
        this.pair = true;
      }

      if (this.combinations[index] == 3) {
        this.threeOfAKind = true;
      }

      if (this.combinations[index] == 4) {
        this.threeOfAKind = true;
        this.fourOfAKind = true;
      }

      if (this.combinations[index] == 5) {
        this.threeOfAKind = true;
        this.fourOfAKind = true;
        this.fiveOfAKind = true;
      }

      if (this.combinations[index] == 5) {
        this.threeOfAKind = true;
        this.fourOfAKind = true;
        this.fiveOfAKind = true;
        this.kniffel = true;
      }

      if (
        (this.pair == true && this.threeOfAKind == true) ||
        this.kniffel == true
      ) {
        this.fullHouse = true;
      }

      if (
        this.combinations[2] &&
        this.combinations[3] &&
        this.combinations[4] &&
        this.combinations[5] &&
        (this.combinations[1] || this.combinations[6])
      ) {
        this.largestraight = true;
      }

      if (
        this.combinations[3] &&
        this.combinations[4] &&
        ((this.combinations[1] && this.combinations[2]) ||
          (this.combinations[2] && this.combinations[5]) ||
          (this.combinations[5] && this.combinations[6]))
      ) {
        this.smallstraight = true;
      }
    }
  }

  selectColumn(board) {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    let f = 0;

    if (this.combinations[1]) {
      a = this.combinations[1] * 1;
    }

    if (this.combinations[2]) {
      b = this.combinations[2] * 2;
    }

    if (this.combinations[3]) {
      c = this.combinations[3] * 3;
    }

    if (this.combinations[4]) {
      d = this.combinations[4] * 4;
    }

    if (this.combinations[5]) {
      e = this.combinations[5] * 5;
    }

    if (this.combinations[6]) {
      f = this.combinations[6] * 6;
    }

    if (board[this.aces].active) {
      board[this.aces].result = a;
    }

    if (board[this.twos].active) {
      board[this.twos].result = b;
    }

    if (board[this.threes].active) {
      board[this.threes].result = c;
    }

    if (board[this.fours].active) {
      board[this.fours].result = d;
    }
    if (board[this.fives].active) {
      board[this.fives].result = e;
    }

    if (board[this.six].active) {
      board[this.six].result = f;
    }

    if (
      !board[this.aces].active &&
      !board[this.twos].active &&
      !board[this.threes].active &&
      !board[this.fours].active &&
      !board[this.fives].active &&
      !board[this.six].active
    ) {
      board[this.total].result =
        board[this.aces].result +
        board[this.twos].result +
        board[this.threes].result +
        board[this.fours].result +
        board[this.fives].result +
        board[this.six].result;
      board[this.total].active = false;
    }

    if (board[this.total].result >= 63) {
      board[this.bonus].result = 35;
      board[this.bonus].active = false;
    }

    if (board[this.total].result < 63 && board[this.total].active == false) {
      board[this.bonus].result = 0;
      board[this.bonus].active = false;
    }

    if (!board[this.total].active && !board[this.bonus].active) {
      board[this.totalTop].result =
        board[this.total].result + board[this.bonus].result;
      board[this.totalTop].active = false;
      board[this.totalTop2].result =
        board[this.total].result + board[this.bonus].result;
      board[this.totalTop2].active = false;
    }

    if (board[this.rowThreeOfAKind].active) {
      if (
        this.threeOfAKind == true ||
        this.fourOfAKind == true ||
        this.fiveOfAKind == true ||
        this.kniffel == true
      ) {
        board[this.rowThreeOfAKind].result = a + b + c + d + e + f;
      }
    }

    if (board[this.rowFourOfAKind].active) {
      if (
        this.fourOfAKind == true ||
        this.fiveOfAKind == true ||
        this.kniffel == true
      ) {
        board[this.rowFourOfAKind].result = a + b + c + d + e + f;
      }
    }

    if (
      (this.fullHouse == true || this.kniffel == true) &&
      board[this.rowFullHouse].active
    ) {
      board[this.rowFullHouse].result = 25;
    }

    if (
      (this.smallstraight == true || this.largestraight == true) &&
      board[this.rowSmallStraight].active
    ) {
      board[this.rowSmallStraight].result = 30;
    }

    if (this.largestraight == true && board[this.rowLargeStraight].active) {
      board[this.rowLargeStraight].result = 40;
    }

    if (
      (this.fiveOfAKind == true || this.kniffel == true) &&
      board[this.rowKniffel].active
    ) {
      board[this.rowKniffel].result = 50;
    }

    if (board[this.rowChance].active) {
      board[this.rowChance].result = a + b + c + d + e + f;
    }

    if (
      !board[this.rowThreeOfAKind].active &&
      !board[this.rowFourOfAKind].active &&
      !board[this.rowFullHouse].active &&
      !board[this.rowSmallStraight].active &&
      !board[this.rowLargeStraight].active &&
      !board[this.rowKniffel].active &&
      !board[this.rowChance].active
    ) {
      board[this.totalBottom].result =
        board[this.rowThreeOfAKind].result +
        board[this.rowFourOfAKind].result +
        board[this.rowSmallStraight].result +
        board[this.rowLargeStraight].result +
        board[this.rowFullHouse].result +
        board[this.rowKniffel].result +
        board[this.rowChance].result;
      board[this.totalBottom].active = false;
    }

    if (
      !board[this.rowThreeOfAKind].active &&
      !board[this.rowFourOfAKind].active &&
      !board[this.rowFullHouse].active &&
      !board[this.rowSmallStraight].active &&
      !board[this.rowLargeStraight].active &&
      !board[this.rowKniffel].active &&
      !board[this.rowChance].active
    ) {
      board[this.totalBottom].result =
        board[this.rowThreeOfAKind].result +
        board[this.rowFourOfAKind].result +
        board[this.rowSmallStraight].result +
        board[this.rowLargeStraight].result +
        board[this.rowFullHouse].result +
        board[this.rowKniffel].result +
        board[this.rowChance].result;
      board[this.totalBottom].active = false;
    }

    if (!board[this.totalBottom].active && !board[this.totalTop2].active) {
      board[this.grandTotal].result =
        board[this.totalBottom].result + board[this.totalTop2].result;
      board[this.grandTotal].active = false;
    }
    if (
      this.game == this.players &&
      !board[this.totalBottom].active &&
      !board[this.totalTop2].active &&
      !board[this.grandTotal].active
    ) {
      this.gameOver();
    }
  }

  nextPlayerTurn() {
    if (this.game <= this.players && this.nextPlayer == true) {
      this.aces = this.game - 1;
      this.twos = this.game + 3;
      this.threes = this.game + 7;
      this.fours = this.game + 11;
      this.fives = this.game + 15;
      this.six = this.game + 19;
      this.total = this.game + 23;
      this.bonus = this.game + 27;
      this.totalTop = this.game + 31;
      this.rowThreeOfAKind = this.game + 35;
      this.rowFourOfAKind = this.game + 39;
      this.rowFullHouse = this.game + 43;
      this.rowSmallStraight = this.game + 47;
      this.rowLargeStraight = this.game + 51;
      this.rowKniffel = this.game + 55;
      this.rowChance = this.game + 59;
      this.totalBottom = this.game + 63;
      this.totalTop2 = this.game + 67;
      this.grandTotal = this.game + 71;
    }
    if (this.game > this.players && this.nextPlayer == true) {
      this.game = 1;
      this.aces = this.game - 1;
      this.twos = this.game + 3;
      this.threes = this.game + 7;
      this.fours = this.game + 11;
      this.fives = this.game + 15;
      this.six = this.game + 19;
      this.total = this.game + 23;
      this.bonus = this.game + 27;
      this.totalTop = this.game + 31;
      this.rowThreeOfAKind = this.game + 35;
      this.rowFourOfAKind = this.game + 39;
      this.rowFullHouse = this.game + 43;
      this.rowSmallStraight = this.game + 47;
      this.rowLargeStraight = this.game + 51;
      this.rowKniffel = this.game + 55;
      this.rowChance = this.game + 59;
      this.totalBottom = this.game + 63;
      this.totalTop2 = this.game + 67;
      this.grandTotal = this.game + 71;
    }
  }

  gameOver() {
    this.gameIsOver = true;
  }

  hovered() {
    if (this.hitTest(mouseX, mouseY)) {
      fill(150, 150, 150, 80);
    }
  }

  display() {
    if (this.active) {
      fill(240, 240, 240);
      stroke(this.color);
      strokeWeight(1);
      if (this.game == 1) {
        this.color = "orange";
      }
      if (this.game == 2) {
        this.color = "green";
      }
      if (this.game == 3) {
        this.color = "blue";
      }
      if (this.game == 4) {
        this.color = "red";
      }
    } else {
      fill(150, 150, 150, 80);
      stroke(255, 255, 255);
      strokeWeight(1);
    }
    this.hovered();

    rect(this.x, this.y, this.width, this.height, 1);
    fill(0, 0, 0);
    noStroke();
    textFont("Helvetica");
    textAlign(CENTER);
    textSize(10);
    if (!this.result) {
      text(this.title, this.x, this.y + this.height / 2, this.width);
    } else {
      text(this.result, this.x, this.y + this.height / 2, this.width);
    }
  }

  clicked() {
    if (this.active) {
      this.active = false;
      this.nextTurn();
    }
  }
}
