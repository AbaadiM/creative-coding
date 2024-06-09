let table; // Declare the table variable

// To retrieve the file, we use the preload() function
function preload() {
  // Load the new data file
  table = loadTable("Car_sales.csv", "csv");
}

function setup() {
  createCanvas(800, 600);
  noStroke(); // Remove the border of the shapes
}

function draw() {
  background("#F8F4E1"); // Set the background color
  textSize(18); // Set the size of the text
  textStyle(BOLD); // Set the text to bold
  textAlign(CENTER); // Align the text to the center
  text('CAR SALES DATA VISUALIZATION', width / 2, 30); // Position the text
  textSize(14);

  // Variables for pie chart
  let centerX = width / 2;
  let centerY = height / 2 + 20;
  let radius = 150;

  // Colors for pie chart
  let colors = [color(255, 102, 102), color(255, 178, 102), color(255, 255, 102), color(178, 255, 102), color(102, 255, 178), color(102, 178, 255), color(178, 102, 255), color(255, 102, 255)];

  // Draw pie chart
  text("Car Sales Distribution", centerX, centerY - radius - 20);
  let lastAngle = 0;
  for (let i = 0; i < table.getColumnCount(); i++) {
    let data = int(table.getString(1, i)); // Access the data from the second row, ith column
    let angle = map(data, 0, 100, 0, TWO_PI); // Assuming the data ranges from 0 to 100
    fill(colors[i % colors.length]);
    arc(centerX, centerY, radius * 2, radius * 2, lastAngle, lastAngle + angle, PIE);
    let labelAngle = lastAngle + angle / 2;
    let labelX = centerX + cos(labelAngle) * (radius + 20);
    let labelY = centerY + sin(labelAngle) * (radius + 20);
    fill(0);
    text(table.getString(0, i), labelX, labelY); // Access the label from the first row, ith column
    lastAngle += angle;
  }
}
