
let marker;
let dashboardmarker;
let scene;
let camera
let pipe;
let cylinderGroup;
let ball1;
let ball2;
scene = document.createElement('a-scene')
scene.setAttribute('embedded','');
scene.setAttribute('arjs'," detectionMode: mono_and_matrix; matrixCodeType: 3x3;")


ball1 = document.createElement('a-sphere');
cylinderGroup= document.createElement('a-entity');
ball2= document.createElement('a-sphere');
pipe = document.createElement('a-entity');
camera= document.createElement('a-camera');
marker = document.createElement('a-marker');
dashboardmarker = document.createElement('a-marker');


ball1.setAttribute('radius',"0.1");
ball2.setAttribute('radius',"0.1");

//scene.appendChild(camera);
cylinderGroup.setAttribute('id',"cylinderGroup")

marker.setAttribute('id',"m0")
marker.setAttribute('type', "barcode");
marker.setAttribute('value', "0");
marker.setAttribute('registerevents','')

dashboardmarker.setAttribute('id',"m1")
dashboardmarker.setAttribute('type', "barcode");
dashboardmarker.setAttribute('value', "1");
dashboardmarker.setAttribute('registerevents','')

pipe.setAttribute('connect','');

scene.addEventListener('loaded',() => {

});
document.body.appendChild(scene);
scene.appendChild(marker);
scene.appendChild(dashboardmarker);
marker.appendChild(cylinderGroup);
scene.appendChild(pipe);
marker.appendChild(ball1);
dashboardmarker.appendChild(ball2);
