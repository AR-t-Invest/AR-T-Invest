let particleSystem;
let firstmarker;
let secondmarker;
let thirdmarker;
let qualitaethatseinenpreis;
let scene;
let camera
let markerconnection;
let heatcoils;
let dashboard;
let dashboardMarker;


markerconnection = new Markerconnection();
heatcoils = new Heatcoils();
dashboard = new Dashboard();

scene = document.createElement('a-scene')

scene.setAttribute('embedded','');
scene.setAttribute('arjs',"detectionMode: mono_and_matrix; matrixCodeType: 3x3;")
scene.setAttribute('renderer',"sortObjects: true")

camera= document.createElement('a-entity');
firstmarker = document.createElement('a-marker');
qualitaethatseinenpreis = document.createElement('a-marker');
secondmarker = document.createElement('a-marker');
thirdmarker = document.createElement('a-marker');
dashboardMarker = document.createElement('a-marker');
camera.setAttribute('camera','');

dashboardMarker.setAttribute('preset',"hiro");
dashboardMarker.setAttribute('id',"dma");


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
thirdmarker.setAttribute('value', "2");

qualitaethatseinenpreis.setAttribute('id', 'm3');
qualitaethatseinenpreis.setAttribute('type', 'barcode');
qualitaethatseinenpreis.setAttribute('value', '3');



markerconnection.init(firstmarker,scene);
heatcoils.init(thirdmarker);
dashboard.init(dashboardMarker);



markerconnection.connectMarkers(firstmarker,secondmarker);

document.body.appendChild(scene);

scene.appendChild(firstmarker);
scene.appendChild(secondmarker);
scene.appendChild(thirdmarker);
scene.appendChild(qualitaethatseinenpreis);
scene.appendChild(camera);
scene.appendChild(dashboardMarker);

/*function test(){
    if(dashboardMarker.object3D.visible == true) {
        console.log("TRUE");
    } else {
        console.log("FALSE");

    }  
}
setInterval(test, 3000);*/
