let mic;
let fft;
let barColors = [];
let pulseSpeed = 0.05; // Adjust the pulse speed
let sensitivity = 5; // Adjust the sensitivity to audio input

function setup() {
  createCanvas(800, 600);
  noStroke();
  
  // Create an FFT object
  fft = new p5.FFT();
  
  // Initialize the microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Color palette for the bars
  barColors = [
    color(250, 235, 44), 
    color(245, 39, 137), 
    color(233, 0, 255), 
    color(22, 133, 248), 
    color(61, 20, 76) 
  ];
}

function draw() {
  // Analyze the frequency spectrum of the microphone input
  let spectrum = fft.analyze();

  // Get the volume level from the microphone input
  let vol = mic.getLevel();

  // Clear the background
  background(0);

  // Define the number of bars and the spacing between them
  let numBars = 5;
  let barWidth = width / numBars;

  // Draw multiple pulsating bars with specific colors
  for (let j = 0; j < numBars; j++) {
    let barHeight = map(vol, 0, 1, 0, height) * sensitivity; // Adjust the sensitivity
    
    // Adjust the bar height based on a sine function to create a pulsing effect
    let pulseAmount = sin(frameCount * pulseSpeed + j * 50) * 20;
    barHeight += pulseAmount;
    
    // Use the specific color for the current bar
    let col = lerpColor(barColors[j], color(255), spectrum[j * 20] / 255);
    fill(col);
    
    // Draw the bar
    rect(j * barWidth, height - barHeight, barWidth, barHeight);
  }
}

function mousePressed() {
  // Start or stop the microphone input based on mouse press
  if (mic.enabled) {
    mic.stop();
  } else {
    mic.start();
  }
}
