let materialCanvas;
let w = 800;
let h = 800;
let p5Canvas ;
let requestedData;
let dataArray = [];
let dataMin;
let dataMax;
let marker;
let scene;
let dashboard;


function preload() {
    scene = document.querySelector('a-scene');
    dashboard = document.createElement('a-entity');
    marker = document.createElement('a-marker');
    scene.addEventListener('loaded',() => marker.appendChild(dashboard));
    marker.setAttribute('preset', "hiro");
    dashboard.setAttribute('id', "p5Canvas");
    dashboard.setAttribute('geometry', {primitive: 'plane', width: 4, height: 'auto'});
    dashboard.setAttribute('material', {color: 'blue'});
    dashboard.setAttribute('text', "")
    dashboard.setAttribute('value', "text");
    //marker.appendChild(dashboard)
    scene.appendChild(marker);
}

function setup() {
    p5Canvas = document.getElementById("p5Canvas");
    setInterval(getDataPointRequest, 5000);
}

function draw() {

}

function getDataPointRequest() {
    let now = new Date().toISOString();
    console.log(now);
    let api_url = "https://api.aedifion.io/v2/"

//watch out for time zones
    let urlbuild = "datapoint/timeseries?project_id=61&" +
        "dataPointID=smartdirector-D01-1_2727987%3Asmartlab-Zone1%20Ceiling%20Temperature-AI2727987&" +
        `start=${now}&` +
        `end=${now}&` +
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
    ).then((res) => res.json()).then((data) => parseData(data));


    function parseData(res) {
        let lastValue = res[0][1];
        //let lastValue = Object.values(res).pop();
        console.log(lastValue);
        p5Canvas.setAttribute("text", "value", (Math.round(lastValue * 100) / 100), true)
    }
}
