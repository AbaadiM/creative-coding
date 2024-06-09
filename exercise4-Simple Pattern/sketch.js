function setup() {
  createCanvas(400, 400);
  noLoop(); // Draw only once
}

function draw() {
  background(255); // White background

  let cols = 10; // Number of columns
  let rows = 10; // Number of rows
  let circleSize = 40; // Diameter of each circle
  let padding = 10; // Space between circles

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * (circleSize + padding) + padding;
      let y = j * (circleSize + padding) + padding;
      
      if ((i + j) % 2 === 0) {
        fill(0, 102, 153); // Blue color
      } else {
        fill(255, 204, 0); // Yellow color
      }
      ellipse(x, y, circleSize, circleSize);
    }
  }
}
