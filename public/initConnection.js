let radTop = 0.05
let radBottom = 0.05
let segments = 12

AFRAME.registerComponent('connect', {
    schema:{
        firstMarker : {type : 'selector',default:'#m0'},
        secondMarker : {type : 'selector',default:'#m1'}
    },
    init: function () {
        this.m0 = this.data.firstMarker;
        this.m1 = this.data.secondMarker;

        this.ball1 = document.createElement('a-sphere');
        this.ball2= document.createElement('a-sphere');
        this.ball1.setAttribute('radius',"0.1");
        this.ball2.setAttribute('radius',"0.1");

        this.m0.addEventListener('markerFound', () => this.vis0 = true)
        this.m0.addEventListener('markerLost', () => this.vis0 = false)
        this.m1.addEventListener('markerFound', () => this.vis1 = true)
        this.m1.addEventListener('markerLost', () => this.vis1 = false)
        //document.querySelector("#m0")
        this.p0 = new THREE.Vector3();
        this.p1 = new THREE.Vector3();
        this.ballp0 =  new THREE.Vector3(0,0,0);
        this.ballp1 =  new THREE.Vector3(0,0,0);
        this.animatedBall = document.createElement('a-sphere')
        this.animatedBall.setAttribute('radius',"0.12");
        this.animatedBall.setAttribute('material',{
            shader:"flat",
            transparent:"true",
            blending:"none",
            opacity:20
        });
        //this.animatedBall.setAttribute('rotation','90 90 0')
        this.factor = 0.0;
        this.ballcolor = new THREE.Color("hsl(233,82%,50%)")
        this.startcolor= new THREE.Color("hsl(233,82%,50%)")
        this.targetColor = new THREE.Color("hsl(360,82%,50%)");
        this.ball1.setAttribute('material',"color: #" + this.startcolor.getHexString());
        this.ball2.setAttribute('material',"color: #" + this.targetColor.getHexString());
        console.log("init connect component")

        let geometry = new THREE.CylinderGeometry(radTop, radBottom, 1, segments)
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(90)));
        this.connection = document.createElement('a-entity')
        this.cylinderGroup = this.connection.object3D;
        this.cylinder = new THREE.Mesh(geometry);
        this.cylinderGroup.add(this.cylinder);
        this.m0.appendChild(this.connection);

        this.m0.appendChild(this.ball1);
        this.m1.appendChild(this.ball2);
        this.el.sceneEl.appendChild(this.animatedBall);

    },

    tick: function (time, deltaTime) {
        if (this.vis0 && this.vis1) {
            this.ballp1.copy(this.p1).sub(this.p0);
            this.ballp0 = this.p0.add(this.ballp1.multiplyScalar(this.factor));
            if(this.factor >= 1)
            {
                this.factor = 0.0;
            }
            this.ballcolor.lerpColors(this.startcolor,this.targetColor,this.factor);
            this.animatedBall.object3D.position.copy(this.ballp0);
            this.animatedBall.setAttribute('material',"color: #" + this.ballcolor.getHexString());

            this.factor += 0.1*(deltaTime/100);

            this.m0.object3D.getWorldPosition(this.p0);
            this.m1.object3D.getWorldPosition(this.p1);

            let distance = this.p0.distanceTo(this.p1);
            this.cylinderGroup.lookAt(this.p1);
            this.cylinder.scale.set(1, 1, distance);
            this.animatedBall.object3D.visible = true;
            this.cylinder.visible = true;
        } else {
            this.animatedBall.object3D.visible = false;
            this.cylinder.visible = false;
        }
    }
})
