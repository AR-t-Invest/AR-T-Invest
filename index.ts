import express, {response} from 'express';
import {Request, Response} from 'express';
import fetch from 'cross-fetch';

let app = express();
const port = 3000;
app.listen(port)
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html')
})  

console.log("serving on http://localhost:" + port);
setInterval(getDataPointRequest,5000);

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

    function parseData(res : any[][]) {
        let lastValue = res[0][1];
        //let lastValue = Object.values(res).pop();
        console.log(lastValue);
    }
}
