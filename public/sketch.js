

let apiurl ="https://accounts-api.airthings.com/v1/token";
let clientId = "f0fa1d65-389c-4a5f-91b5-bb21cc3a64b9";
let clientSecret = "ff9540fe-b8cf-42c1-9235-05aa8060b85c";
let globalAccessToken;


async function preload() {

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
    preload();
    setInterval(getDataPointRequest, 5000);


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

           let luftquali = 1600;

            particleSystem.evaluateAirQuality(luftquali);
    }

}



