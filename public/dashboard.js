class Dashboard{
    constructor(){

        this.dashboard = document.createElement('a-entity');
        this.sensor = document.createElement('a-entity');
        this.room = document.createElement('a-entity');

        this.room.setAttribute('geometry',{primitive: "plane"})
        this.room.setAttribute('material',{side: "double"})
        this.room.setAttribute('material',{color: "#242424"})
        this.room.setAttribute('position', {x: 0, y: 0, z: 0.5});
        this.room.setAttribute('rotation', {x: 0, y: 0, z: 0});
        this.room.setAttribute('scale', {x: 2, y: 2, z: 2});

        this.sensor.setAttribute('obj-model',
                                   {
                                       obj: "url(3dmodels/props/sensor.obj)",
                                       mtl: "url(3dmodels/props/sensor.mtl)",
                                   })
        this.sensor.setAttribute('scale', {x: 0.25, y: 0.25, z: 0.25})
        this.sensor.setAttribute('position', {x: 0, y: 0, z: 0.25})
        this.sensor.setAttribute('rotation', {x: 0, y: -90, z: -90})


        this.dashboard.setAttribute('position',{x:0,y:2,z:0});
        this.dashboard.setAttribute('scale', "0.5 0.5 0.5");
        this.dashboard.setAttribute('look-at', "#cam");

        this.tempTextEntity = new TextEntity(0,0.7);
        this.humidityTextEntity = new TextEntity(-0.8,-0.7);
        this.co2TextEntity = new TextEntity(0.8,-0.7);

        this.tempTextEntity.setIcon("3dmodels/icons/temperature.png");
        this.co2TextEntity.setIcon("3dmodels/icons/co2.png");
        this.humidityTextEntity.setIcon("3dmodels/icons/humidity.png");

        this.hexagon = document.createElement('a-image');
        this.hexagon.setAttribute('src', "3dmodels/hexagon/Hexagon.png");
        this.hexagon.setAttribute('width', "3");
        this.hexagon.setAttribute('height', "3");
        this.hexagon.setAttribute('material', {
            alphaTest: 0.5,
        });
    }
    init(marker){

        this.dashboard.appendChild(this.tempTextEntity.text);
        this.dashboard.appendChild(this.humidityTextEntity.text);
        this.dashboard.appendChild(this.co2TextEntity.text);

        this.dashboard.appendChild(this.tempTextEntity.icon);
        this.dashboard.appendChild(this.humidityTextEntity.icon);
        this.dashboard.appendChild(this.co2TextEntity.icon);

        this.dashboard.appendChild(this.hexagon);

        marker.appendChild(this.room)
        marker.appendChild(this.dashboard);
        marker.appendChild(this.sensor);
        this.displayData(0,0,0);
    }

    displayData(temp, hum, co2){
        let temperatureText = "Temp.: " + temp +  " °C";
        let co2Text = "CO2: " + co2 + " ppm";
        let humidityText = "Humidity: " +hum + " %";

        this.tempTextEntity.setText(temperatureText);
        this.co2TextEntity.setText(co2Text);
        this.humidityTextEntity.setText(humidityText);
    }
}
