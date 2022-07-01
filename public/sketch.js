const simpleOauthModule = require('simple-oauth2');
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
let oauth2; 
let accessToken;

const tokenConfig = {
    scope: 'read:device',
};

async function authentication() {
    oauth2 = simpleOauthModule.create({
        client: {
            id: config.clientId,
            secret: config.clientSecret,
        },
        auth: {
            tokenHost: 'https://accounts.airthings.com',
            tokenPath: 'https://accounts-api.airthings.com/v1/token',
            //authorizePath: '/authorize',
        },
        /*options: {
            authorizationMethod: 'body',
        }*/
    });
    try {
        const result = await oauth2.clientCredentials.getToken(tokenConfig);
        accessToken = oauth2.accessToken.create(result);
        res.redirect('/');
    } catch (error) {
        console.error('Access Token Error', error.message);
        return res.status(500).json('Authentication failed');
    }
}

function preload() {
    scene = document.querySelector('a-scene');
    dashboard = document.createElement('a-entity');
    camera= document.createElement('a-camera');
    scene.appendChild(camera);

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

    marker.setAttribute('preset', "hiro");
    dashboard.setAttribute('id', "p5Canvas");
    dashboard.setAttribute('geometry', {primitive: 'plane', width: 4, height: 'auto'});
    dashboard.setAttribute('material', {color: 'blue'});
    dashboard.setAttribute('text', "")
    dashboard.setAttribute('value', "text");
    dashboard.setAttribute('position',{x:0,y:0,z:0});
    dashboard.setAttribute('visible',false);

    scene.appendChild(marker);

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



    //AirThings
    let  api_airthings= "https://ext-api.airthings.com/v1/";
    let param = "devices/2930156314/latest-samples"
    if (accessToken){

    }    

    function parseData(res) {
        let lastValue = res[0][1];
        let calcValue = (Math.round(lastValue * 100) / 100);
        let roomTemp = 22
        //console.log(lastValue);
        console.log("temperature: " + (calcValue));
        dashboard.setAttribute("text", {value:calcValue})

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

        heatpipes.setAttribute('material',{color:hexcolor})
    }
}

const getData = async () => {
    if (accessToken.expired()) {
        try {
            const params = {
                scope: 'read:device',
            };

            accessToken = await accessToken.refresh(params);
        } catch (error) {
            console.log("Error refreshing token: ", error.message);
        }
    }

    try {
        const options = {
            headers: {'Authorization': accessToken.token.access_token}
        };

        fetch(api_airthings + param, {
            method: 'GET',
            headers: {
                'Authorization': accessToken.token.access_token
            },
            body: data
        }
        ).then(parseDataAirThings(data));      //.then((res) => res.json()).then((data) => parseData(data));
        
        const payloadFormatted = JSON.stringify(JSON.parse(payload), null, 2);
        return res.render('index', { data: payloadFormatted });
    } catch (error) {
        console.error('Error fetching data', error.message);
        return res.status(500).json('Error fetching data');
    }
};

function parseDataAirThings(data){
    console.log(data);
}