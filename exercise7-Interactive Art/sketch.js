let mic;
let fft;
let points = [];
let mult = 0.005;
let textX, textY;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(1);
  
  // Create an FFT object
  fft = new p5.FFT();
  
  // Initialize the microphone input
  mic = new p5.AudioIn();
  mic.start();

  let density = 50;
  let space = width / density;
  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }
  
  textX = width / 2;
  textY = height / 2;
  textAlign(CENTER, CENTER);
}

function draw() {
  // Analyze the frequency spectrum of the microphone input
  let spectrum = fft.analyze();
  
  // Clear the background
  background(0);

  // Draw the points
  for (let i = 0; i < points.length; i++) {
    let r = map(spectrum[i], 0, 255, 0, 255);
    let g = map(i, 0, points.length, 0, 255);
    let b = map(i, 0, points.length, 255, 0);
    fill(r, g, b, 150);
    let angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720);
    points[i].add(createVector(cos(angle), sin(angle)));
    ellipse(points[i].x, points[i].y, 1);
  }
  
  // Display the text with gradient fill
  let gradient = drawingContext.createLinearGradient(textX - 100, textY - 40, textX + 100, textY + 40);
  gradient.addColorStop(0, '#ff00ff');
  gradient.addColorStop(0.5, '#00ffff');
  gradient.addColorStop(1, '#ffff00');
  drawingContext.fillStyle = gradient;
  textSize(40);
  text("Bath Spa", textX, textY - 20);
  text("University", textX, textY + 20);

  // Generate expanding circles around the mouse position
  let c = new Circle(mouseX, mouseY);
  circles.push(c);
  
  // Display and update the circles
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();
    if (circles[i].alpha <= 0) {
      circles.splice(i, 1);
    }
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 255;
  }

  update() {
    this.radius += 5;
    this.alpha -= 3;
  }

  display() {
    noFill();
    stroke(255, this.alpha);
    ellipse(this.x, this.y, this.radius);
  }
}
