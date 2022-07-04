let markerVisible = {m0: false, m1: false};
AFRAME.registerComponent('registerevents', {
    init: function () {
        let marker = this.el;

        marker.addEventListener('markerFound', function () {
            markerVisible[marker.id] = true;
        })
        marker.addEventListener('markerLost', function () {
            markerVisible[marker.id] = false;
        })
    }
});

let radTop = 0.05
let radBottom = 0.05
let segments = 12

AFRAME.registerComponent('connect', {
    init: function () {
        this.m0 = document.querySelector("#m0");
        this.m1 = document.querySelector("#m1");
        this.p0 = new THREE.Vector3();
        this.p1 = new THREE.Vector3();
        console.log("init connect component")

        let geometry = new THREE.CylinderGeometry(radTop, radBottom, 1, segments)
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
        this.cylinder = new THREE.Mesh(geometry);
        this.cylinderGroup = document.querySelector('#cylinderGroup').object3D;
        this.cylinderGroup.add(this.cylinder);
    },

    tick: function (time, deltaTime) {
        if (markerVisible["m0"] && markerVisible["m1"]) {
            this.m0.object3D.getWorldPosition(this.p0);
            this.m1.object3D.getWorldPosition(this.p1);

            let distance = this.p0.distanceTo(this.p1);
            this.cylinderGroup.lookAt(this.p1);
            this.cylinder.scale.set(1, 1, distance);
            this.cylinder.visible = true;
        } else {
            this.cylinder.visible = false;
        }
    }
})
