function setup() {
  createCanvas(400, 400);
}

function draw() {
  // Set the background color
  background(14, 144, 181);
  
  // Car body
  fill(200, 0, 0); // Red color for the car body
  rect(100, 200, 200, 50);
  
  // Car roof
  fill(200, 0, 0); // Red color for the car roof
  rect(150, 170, 100, 50);
  
  // Car windows
  fill(135, 206, 235); // Sky blue color for the windows
  rect(160, 180, 30, 30); // Left window
  rect(210, 180, 30, 30); // Right window
  
  // Left tire
  fill(0); // Black color for the tires
  ellipse(140, 260, 50, 50);
  
  // Right tire
  fill(0); // Black color for the tires
  ellipse(260, 260, 50, 50);
}