let particleSystem;
let firstmarker;
let secondmarker;
let thirdmarker;
let air_quality_marker;
let scene;
let camera
let markerconnection;
let heatcoils;

particleSystem = new Particlesystem();
markerconnection = new Markerconnection();
heatcoils = new Heatcoils();

scene = document.createElement('a-scene')
scene.setAttribute('embedded','');
scene.setAttribute('arjs',"" +
    "sourceType: webcam; " +
    "sourceWidth:1280; " +
    "sourceHeight:960; " +
    "displayWidth: 1280; " +
    "displayHeight: 960;" +
    "detectionMode: mono_and_matrix; " +
    "matrixCodeType: 3x3;")

camera= document.createElement('a-entity');
firstmarker = document.createElement('a-marker');
air_quality_marker = document.createElement('a-marker');
secondmarker = document.createElement('a-marker');
thirdmarker = document.createElement('a-marker');
camera.setAttribute('id','cam');
camera.setAttribute('camera','');

air_quality_marker.setAttribute('preset',"hiro");

firstmarker.setAttribute('id',"m0")
firstmarker.setAttribute('type', "barcode");
firstmarker.setAttribute('value', "0");
firstmarker.setAttribute('registerevents','')

secondmarker.setAttribute('id',"m1")
secondmarker.setAttribute('type', "barcode");
secondmarker.setAttribute('value', "1");
secondmarker.setAttribute('registerevents','')

thirdmarker.setAttribute('id',"m2")
thirdmarker.setAttribute('type', "barcode");
thirdmarker.setAttribute('value', "3");

particleSystem.init(air_quality_marker);
markerconnection.init(firstmarker,scene);
markerconnection.outputInit(secondmarker);
heatcoils.init(thirdmarker);

markerconnection.connectMarkers(firstmarker,secondmarker);

document.body.appendChild(scene);

scene.appendChild(firstmarker);
scene.appendChild(secondmarker);
scene.appendChild(thirdmarker);
scene.appendChild(air_quality_marker);
scene.appendChild(camera);
