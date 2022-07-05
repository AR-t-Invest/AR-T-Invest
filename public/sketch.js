let materialCanvas;
let w = 800;
let h = 800;
let p5Canvas;


function preload() {

}

function setup() {
    p5Canvas = document.getElementById("p5Canvas");
    colorMode(HSB,360,100,100,100);
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
        let calcValue = (Math.round(lastValue * 100) / 100);
        let roomTemp = 22
        //console.log(lastValue);
        console.log("temperature: " + (calcValue));
        //dashboard.setAttribute("text", {value:calcValue})

        let c = color(0,0,100);
        if(calcValue > 22)
        {

            c = color(230,abs(calcValue-roomTemp)*5,100);
        }
        else if(calcValue < 22)
        {

            c = color(0,abs(calcValue-roomTemp)*5,100);
        }
        let hexcolor = "#"
            + hex(c.levels[0],2)
            + hex(c.levels[1],2)
            + hex(c.levels[2],2)
        console.log(hexcolor);

        //heatpipes.setAttribute('material',{color:hexcolor}, 'emissive',{color:hexcolor})
    }
}
