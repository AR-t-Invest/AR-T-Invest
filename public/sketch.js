
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
/*  requestedData = loadJSON(
    "https://api.corona-zahlen.org/germany/history/cases/9"
  );*/
}

function setup() {
/*  materialCanvas = createGraphics(w, h);
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
  dataMax = max(dataArray);*/
  setInterval(getDataPointRequest,5000);
}

function draw() {

/*
  // Visualize amount of cases as circles with normalized diameters
  materialCanvas.background(255);

  for (let i = 0; i < dataArray.length; i++) {
    materialCanvas.circle(
        100 * i,
        400,
        map(dataArray[i], dataMin, dataMax, 20, 200)
    );
  }

  //The resulting visualization mapped as a texture of the cube in the A-Frame scene

  let material = materialCanvas.drawingContext.canvas;
*/

  //p5Canvas.setAttribute("material", "src", material);
}

function getDataPointRequest()
{
  let now = new Date().toISOString();
  console.log(now);
  let api_url = "https://api.aedifion.io/v2/"

//watch out for time zones
  let urlbuild = "datapoint/timeseries?project_id=61&" +
      "dataPointID=smartdirector-D01-1_2727987%3Asmartlab-Zone1%20Ceiling%20Temperature-AI2727987&" +
      `start=${now}&` +
      `end=${now}&`+
      "max=0&" +
      "samplerate=0m&" +
      "interpolation=none&" +
      "aggregation=distinct&" +
      "short=true&" +
      "closed_interval=true"

  let username = "andreas.ma@smail.th-koeln.de"
  let pass = "Start123!"
  let auth = username + ":" + pass;

  fetch(api_url + urlbuild, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': "Basic " + btoa(auth)
        }
      }
  ).then((res) => res.json()).then((data) =>parseData(data));


  function parseData(res) {
    let lastValue = res[0][1];
    //let lastValue = Object.values(res).pop();
    console.log(lastValue);
    p5Canvas.setAttribute("text","value",Math.round(lastValue*100)/100)
  }
}
