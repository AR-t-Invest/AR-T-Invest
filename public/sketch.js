let materialCanvas;
let w = 800;
let h = 800;
let p5Canvas = document.getElementById("p5Canvas");
let requestedData;
let dataArray = [];
let dataMin;
let dataMax;

function preload() {
  // Call RKI Covid-19 API
  requestedData = loadJSON(
    "https://api.corona-zahlen.org/germany/history/cases/9"
  );
}

function setup() {
  materialCanvas = createGraphics(w, h);
  frameRate(30);

  // Log fetched data
  print("API data: ");
  print(requestedData);

  // Extract JSON data into Array

  for (let i = 0; i < requestedData.data.length; i++) {
    dataArray.push(requestedData.data[i].cases);
  }
  // dataArray = requestedData.data.map(dataArray => dataArray.cases);

  // Analyse min and max in data
  dataMin = min(dataArray);
  dataMax = max(dataArray);
}

function draw() {
  materialCanvas.background(255);

  // Visualize amount of cases as circles with normalized diameters

  for (let i = 0; i < dataArray.length; i++) {
    materialCanvas.circle(
      100 * i,
      400,
      
    );
  }

  //The resulting visualization mapped as a texture of the cube in the A-Frame scene

  let material = materialCanvas.drawingContext.canvas;
  p5Canvas.setAttribute("material", "src", material);
}
