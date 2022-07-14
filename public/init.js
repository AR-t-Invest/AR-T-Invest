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
    "detectionMode: color_and_matrix; " +
    "matrixCodeType: 3x3;" +
    "maxDetectionRate:60;" +
    "imageSmoothingEnabled:false;" +
    "trackingMethod: best;" +
    "debugUIEnabled: false;" +
    "debug: false;")
scene.setAttribute('renderer', "sortObjects: false")
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

            marker_output.setAttribute('preset', "pattern");
            marker_output.setAttribute('type', "pattern");
            marker_output.setAttribute('url', "Assets/pattern-luft.patt");

            marker_heizsegel.setAttribute('preset', "pattern");
            marker_heizsegel.setAttribute('type', "pattern");
            marker_heizsegel.setAttribute('url', "Assets/pattern-heizung.patt");

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
