let airqualityemitter;
let ventemitter;
let marker_input;
let marker_output;
let marker_heizsegel;
let dashboard;

let camera
let airquality_connection;
let heatcoils_connection;
let heatcoils;
let informationen;


let scene;
scene = document.createElement('a-scene')
scene.setAttribute('embedded', '')
scene.setAttribute('arjs',
    "detectionMode: mono; " +
    "maxDetectionRate:60;" +
    "imageSmoothingEnabled:true;" +
    "trackingMethod: best;" +
    "canvasWidth: 1280;"+
    "canvasHeight: 720;"+
    "debugUIEnabled: false;" +
    "debug: false;")
scene.setAttribute('renderer',
                   "sortObjects: false;")
document.body.appendChild(scene);

airqualityemitter = new Particlesystem();
ventemitter = new Particlesystem();
heatcoils = new Heatcoils();
informationen = new Info()
dashboard = new Dashboard();

camera = document.createElement('a-entity');
marker_input = document.createElement('a-marker');
marker_output = document.createElement('a-marker');
marker_heizsegel = document.createElement('a-marker');
camera.setAttribute('id', 'cam');
camera.setAttribute('camera', '');


marker_input.setAttribute('id', "m0")

marker_output.setAttribute('id', "m1")

marker_heizsegel.setAttribute('id', "m2")

setMarkerMode('custom');

createExplanation(marker_input,sensorText,sensorTextAlt);
createExplanation(marker_output,ventText,ventTextAlt);
createExplanation(marker_heizsegel,heatcoilsText,heatcoilsTextAlt);


airqualityemitter.init(marker_output);
ventemitter.init(marker_output);

airquality_connection = new Markerconnection(marker_input, marker_output);
heatcoils_connection = new Markerconnection(marker_input, marker_heizsegel);

airquality_connection.airthings_sensor(marker_output);
heatcoils_connection.airthings_sensor(marker_heizsegel);

airquality_connection.setIcon('3dmodels/icons/co2.png')
heatcoils_connection.setIcon('3dmodels/icons/temperature.png')

dashboard.init(marker_input);
heatcoils.init(marker_heizsegel);
informationen.init(marker_input);

scene.appendChild(camera);
scene.appendChild(marker_input);
scene.appendChild(marker_output);
scene.appendChild(marker_heizsegel);

ventemitter.createVent();

function setMarkerMode(mode) {
    switch (mode) {
        case('custom'): {
            console.log('marker mode : custom')
            marker_input.setAttribute('preset', "pattern");
            marker_input.setAttribute('type', "pattern");
            marker_input.setAttribute('url', "Assets/pattern-dashboard.patt");
            marker_input.setAttribute('smooth',"false");

            marker_output.setAttribute('preset', "pattern");
            marker_output.setAttribute('type', "pattern");
            marker_output.setAttribute('url', "Assets/pattern-luft.patt");
            marker_output.setAttribute('smooth',"false");


            marker_heizsegel.setAttribute('preset', "pattern");
            marker_heizsegel.setAttribute('type', "pattern");
            marker_heizsegel.setAttribute('url', "Assets/pattern-heizung.patt");
            marker_heizsegel.setAttribute('smooth',"false");


            break;
        }
        case('barcode'): {
            console.log('marker mode : barcode')
            marker_input.removeAttribute('url');
            marker_input.removeAttribute('preset');
            marker_input.setAttribute('type', "barcode");
            marker_input.setAttribute('value', "0");

            marker_output.removeAttribute('url');
            marker_output.removeAttribute('preset');
            marker_output.setAttribute('type', "barcode");
            marker_output.setAttribute('value', "1");

            marker_heizsegel.removeAttribute('url');
            marker_heizsegel.removeAttribute('preset');
            marker_heizsegel.setAttribute('type', "barcode");
            marker_heizsegel.setAttribute('value', "2");
            break;
        }
    }
}

function createExplanation(marker,text,altText)
{
    let icon = "Assets/info.png"
    this.text = document.createElement('a-entity');
    this.text.setAttribute("geometry",{primitive:"plane",width: 3,height: "auto"})
    this.text.setAttribute("material",{color:"white"})
    this.text.setAttribute("text",{value:text,color:"black",font:"sourcecodepro",zOffset:0.05,xOffset:0.05,wrapCount:45})
    this.text.setAttribute("look-at", "#cam")
    this.text.setAttribute("position", "-3 0 0.5")

    this.alttext = document.createElement('a-entity');
    this.alttext.setAttribute("geometry",{primitive:"plane",width: 3,height: "auto"})
    this.alttext.setAttribute("material",{color:"black"})
    this.alttext.setAttribute("text",{value:altText,color:"white",font:"sourcecodepro",zOffset:0.05,xOffset:0.05,wrapCount:45})
    this.alttext.setAttribute("look-at", "#cam")
    this.alttext.setAttribute("position", "-3 0 -0.5")

    this.info = document.createElement('a-image');
    this.info.setAttribute('src', icon)
    this.info.setAttribute('position', "-3 0 0");
    this.info.setAttribute('width', 0.25);
    this.info.setAttribute('height', 0.25);
    this.info.setAttribute("material", {alphaTest:0.5,color:"white"});
    this.info.setAttribute("look-at", "#cam")


    this.line = document.createElement("a-entity")
    this.line.setAttribute("line" , {start: "0 0 0", end: "-3 0 0", color: "white"})

    marker.appendChild(this.line)
    marker.appendChild(this.text);
    marker.appendChild(this.info)
    marker.appendChild(this.alttext);

}