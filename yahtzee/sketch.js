import Dice from "./dice.js";
import RollAllButton from "./rollAllButton.js";
import Board from "./board.js";
import ChoosePlayersButton from "./choosePlayersButton.js";
import GameOverButton from "./gameOverButton.js";
// import Aces from "./aces.js";

let responsiveX = windowWidth / 200;
let responsiveY = windowHeight / 400;

let dice = [];
for (let i = 0; i < 5; i++) {
  let d = new Dice(245 + i * 55 + responsiveX, 100 + responsiveY, 40);
  dice.push(d);
}

let rollAll = new RollAllButton(
  "Roll",
  245 + responsiveX,
  20 + responsiveY,
  125,
  40,
  "Roll",
  "yellow",
  dice,
  nextTurn
);

let choosePlayersButtons = [];
for (let j = 0; j < 4; j++) {
  for (let i = 0; i < 1; i++) {
    let title = ["1 Player", "2 Players", "3 Players", "4 Players"];
    let playersID = [1, 2, 3, 4];
    let cPB = new ChoosePlayersButton(
      title[j],
      120 + i * 20 + responsiveX,
      25 + j * 30 + responsiveY,
      playersID[j],
      "white"
    );
    choosePlayersButtons.push(cPB);
    console.log(choosePlayersButtons);
  }
}

let boardDescription = [];
for (let j = 0; j < 19; j++) {
  for (let i = 0; i < 1; i++) {
    let title = [
      "Aces",
      "Twos",
      "Threes",
      "Fours",
      "Fives",
      "Six",
      "Total",
      "Bonus",
      "Total Top",
      "Three Of A Kind",
      "Four Of A Kind",
      "Full House",
      "Small Straight",
      "Large Straight",
      "Yahtzee",
      "Chance",
      "Total Bottom",
      "Total Top",
      "Grand Total",
    ];
    let bD = new Board(
      100 + i * 80 + responsiveX,
      200 + j * 21 + responsiveY,
      110,
      20,
      title[j],
      false
    );
    boardDescription.push(bD);
  }
}

let boardPlayers = [];
for (let j = 0; j < 1; j++) {
  for (let i = 0; i < 4; i++) {
    let title = ["Player 1", "Player 2", "Player 3", "Player 4"];
    let bP = new Board(
      212 + i * 80 + responsiveX,
      178 + j + responsiveY,
      80,
      20,
      title[i],
      false
    );
    boardPlayers.push(bP);
  }
}

let board = [];
for (let j = 0; j < 19; j++) {
  for (let i = 1; i < 5; i++) {
    let b = new Board(
      132 + i * 80 + responsiveX,
      200 + j * 21 + responsiveY,
      80,
      20,
      " ",
      dice,
      true,
      nextTurn,
      playerCount
    );
    board.push(b);
  }
}

let gameOverButton = new GameOverButton(
  "Start Again!",
  175 + responsiveX,
  300 + responsiveY
);
let players = 0;

function mouseClicked() {
  for (let index in dice) {
    dice[index].mouseClicked();
  }
  for (let index in board) {
    board[index].mouseClicked();
  }
  for (let index in choosePlayersButtons) {
    choosePlayersButtons[index].mouseClicked();
  }
  rollAll.mouseClicked();
  playerCount();
  gameOverButton.mouseClicked(board);
}

function playerCount() {
  for (let index in choosePlayersButtons) {
    if (
      choosePlayersButtons[index].title == "1 Player" &&
      choosePlayersButtons[index].hitTest(mouseX, mouseY)
    ) {
      players = 1;
      choosePlayersButtons[index].chosen = true;
    }
    if (
      choosePlayersButtons[index].title == "2 Players" &&
      choosePlayersButtons[index].hitTest(mouseX, mouseY)
    ) {
      players = 2;
      choosePlayersButtons[index].chosen = true;
    }
    if (
      choosePlayersButtons[index].title == "3 Players" &&
      choosePlayersButtons[index].hitTest(mouseX, mouseY)
    ) {
      players = 3;
      choosePlayersButtons[index].chosen = true;
    }
    if (
      choosePlayersButtons[index].title == "4 Players" &&
      choosePlayersButtons[index].hitTest(mouseX, mouseY)
    ) {
      players = 4;
      choosePlayersButtons[index].chosen = true;
    }

    choosePlayersButtons[index].active = false;

    for (let index in board) {
      board[index].players = players;
    }
  }
}

function nextTurn() {
  rollAll.turns = 2;
  rollAll.active = true;
  for (let index in dice) {
    dice[index].active = true;
    dice[index].roll();
  }
  for (let index in board) {
    board[index].game += 1;
    board[index].nextPlayer = true;
    if (board[index].gameIsOver == true) {
      gameOverButton.active = true;
    }
  }
}

function draw() {
  for (let index in dice) {
    dice[index].display();
  }

  for (let index in board) {
    if (board[index].gameIsOver == true) {
      gameOverButton.active = true;
    }
    board[index].display();
    board[index].clear(board);
    board[index].getOccurence();
    board[index].findCombinations();
    board[index].selectColumn(board);
    board[index].nextPlayerTurn();
  }

  for (let index in boardDescription) {
    boardDescription[index].display();
  }

  for (let index in boardPlayers) {
    boardPlayers[index].display();
  }
  for (let index in choosePlayersButtons) {
    choosePlayersButtons[index].display();
  }
  if (gameOverButton.active == true) {
    gameOverButton.display();
  }
  rollAll.display();
  rollAll.nextGame(board);
}

window.draw = draw;
window.mouseClicked = mouseClicked;
window.mouseX = mouseX;
window.mouseY = mouseY;
