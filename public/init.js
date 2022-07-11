let airqualityemitter;
let ventemitter;
let marker_input;
let marker_output;
let marker_heizsegel;

let air_quality_marker;
let scene;
let camera
let markerconnection;
let heatcoils;

airqualityemitter = new Particlesystem();
ventemitter = new Particlesystem();
markerconnection = new Markerconnection();
heatcoils = new Heatcoils();

scene = document.createElement('a-scene')
scene.setAttribute('embedded', '');
scene.setAttribute('arjs',
    "detectionMode: color; maxDetectionRate:60;debug:true;imageSmoothingEnabled:false"
)
scene.setAttribute('renderer',"antialias: true; alpha: true; precision: medium;")

camera = document.createElement('a-entity');
marker_input = document.createElement('a-marker');
//air_quality_marker = document.createElement('a-marker');
marker_output = document.createElement('a-marker');
marker_heizsegel = document.createElement('a-marker');
camera.setAttribute('id', 'cam');
camera.setAttribute('camera', '');

//air_quality_marker.setAttribute('preset',"hiro");

marker_input.setAttribute('id', "m0")
marker_input.setAttribute('preset', "custom");
marker_input.setAttribute('type', "pattern");
marker_input.setAttribute('url', "Assets/pattern-dashboard.patt");
marker_input.setAttribute('registerevents', '')

marker_output.setAttribute('id', "m1")
marker_output.setAttribute('preset', "custom");
marker_output.setAttribute('type', "pattern");
marker_output.setAttribute('url', "Assets/pattern-luft.patt");
marker_output.setAttribute('registerevents', '')

marker_heizsegel.setAttribute('id', "m2")
marker_heizsegel.setAttribute('preset', "custom");
marker_heizsegel.setAttribute('type', "pattern");
marker_heizsegel.setAttribute('url', "Assets/pattern-heizung.patt");

scene.appendChild(marker_input);
scene.appendChild(marker_output);
scene.appendChild(marker_heizsegel);
//scene.appendChild(air_quality_marker);

airqualityemitter.init(marker_output);

ventemitter.init(marker_output);
markerconnection.init(marker_input, scene);
markerconnection.outputInit(marker_output);
heatcoils.init(marker_heizsegel);

markerconnection.connectMarkers(marker_input, marker_output);

document.body.appendChild(scene);

ventemitter.createVent();

scene.appendChild(camera);
