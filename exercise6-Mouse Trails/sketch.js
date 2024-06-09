let d = 30; // Diameter of the heart
let x, y;
let c;
let heartColor = '#FF69B4'; // Pink color for hearts

function setup() {
  c = createCanvas(400, 400);
  background("#2D3250");
  noStroke();
  // Move the mouse off the canvas initially to avoid drawing at (0, 0)
  mouseX = -d;
  mouseY = -d;
}

function draw() {
  // Draw the heart trail when hovering
  if (mouseIsPressed) {
    fill(heartColor);
    drawHeart(mouseX, mouseY, d);
  }
}

function keyPressed() {
  if (key == 'A' || key == 'a') {
    saveCanvas(c, 'Mouse_Interactive_Activity', 'jpg');
  }
}

function mouseMoved() {
  // Update the position of the heart based on mouse movement
  x = mouseX;
  y = mouseY;
  // Draw a smaller heart to make it more visible
  fill(heartColor);
  drawHeart(x, y, d / 2);
}

// Function to draw a heart shape
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y + size / 2);
  bezierVertex(x + size / 2, y, x + size, y - size / 3, x, y - size);
  bezierVertex(x - size, y - size / 3, x - size / 2, y, x, y + size / 2);
  endShape(CLOSE);
}
