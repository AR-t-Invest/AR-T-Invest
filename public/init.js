
let marker;
let dashboardmarker;
let scene;
let camera
let markerconnection;
markerconnection = new Markerconnection();
scene = document.createElement('a-scene')
scene.setAttribute('embedded','');
scene.setAttribute('arjs',"detectionMode: mono_and_matrix; matrixCodeType: 3x3;")

camera= document.createElement('a-entity');
marker = document.createElement('a-marker');
dashboardmarker = document.createElement('a-marker');
camera.setAttribute('camera','');

marker.setAttribute('id',"m0")
marker.setAttribute('type', "barcode");
marker.setAttribute('value', "0");
marker.setAttribute('registerevents','')

dashboardmarker.setAttribute('id',"m1")
dashboardmarker.setAttribute('type', "barcode");
dashboardmarker.setAttribute('value', "1");
dashboardmarker.setAttribute('registerevents','')

markerconnection.init(marker,scene);
markerconnection.connectMarkers(marker,dashboardmarker);

document.body.appendChild(scene);
scene.appendChild(marker);
scene.appendChild(dashboardmarker);
scene.appendChild(camera);
