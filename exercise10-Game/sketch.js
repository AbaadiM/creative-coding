let roadWidth;
let carWidth;
let carPosition;
let obstacles = [];
let powerUps = [];
let gameStarted = false;
let gameOver = false;
let score = 0;
let carColor;

function setup() {
  createCanvas(400, 600);
  roadWidth = width * 0.6;
  carWidth = 40;
  carPosition = width / 2;
  carColor = color(random(255), random(255), random(255));
}

function draw() {
  background(220);
  
  if (!gameStarted) {
    drawStartScreen();
    return;
  }
  
  if (gameOver) {
    drawEndScreen();
    return;
  }
  
  drawRoad();
  drawCar();
  moveObstacles();
  movePowerUps();
  checkCollision();
  drawScore();
}

function drawStartScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Press Enter to Start", width / 2, height / 2);
}

function drawEndScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2);
  textSize(16);
  fill(0);
  text("Score: " + score, width / 2, height / 2 + 40);
  textSize(16);
  fill(0);
  text("Press Enter to Restart", width / 2, height / 2 + 80);
}

function drawRoad() {
  fill(100);
  rect(width * 0.2, 0, roadWidth, height);
}

function drawCar() {
  fill(carColor);
  rect(carPosition - carWidth / 2, height - 100, carWidth, 50);
}

function drawScore() {
  textSize(20);
  fill(0);
  text("Score: " + score, 20, 30);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    carPosition -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    carPosition += 20;
  } else if (keyCode === ENTER) {
    if (!gameStarted || gameOver) {
      startGame();
    }
  }
}

function startGame() {
  carPosition = width / 2;
  obstacles = [];
  powerUps = [];
  gameStarted = true;
  gameOver = false;
  score = 0;
  carColor = color(random(255), random(255), random(255));
  loop();
}

function moveObstacles() {
  if (frameCount % 30 === 0) { // Add new obstacle every 0.5 seconds
    let obstacle = {
      x: random(width * 0.2, width * 0.8),
      y: -50,
      w: random(20, 60),
      h: random(20, 60),
      speed: random(2, 6)
    };
    obstacles.push(obstacle);
  }
  
  for (let obstacle of obstacles) {
    obstacle.y += obstacle.speed;
    fill(0);
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    
    // Increase score when the obstacle passes the car safely
    if (obstacle.y > height - 100 && obstacle.y < height) {
      score += 10;
    }
  }
}

function movePowerUps() {
  if (frameCount % 300 === 0) { // Add new power-up every 5 seconds
    let powerUp = {
      x: random(width * 0.2, width * 0.8),
      y: -50,
      size: 20,
      speed: random(2, 6),
      type: floor(random(3)) // 0: Speed Boost, 1: Score Multiplier, 2: Color Change
    };
    powerUps.push(powerUp);
  }
  
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let powerUp = powerUps[i];
    powerUp.y += powerUp.speed;
    
    if (powerUp.type === 0) {
      fill("orange");
    } else if (powerUp.type === 1) {
      fill("green");
    } else {
      fill("blue");
    }
    ellipse(powerUp.x, powerUp.y, powerUp.size);
    
    if (powerUp.y > height) {
      powerUps.splice(i, 1);
    }
  }
}

function checkCollision() {
  for (let obstacle of obstacles) {
    if (
      carPosition + carWidth / 2 > obstacle.x && 
      carPosition - carWidth / 2 < obstacle.x + obstacle.w && 
      height - 100 + 50 > obstacle.y && 
      height - 100 < obstacle.y + obstacle.h
    ) {
      gameOver = true;
      gameStarted = false;
      noLoop();
      return;
    }
  }
  
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let powerUp = powerUps[i];
    let d = dist(carPosition, height - 75, powerUp.x, powerUp.y);
    
    if (d < carWidth / 2 + powerUp.size / 2) {
      applyPowerUp(powerUp.type);
      powerUps.splice(i, 1);
    }
  }
}

function applyPowerUp(type) {
  if (type === 0) {
    // Speed Boost
    for (let obstacle of obstacles) {
      obstacle.speed *= 1.5;
    }
  } else if (type === 1) {
    // Score Multiplier
    score += 100;
  } else {
    // Color Change
    carColor = color(random(255), random(255), random(255));
  }
}
