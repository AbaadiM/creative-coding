var font;

function preload() {
  font = loadFont("Super Normal.ttf");
}

var points1, points2;

function setup() {
  createCanvas(400, 400);
  background("#000000");
  // Define colors
  var mainColor = color(255); // White color for "BATH SPA"
  var otherColor = color(255, 204, 0); // Custom color for "UNIVERSITY"

  // Load font and generate points for the text "BATH SPA"
  points1 = font.textToPoints('BATH SPA', 60, 175, 60, { sampleFactor: 0.20 });

  // Draw circles for the text "BATH SPA" in white color
  fill(mainColor);
  noStroke();
  for (var i = 0; i < points1.length; i++) {
    var p = points1[i];
    ellipse(p.x, p.y, 3, 3);
  }

  // Generate points for the text "UNIVERSITY"
  points2 = font.textToPoints('UNIVERSITY', 60, 250, 50, { sampleFactor: 0.20 });

  // Draw circles for the text "UNIVERSITY" in a different color
  fill(otherColor);
  noStroke();
  for (var j = 0; j < points2.length; j++) {
    var q = points2[j];
    ellipse(q.x, q.y, 3, 3);
  }
}
