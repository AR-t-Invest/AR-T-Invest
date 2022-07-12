
class Markerconnection {
    constructor() {
        this.ball1 = document.createElement('a-sphere');
        this.ball2= document.createElement('a-sphere');
        this.pipe = document.createElement('a-entity');
        this.sensor= document.createElement('a-image');

        this.pipe.setAttribute('connect','');
        this.cylinderGroup= document.createElement('a-entity');
        this.cylinderGroup.setAttribute('id',"cylinderGroup")
        this.ball1.setAttribute('radius',"0.1");
        this.ball2.setAttribute('radius',"0.1");
        this.sensor.setAttribute('src',"url(Assets/luftdinge.png)");
        this.sensor.setAttribute('position',{x:3,y:0,z:0});
        this.sensor.setAttribute('width',"2");
        this.sensor.setAttribute('height',"1");
        this.sensor.setAttribute('look-at','#cam');
    }
    init(marker,scene)
    {
        marker.appendChild(this.cylinderGroup);
        scene.appendChild(this.pipe);
    }
    connectMarkers(m1,m2)
    {

        m1.appendChild(this.ball1);
        m2.appendChild(this.ball2);
    }
    outputInit(marker)
    {
        marker.appendChild(this.sensor);
    }
}
