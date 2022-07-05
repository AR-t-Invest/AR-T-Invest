let materialCanvas;
let w = 800;
let h = 800;
let p5Canvas;
let requestedData;
let dataArray = [];
let dataMin;
let dataMax;
let marker;
let scene;
let dashboard;
let heatpipes;
let camera
let particelSystem

let luftquali

let apiurl ="https://accounts-api.airthings.com/v1/token";
let clientId = "f0fa1d65-389c-4a5f-91b5-bb21cc3a64b9";
let clientSecret = "ff9540fe-b8cf-42c1-9235-05aa8060b85c";
let globalAccessToken;

async function preload() {
    scene = document.querySelector('a-scene');
    dashboard = document.createElement('a-entity');
    camera= document.createElement('a-camera');
    scene.appendChild(camera);

    particelSystem = document.createElement('a-entity');

    heatpipes = document.createElement('a-entity');
    marker = document.createElement('a-marker');
    marker.appendChild(dashboard)
    marker.appendChild(heatpipes);
    scene.addEventListener('loaded',() => {
    });
    heatpipes.setAttribute('id', "heizspule")
    heatpipes.setAttribute('obj-model', {obj:"url(Heizspule/Heizspule.obj)",mtl:"url(Heizspule/Heizspule.mtl)"})
    heatpipes.setAttribute('position',{x:0,y:0,z:0});
    heatpipes.setAttribute('scale',{x:2,y:2,z:2});
    heatpipes.setAttribute('visible',false);

    marker.setAttribute('preset', "hiro");
    dashboard.setAttribute('id', "p5Canvas");
    dashboard.setAttribute('geometry', {primitive: 'plane', width: 4, height: 'auto'});
    dashboard.setAttribute('material', {color: 'blue'});
    dashboard.setAttribute('text', "")
    dashboard.setAttribute('value', "text");
    dashboard.setAttribute('position',{x:0,y:0,z:0});
    dashboard.setAttribute('visible',false);

    scene.appendChild(marker);
    marker.appendChild(particelSystem);

    //------------Particel------------
     
     


     respond = await fetch(apiurl, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               // 'Authorization': client_id: ${clientId}, client_secret:${clientSecret}
            },
            body: JSON.stringify({
                grant_type:"client_credentials",
                client_id:clientId,
                client_secret:clientSecret,
                scope: ["read:device"]
            })
        });

    //globalAccessToken.access_token gets us the required Token for accessing aithings Sensor-data
     globalAccessToken = await respond.json();
     console.log(globalAccessToken.access_token);

}

function setup() {
    p5Canvas = document.getElementById("p5Canvas");
    colorMode(HSB,360,100,100,100);
    setInterval(getDataPointRequest, 5000);
}

function draw() {

}

async function getDataPointRequest() {
    let now = new Date().toISOString();
    console.log(now);

    //AirThings
    let  api_airthings= "https://ext-api.airthings.com/v1/";
    let param = "devices/2930156314/latest-samples" //to access one sensor and its data from Airthings-API
    if (globalAccessToken.access_token){
        respond = await fetch(api_airthings+param, 
            {
                method: 'GET',
                headers: {
                    'Authorization': globalAccessToken.access_token
                },
            });
            let response = await respond.json(); 

            console.log(response.data.co2);  // response.data.{your parameter} , accesses one datapoint from a sensor

            luftquali = response.data.co2 + 1200

            if(luftquali<=800){
                particelSystem.setAttribute('position',{x:0,y:2.25,z:-15});
                particelSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '100' , color: 'green'})
            }else if(luftquali>=800 && luftquali <= 1400)
            {
                particelSystem.setAttribute('position',{x:0,y:2.25,z:-15});
                particelSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '600' , color: 'yellow'})
            }else if(luftquali>=1400)
            {
                particelSystem.setAttribute('position',{x:0,y:2.25,z:-15});
                particelSystem.setAttribute('particle-system',{preset: 'dust', particleCount:  '4000' , color: 'red'})
            }

           
    }   

}



