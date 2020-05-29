let sketch = new p5();
let width = windowWidth;
let height = windowHeight;

function setup() {
  let s = sketch.createCanvas(windowWidth / 3, windowHeight / 1.2);
  sketch.frameRate(30);
  s.parent("sketch-holder");
}
window.setup = setup;

function windowResized() {
  sketch.resizeCanvas(windowWidth / 3, windowHeight / 1.2);
}
window.addEventListener("resize", windowResized);
