let particleSystem;
let firstmarker;
let secondmarker;
let qualitaethatseinenpreis;
let scene;
let camera
let markerconnection;

particleSystem = new Particlesystem();
markerconnection = new Markerconnection();
scene = document.createElement('a-scene')
scene.setAttribute('embedded','');
scene.setAttribute('arjs',"detectionMode: mono_and_matrix; matrixCodeType: 3x3;")

camera= document.createElement('a-entity');
firstmarker = document.createElement('a-marker');
qualitaethatseinenpreis = document.createElement('a-marker');
secondmarker = document.createElement('a-marker');
camera.setAttribute('camera','');

qualitaethatseinenpreis.setAttribute('preset',"hiro");

firstmarker.setAttribute('id',"m0")
firstmarker.setAttribute('type', "barcode");
firstmarker.setAttribute('value', "0");
firstmarker.setAttribute('registerevents','')

secondmarker.setAttribute('id',"m1")
secondmarker.setAttribute('type', "barcode");
secondmarker.setAttribute('value', "1");
secondmarker.setAttribute('registerevents','')

particleSystem.init(qualitaethatseinenpreis);
markerconnection.init(firstmarker,scene);
markerconnection.connectMarkers(firstmarker,secondmarker);

document.body.appendChild(scene);

scene.appendChild(firstmarker);
scene.appendChild(secondmarker);

scene.appendChild(qualitaethatseinenpreis);
scene.appendChild(camera);
