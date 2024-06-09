function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(14, 144, 181);

  // Alien body
  fill(0, 255, 0); // Green color for the alien
  ellipse(200, 250, 150, 200); // Body

  // Alien head
  ellipse(200, 150, 100, 100); // Head

  // Alien eyes
  fill(255); // White color for the eyes
  ellipse(175, 140, 20, 30); // Left eye
  ellipse(225, 140, 20, 30); // Right eye

  fill(0); // Black color for the pupils
  ellipse(175, 140, 10, 15); // Left pupil
  ellipse(225, 140, 10, 15); // Right pupil

  // Alien antennae
  line(175, 100, 165, 50); // Left antenna
  line(225, 100, 235, 50); // Right antenna

  fill(0, 255, 0); // Green color for the antenna tips
  ellipse(165, 50, 10, 10); // Left antenna tip
  ellipse(235, 50, 10, 10); // Right antenna tip

  // Alien legs
  line(160, 350, 160, 300); // Left leg
  line(240, 350, 240, 300); // Right leg

  // Alien feet
  ellipse(160, 360, 20, 10); // Left foot
  ellipse(240, 360, 20, 10); // Right foot
}

